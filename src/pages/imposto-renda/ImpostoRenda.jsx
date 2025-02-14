import { useState } from "react";
import { Box, Button, Typography, Card, CardContent, CardHeader, CircularProgress } from '@mui/material';
import { Abas } from "../components/tabs/Tabs";
import { MenuKebab } from "../components/menuKebab/MenuKebab";
import { ModalBasico } from "../components/modal/Modal";
import { Dependentes } from "./components/dependentes/Dependentes";
import { Pagamentos } from "./components/pagamentos/Pagamentos";
import { renderSection } from "./components/Tabela/Tabela";

const dataImposto = {
    "dados": {
        "pessoaFisica": "CRISTIANO CORREA",
        "nomeEmpresa": "RESTINGA TRANSPORTES COLETIVOS LTDA",
        "cpf": "928.266.360-49",
        "cnpj": "93.315.000/0001-61"
    },
    "rendimento": {
        "impRendDecTerc": 450.85,
        "rendimentosTotais": 55320.75,
        "decTercSal": 4583.55,
        "impostoRetido": 6345.40,
        "prevSocial": 7225.6
    },
    "rendimentosAcumulados": {
        "contribPrevSocial": 1820.35,
        "despesasJudiciais": 2505.95,
        "impRetidoRendRec": 805.45,
        "totalRendimentosTrib": 58025.60,
        "rendIsentos": 10035.25,
        "pensaoRecebida": 3625.50
    },
    "rendimentosIsentos": {
        "provApos-e-AcidenteTrabalho": 5025.15,
        "parcIsentaApos": 2420.65,
        "rescisaoContratoDeTrabalho": 15050.80,
        "lucros-e-dividendos": 8050.25,
        "ajudaDeCusto": 1215.35,
        "decTercApos": 3515.75,
        "Outros": 2025.85,
        "pagamentosAoTitular": 4510.65,
        "JurosDeMora": 910.35
    },
    "rendimentosExclusivos": {
        "impRetidoDecTerc": 455.75,
        "decTercSal": 4595.25,
        "outrosRendExclusivos": 2025.45
    }
}

const legendas = {
    pessoaFisica: "Nome",
    nomeEmpresa: "Empresa",
    cpf: "CPF",
    cnpj: "CNPJ",
    impRendDecTerc: "Imposto de renda décimo terceiro",
    rendimentosTotais: "Rendimentos totais",
    decTercSal: "Décimo terceiro salário",
    impostoRetido: "Imposto retido",
    prevSocial: "Previdência social",
    contribPrevSocial: "Contribuição previdenciária social",
    despesasJudiciais: "Despesas judiciais",
    impRetidoRendRec: "Imposto retido sobre rendimentos recebidos",
    totalRendimentosTrib: "Total de rendimentos tributáveis",
    rendIsentos: "Rendimentos isentos",
    pensaoRecebida: "Pensão recebida",
    "provApos-e-AcidenteTrabalho": "Proventos de aposentadoria e acidente de trabalho",
    parcIsentaApos: "Parcela isenta de aposentadoria",
    rescisaoContratoDeTrabalho: "Rescisão de contrato de trabalho",
    "lucros-e-dividendos": "Lucros e dividendos",
    ajudaDeCusto: "Ajuda de custo",
    decTercApos: "Décimo terceiro de aposentadoria",
    Outros: "Outros",
    pagamentosAoTitular: "Pagamentos ao titular",
    JurosDeMora: "Juros de mora",
    impRetidoDecTerc: "Imposto retido sobre décimo terceiro",
    outrosRendExclusivos: "Outros rendimentos exclusivos",
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

export default function ImpostoDeRenda() {

    const [fileName, setFileName] = useState('');
    const [aba, setAba] = useState(1);
    const [carregamento, setCarregamento] = useState(false);
    const [modalState, setModalState] = useState({ abrir: false, pagamentos: false, dependentes: false });
    const [error, setError] = useState(null);

    const menuItems = [
        {
            label: 'Pagamentos',
            onClick: () => setModalState({ pagamentos: true, abrir: true }),
        },
        {
            label: 'Dependentes',
            onClick: () => setModalState({ dependentes: true, abrir: true }),
        }
    ];

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setCarregamento(true)
            setFileName('');
            setTimeout(() => {
                setCarregamento(false)
                setFileName(file.name);
            }, 2000)
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h1" align="center" gutterBottom
                        sx={{
                            fontSize: "36px",
                            marginBottom: "10px",
                            textAlign: "left",
                            color: "#2980B9",
                            fontWeight: 'bold'
                        }}>
                        Imposto de Renda
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontSize: "1.8rem",
                            marginBottom: "20px",
                            textAlign: "left",
                            color: "#595959",
                        }}>
                        Organize e simplifique sua declaração do imposto de renda de forma prática.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '3rem', alignItems: 'center', paddingTop: '.7rem' }}>
                    <input
                        accept=".pdf"
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input">
                        <Button variant="contained" sx={{ height: '3rem', width: '20rem' }} component="span" disabled={carregamento}>
                            {carregamento ?
                                <CircularProgress size={17} /> :
                                'Anexar informe de rendimentos'}
                        </Button>
                    </label>
                </Box>
            </Box>

            {!fileName && (
                <>

                    <ModalBasico
                        style={modalStyle}
                        modal={modalState.abrir}
                        setModal={setModalState}
                        titulo={modalState.pagamentos ? "Pagamentos" : "Dependentes"}
                    >
                        {modalState.pagamentos ? (
                            <Pagamentos />
                        ) : (
                            <Dependentes />
                        )}
                    </ModalBasico>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'justify-between',
                        alignItens: 'center',
                        gap: '35px',
                        fontSize: '1.8rem',
                        color: "#595959",
                        padding: '1.5rem 1rem'
                    }}>
                        <Typography sx={{ marginBottom: 1, fontSize: '1.8rem' }}>
                            <strong>Nome:</strong> <br />{dataImposto.dados.pessoaFisica}
                        </Typography>

                        <Typography sx={{ marginBottom: 1, fontSize: '1.8rem' }}>
                            <strong>CPF:</strong> <br />{dataImposto.dados.cpf}
                        </Typography>
                    </Box>

                    <Card>
                        <CardHeader
                            title={
                                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                    <Abas labels={['tributáveis', 'acumulados', 'isentos']} setValor={setAba} valor={aba} />
                                    <Box sx={{ position: 'absolute', right: '5px', top: '8px' }}>
                                        <MenuKebab menuItems={menuItems} />
                                    </Box>
                                </Box>
                            }
                            sx={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                        />

                        <CardContent>
                            {aba === 1 &&
                                renderSection(dataImposto.rendimento, legendas)
                            }

                            {aba === 2 &&
                                renderSection(dataImposto.rendimentosAcumulados, legendas)}

                            {aba === 3 &&
                                renderSection(dataImposto.rendimentosIsentos, legendas)
                            }

                            {aba === 4 &&
                                renderSection(dataImposto.rendimentosExclusivos, legendas)
                            }
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    );
}