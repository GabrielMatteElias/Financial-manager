import { Typography, Box, Button, Divider } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link } from 'react-router-dom';
import rendaFixaImg from '../../assets/rendaFixa.jpg';
import rendaVariavelImg from '../../assets/rendaVariavel.jpg';
import criptomoedasImg from '../../assets/criptomoedas.jpg';
import { Grafico } from '../components/grafico/Grafico';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import btcLogo from '../../assets/btc.png'
import ethLogo from '../../assets/eth.png'
import adaLogo from '../../assets/ada.png'
import dotLogo from '../../assets/dot.png'
import ltcLogo from '../../assets/ltc.png'
import solLogo from '../../assets/sol.png'
import { useEffect, useState } from 'react';

const tesouroDireto = 25000.00;
const cdb = 15000.50;
const acoes = 12000.75;
const fiis = 8000.30;
const bitcoin = 10248.91;
const ethereum = 6869.02;
const solana = 4788.14;

const graficoInvestimentos = {
    labels: ['Tesouro Direto', 'CDB', 'Ações', 'FIIs', 'Bitcoin', 'Ethereum', 'Solana'],
    datasets: [
        {
            data: [tesouroDireto, cdb, acoes, fiis, bitcoin, ethereum, solana], // Valores dos investimentos
            backgroundColor: ['#4CAF50', '#3688f4', '#FF9800', '#FF5722', '#FFC107', '#9C27B0', '#03A9F4'], // Cores para cada barra
            hoverBackgroundColor: ['#66BB6A', '#73a4e5', '#FFB74D', '#FF8A65', '#FFEB3B', '#BA68C8', '#29B6F6'], // Cores ao passar o mouse
        },
    ],
};

const criptos = [
    { nome: 'Bitcoin', valor: 10248.91, img: btcLogo },
    { nome: 'Ethereum', valor: 6869.02, img: ethLogo },
    { nome: 'Solana', valor: 4788.14, img: solLogo },
    { nome: 'Cardano', valor: 1.20, img: adaLogo },
    { nome: 'Litecoin', valor: 0.75, img: ltcLogo },
];


export default function Investimentos() {

    const[listaCriptos, setListaCriptos] = useState([])

    const getCriptos = async () => {
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,polkadot,cardano,litecoin&vs_currencies=usd";
        const response = await fetch(url);
        const data = await response.json();
        const criptos = Object.entries(data).map(([nome, valor]) => ({
            nome: nome.charAt(0).toUpperCase() + nome.slice(1), // Capitaliza a primeira letra
            valor: valor.usd
        }))
        setListaCriptos(criptos)
    }

    useEffect(() => {
        getCriptos()
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Box>
                    <Typography variant="h1" align="center" gutterBottom
                        sx={{
                            fontSize: "36px",
                            marginBottom: "10px",
                            textAlign: "left",
                            color: "#2980B9",
                            fontWeight: 'bold'
                        }}
                    >
                        Investimentos
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontSize: "1.8rem",
                            marginBottom: "20px",
                            textAlign: "left",
                            color: "#595959",
                        }}
                    >
                        Gerencie seus investimentos de forma eficiente.
                    </Typography>
                </Box>
                <Link to='/investimentos/novo-investimento'>
                    <Button variant="contained" sx={{ height: '3rem' }}>Adicionar Investimento</Button>
                </Link>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateAreas: `
            "top1 top1 top2 top2 top3"
            "bottom1 bottom1 bottom1 bottom1 bottom2"
        `,
                    gap: 2,
                    width: "100%",
                }}
            >
                {[
                    { area: "top1", title: "Renda Fixa", desc: "(CDB, Tesouro Direto...)", img: rendaFixaImg },
                    { area: "top2", title: "Renda Variável", desc: "(Ações, FIIs...)", img: rendaVariavelImg },
                    { area: "top3", title: "Criptomoedas", desc: "(Bitcoin, Ethereum, Solana...)", img: criptomoedasImg },
                    {
                        area: 'bottom1',
                        content: 'mercado',
                    },
                    {
                        area: 'bottom2',
                        content: 'cripto',
                    },
                ].map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            gridArea: item.area,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: item.area.includes("bottom") ? "30rem" : "12rem",
                            padding: "20px",
                            borderRadius: "4px",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "filter 0.3s ease, background 0.3s ease",
                            backgroundImage: `url(${item.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                            border: '1px solid #ccc',
                            "&::before": {
                                content: '""',
                                position: item.content ? '' : "absolute",
                                top: item.content ? '' : 0,
                                left: item.content ? '' : 0,
                                width: item.content ? '' : "100%",
                                height: item.content ? '' : "100%",
                                backgroundColor: item.content ? '' : "rgba(0, 0, 0, 0.6)", // Overlay escuro
                                transition: item.content ? '' : "background 0.3s ease",
                                zIndex: 1,
                            },
                            "&:hover::before": {
                                backgroundColor: item.content ? '' : "rgba(0, 0, 0, 0.3)", // Fica mais claro no hover
                            },
                            "& h3, & p": {
                                position: "relative",
                                zIndex: 2,
                                color: "#fff",
                            },
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.185)", // Fica mais claro no hover
                            },
                        }}
                    >
                        {item.content ? (
                            <Box width='100%'>
                                {item.content === 'mercado' ? (
                                    <Box position='relative' display='flex' justifyContent='center'>
                                        <span style={{ display: 'flex', alignContent: 'center', position: 'absolute', top: 240, right: 0, fontSize: '1.1rem', color: '#636363' }}>
                                            Acessar investimentos<ArrowForwardIosIcon sx={{ color: '#636363' }} />
                                        </span>
                                        <Grafico altura={'250px'} chartData={graficoInvestimentos} chartType={2} />
                                    </Box>
                                ) : (
                                    <>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Typography variant='h6' sx={{fontSize: '1.6rem', fontWeight: 'bold'}}>Cotação(dólar)</Typography>
                                            {listaCriptos.map((cripto, index) => (
                                                <Box key={index} >
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px 0' }}>
                                                        <Box display='flex' alignItems='center' gap={1}>
                                                            <img width={25} src={cripto.img} />
                                                            <Typography variant="p" sx={{ fontSize: '1.5rem' }}>
                                                                {cripto.nome}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="p" fontSize={15}>${cripto.valor.toFixed(2)}</Typography>
                                                    </Box>
                                                    {index + 1 !== criptos.length && (<Divider ></Divider>)}
                                                </Box>
                                            ))}
                                        </Box>
                                    </>
                                )}
                            </Box>
                        ) : (
                            <>
                                <Typography variant='h3' color='#595959'>{item.title}</Typography>
                                <Typography fontSize={12} color='#919090'>{item.desc}</Typography>
                            </>
                        )}
                    </Box>

                ))}
            </Box>
        </>
    );
};