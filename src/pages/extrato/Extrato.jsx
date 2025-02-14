import { useEffect, useState } from "react";
import { MenuKebab } from "../components/menuKebab/MenuKebab";
import { ModalBasico } from "../components/modal/Modal";
import { Alert, Box, Button, styled, Typography } from "@mui/material";
import { Grafico } from "../components/grafico/Grafico";
import { Abas } from "../components/tabs/Tabs";
import { formatadorMonetario } from "../../utils/formatadores";

// CSS-in-JS para estilização
const styles = {
  title: {
    fontSize: "36px",
    marginBottom: "20px",
    textAlign: "left",
    color: "#2980B9", // Título destacado em tom quente
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: "20px",
    padding: "1.5rem 1rem",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#f2f2f2", // Fundo sutil para o cabeçalho
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'justify-between',
    alignItens: 'center',
    gap: '35px',
    fontSize: '1.8rem',
    color: "#595959", // Texto claro
  },
  tablesContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  table: {
    flex: "1",
    maxWidth: "50%",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f2f2f2", // Fundo sutil para tabelas
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    color: "#020202", // Texto claro
  },
  entradasTitle: {
    fontSize: "18px",
    color: "#2E7D32 ", // Destaque quente para entradas
    textAlign: "center",
    borderBottom: "1px solid #4CAF50 ",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  saidasTitle: {
    fontSize: "18px",
    color: "#e74c3c", // Destaque frio para saídas
    textAlign: "center",
    borderBottom: "1px solid #F44336 ",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  transactionsList: {
    listStyleType: "none",
    padding: "0",
    fontSize: "12px",
    color: "#595959",
    maxHeight: "400px", // Altura máxima da lista
    overflowY: "auto", // Adiciona a barra de rolagem vertical
    scrollbarWidth: "thin", // Personaliza a barra de rolagem (para navegadores modernos)
    scrollbarColor: "#cccccc #f5f5f5 ", // Cores para barra e trilho (moderno)
  },
  transactionItem: {
    borderBottom: "1px solid #cccbcb",
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    padding: '1.2rem 1rem',
    wordWrap: "break-word",
    backgroundColor: "#f2f2f2", // Fundo leve para itens
    borderRadius: "3px",
    transition: "background-color 0.5s ease", // Transição suave
    cursor: "pointer", // Cursor de mão para indicar interatividade
  },
  transactionItemHover: {
    backgroundColor: "#e0e0e0", // Fundo ao passar o mouse
  },
  totalContainer: {
    paddingRight: '1.5rem',
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: "#595959",
    textAlign: 'right'
  },
  containerModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItens: 'center',
    padding: '2rem',
    gap: '3rem'
  },
  modalLabel: {
    width: '45rem',
    padding: ' .5rem',
    borderRadius: '3px',
  },
  spanFileName: {
    paddingLeft: '1rem',
    fontSize: '1.2rem',
    maxWidth: '380px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#333333'
  },
  modalButton: {
    backgroundColor: '#2980B9', // Azul para o botão "Anexar"
    color: '#FFFFFF', // Texto branco
    marginRight: '10px', // Espaçamento entre os botões
    '&:hover': {
      backgroundColor: '#fff', // Azul mais escuro no hover
    },
  },
  modalSecondaryButton: { // Estilos para o botão "Escolher Arquivo"
    backgroundColor: '#EEEEEE', // Cinza claro
    color: '#333333', // Texto cinza escuro
    border: '#333',
    '&:hover': {
      backgroundColor: '#DDDDDD', // Cinza um pouco mais escuro no hover
    },
  },
  modalGrafico: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 0'
  },
  error: {
    paddingBottom: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
};

export default function Extrato() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverIndexSaida, setHoverIndexSaida] = useState(null);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [modalState, setModalState] = useState({ novoExtrato: false, grafico: false });

  const [aba, setAba] = useState(1) //state selecao de aba
  const [chartData, setChartData] = useState([]);

  const menuItems = [
    {
      label: 'Novo extrato',
      onClick: () => setModalState({ novoExtrato: true }),
    },
    {
      label: 'Ver gráfico',
      onClick: () => setModalState({ grafico: true }),
    }
  ];

  const processTransactions = (transactionString) => {
    const regex = /(PIX|99\*)/g;
    const matches = transactionString.split(regex);

    let transactions = [];
    for (let i = 0; i < matches.length; i++) {
      if (matches[i] === "PIX" || matches[i] === "99*") {
        transactions.push(matches[i] + matches[i + 1]);
        i++;
      }
    }
    return transactions.map((tx) => tx.trim());
  };

  const splitTransactions = (transactions) => {
    const entradas = transactions.filter((tx) =>
      tx.startsWith("PIX recebido")
    );
    const saidas = transactions.filter((tx) =>
      tx.startsWith("PIX enviado")
    );
    return { entradas, saidas };
  };

  function extractTransactionData(data) {
    // Função para extrair o texto antes da primeira data e o primeiro valor
    const headerRegex = /^(.*?)(\d{2}\/\d{2}\/\d{4})/; // Regex para pegar texto antes da primeira data
    const valueRegex = /R\$\s?(\d{1,3}(\.\d{3})*,\d{2})/; // Regex para pegar o valor monetário (R$ 15,00)

    const extractDetails = (transaction) => {
      // Extrai o texto antes da primeira data
      const headerMatch = transaction.match(headerRegex);
      const valueMatch = transaction.match(valueRegex);

      const headerText = headerMatch ? headerMatch[1].trim() : ''; // Parte antes da data
      const firstValue = valueMatch ? valueMatch[1].trim() : '';  // Primeiro valor encontrado

      return { headerText, firstValue };
    };

    const entradasDetails = data.entradas.map((entrada) => extractDetails(entrada));
    const saidasDetails = data.saidas.map((saida) => extractDetails(saida));

    return { entradasDetails, saidasDetails };
  }

  useEffect(() => {
    fetch("http://localhost:4000/extrato")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados do endpoint");
        }
        return response.json();
      })
      .then((data) => {
        const processedTransactions = processTransactions(data.transacoes);
        const { entradas, saidas } = splitTransactions(processedTransactions);

        const processedData = {
          ...data,
          entradas,
          saidas,
        };
        const entradaSaida = extractTransactionData(processedData)
        setData(entradaSaida);
        const totalEntradas = entradaSaida.entradasDetails.reduce((total, entrada) => total + parseFloat(entrada.firstValue), 0);
        const totalSaidas = entradaSaida.saidasDetails.reduce((total, saida) => total + parseFloat(saida.firstValue), 0);
        setChartData({
          labels: ['Entradas', 'Saídas'],
          datasets: [
            {
              data: [totalEntradas, totalSaidas],
              backgroundColor: ['#4CAF50', '#F44336'], // Cores para o gráfico
              hoverBackgroundColor: ['#66BB6A', '#E57373'], // Cores ao passar o mouse
            },
          ],
        })
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const Input = styled('input')({
    display: 'none',
  });

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded)
    const fileName = fileUploaded.name;
    const fileExtension = fileName.split('.').pop(); // Extrai a extensão
    if (fileName.length >= 60) {
      setFileName(`${fileName.slice(0, 60)}... .${fileExtension}`);
    } else {
      setFileName(fileName); // Mantém o nome original se for menor que 20 caracteres
    }
  };

  const handleSendFile = () => {
    if (!file) {
      setError("Nenhum arquivo selecionado!")
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:4000/read-extrato', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar o arquivo');
        }
        return response.json();
      })
      .then(data => {

        const processedTransactions = processTransactions(data.dados.transacoes);
        const { entradas, saidas } = splitTransactions(processedTransactions);

        const processedData = {
          ...data,
          entradas,
          saidas,
        };
        const entradaSaida = extractTransactionData(processedData)
        const totalEntradas = entradaSaida.entradasDetails.reduce((total, entrada) => total + parseFloat(entrada.firstValue), 0);
        const totalSaidas = entradaSaida.saidasDetails.reduce((total, saida) => total + parseFloat(saida.firstValue), 0);
        console.log(totalEntradas);
        console.log(totalSaidas);

        setChartData({
          labels: ['Entradas', 'Saídas'],
          datasets: [
            {
              data: [totalEntradas, totalSaidas],
              backgroundColor: ['#4CAF50', '#F44336'], // Cores para o gráfico
              hoverBackgroundColor: ['#66BB6A', '#E57373'], // Cores ao passar o mouse
            },
          ],
        })
        setData(entradaSaida);
        setLoading(false);
        setModalState(false)
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={styles.container}>
      <ModalBasico
        style={modalStyle}
        modal={modalState.novoExtrato}
        setModal={setModalState}
        titulo="Novo extrato"
      >
        <div style={styles.containerModal}>
          <label htmlFor="contained-button-file" style={styles.modalLabel}>
            <Input
              accept=".pdf"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            <Button style={styles.modalSecondaryButton} variant="outlined" component="span" >
              Escolher arquivo
            </Button>
            <span style={styles.spanFileName}>{fileName ? fileName : "Nenhum arquivo escolhido"}</span> {/* Exibe o nome do arquivo se existir */}
          </label>
          <Button style={styles.modalButton} variant="contained" onClick={handleSendFile}>Anexar</Button>
        </div>
        {error && (
          <Box style={styles.error}>
            <Alert variant="filled" severity="warning">
              {error}
            </Alert>
          </Box>
        )}
      </ModalBasico >

      <ModalBasico
        style={modalStyle}
        modal={modalState.grafico}
        setModal={setModalState}
      >
        <>
          <Abas valor={aba} setValor={setAba} labels={['pizza', 'anel']} />
          <div style={styles.modalGrafico}>
            <Grafico chartData={chartData} chartType={aba} />
          </div>
        </>

      </ModalBasico>
      <Typography variant="h1" align="center" gutterBottom
        sx={{
          fontSize: "36px",
          marginBottom: "10px",
          textAlign: "left",
          color: "#2980B9",
          fontWeight: 'bold'
        }}>
        Extrato
      </Typography>
      <Typography variant="h4" align="center" gutterBottom
        sx={{
          fontSize: "1.8rem",
          marginBottom: "20px",
          textAlign: "left",
          color: "#595959",
        }}>
        Acompanhe seus ganhos, despesas e controle financeiro de maneira simples e eficiente.
      </Typography>


      <div style={styles.header}>
        <div style={styles.headerContent}>
          <p><strong>Período:</strong> 06/12/2023 a 01/09/2024</p>
          <p><strong>Nome:</strong> MARCOS ****** ****** *****</p>
          <p><strong>CPF:</strong> 853.***.***-04</p>
        </div>

        <div>
          <MenuKebab menuItems={menuItems} />
        </div>
      </div>

      {/* Tabelas lado a lado */}
      <div style={styles.tablesContainer}>
        {/* Entradas */}
        <div style={styles.table}>
          <h2 style={styles.entradasTitle}>Entradas</h2>
          <ul style={styles.transactionsList}>
            {data.entradasDetails.map((entrada, index) => (
              <li
                key={index}
                style={{
                  ...styles.transactionItem,
                  ...(hoverIndex === index ? styles.transactionItemHover : {}),
                }}
                onMouseEnter={() => setHoverIndex(index)} // Quando o mouse entra
                onMouseLeave={() => setHoverIndex(null)}  // Quando o mouse sai
              >
                <p ><strong>{entrada.headerText}</strong></p>
                <p ><strong>Valor:</strong> R$ {entrada.firstValue}</p>
              </li>
            ))}
          </ul>
          <div style={styles.totalContainer}>
            <strong>Total de Entradas: </strong>
            R$ {formatadorMonetario(data.entradasDetails.reduce((total, entrada) => total + parseFloat(entrada.firstValue), 0))}
          </div>
        </div>

        {/* Saídas */}
        <div style={styles.table}>
          <h2 style={styles.saidasTitle}>Saídas</h2>
          <ul style={styles.transactionsList}>
            {data.saidasDetails.map((saida, index) => (
              <li
                key={index}
                style={{
                  ...styles.transactionItem,
                  ...(hoverIndexSaida === index ? styles.transactionItemHover : {}),
                }}
                onMouseEnter={() => setHoverIndexSaida(index)} // Quando o mouse entra
                onMouseLeave={() => setHoverIndexSaida(null)}  // Quando o mouse sai
              >
                <p><strong>{saida.headerText}</strong></p>
                <p><strong>Valor:</strong> R$ {saida.firstValue}</p>
              </li>
            ))}
          </ul>
          <div style={styles.totalContainer}>
            <strong>Total de Saídas: </strong>
            R$ {formatadorMonetario(data.saidasDetails.reduce((total, saida) => total + parseFloat(saida.firstValue), 0))}
          </div>
        </div>
      </div>
    </div >
  );
};