import { useState } from 'react';
import { ModalBasico } from '../components/modal/Modal';
import { AddMeta } from './components/addMeta/AddMeta'
import { Card, CardContent, Typography, Box, Button, CardActions, LinearProgress, Tooltip } from '@mui/material';
import greciaJpg from '../../assets/grecia.jpg'
import whiskyJpg from '../../assets/whisky.jpg'
import bolsoJpg from '../../assets/bolso.jpg'
import carroJpg from '../../assets/carro.jpg'
import cursoJpg from '../../assets/curso.jpg'
import armarioJpg from '../../assets/armario.jpg'
import casaJpg from '../../assets/casa.jpg'
import bicicletaJpg from '../../assets/bicicleta.jpg'
import computadorJpg from '../../assets/computador.jpg'
import padraoJpg from '../../assets/metaPadrao.jpg'

import { formatadorData, formatadorMonetario } from '../../utils/formatadores'
import { RemoveMeta } from './components/removeMeta/RemoveMeta';
import { UpdateMeta } from './components/updateMeta/UpdateMeta';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const metas = [
    { nome: 'Perfume bolsonaro', valor: 255.00, valorAlcancado: 230.00, data: '01/12/2024' },
    { nome: 'Viagem de férias', valor: 25000.00, valorAlcancado: 12000.00, data: '15/06/2025' },
    { nome: 'Whisky', valor: 125.00, valorAlcancado: 125.00, data: '10/03/2024' },
    { nome: 'Carro novo', valor: 50000.00, valorAlcancado: 35000.00, data: '01/11/2025' },
    { nome: 'Curso de Design', valor: 3000.00, valorAlcancado: 1500.00, data: '30/04/2024' },
    { nome: 'Armário', valor: 1500.00, valorAlcancado: 800.00, data: '20/09/2024' },
    { nome: 'Casa própria', valor: 200000.00, valorAlcancado: 120000.00, data: '01/01/2026' },
    { nome: 'Computador', valor: 8000.00, valorAlcancado: 8000.00, data: '15/06/2024' },
    { nome: 'Bicicleta elétrica', valor: 4000.00, valorAlcancado: 1500.00, data: '10/08/2024' }
];

export default function Metas() {
    const [modalState, setModalState] = useState({ add: false, remove: false, update: false });
    const [listaMetas, setListaMetas] = useState(metas);
    const [metaChange, setMetaChange] = useState(null);

    const getProgressColor = (progresso) => {
        if (progresso <= 15) {
            return "error";  
        } else if (progresso <= 30) {
            return "warning";  
        } else if (progresso <= 50) {
            return "info";  
        } else if (progresso <= 80) {
            return "primary";  
        } else {
            return "success";  
        }
    };

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        {...props}
                        color={getProgressColor(props.value)}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    function handleAdicionaNovaMeta(nome, valor, data) {
        const dataFormatada = formatadorData(data)
        setListaMetas((prevMetas) => [
            ...prevMetas,
            { nome, valor, data: dataFormatada, valorAlcancado: 0 },
        ]);
    }

    function handleUpdateMeta(meta) {
        setMetaChange(meta)
        setModalState({ update: true })
    }

    function returnUpdateMeta(valor, nome) {
        setListaMetas((prevMetas) =>
            prevMetas.map((meta) =>
                meta.nome === nome ? { ...meta, valorAlcancado: valor } : meta
            )
        );
    }

    function handleDeleteMeta(meta) {
        setModalState({ remove: true })
        setMetaChange(meta)
    }

    function handleConfirmDelete() {
        setListaMetas((prevMetas) =>
            prevMetas.filter((meta) => meta.nome !== metaChange)
        );
        setModalState({ remove: false });
        setMetaChange(null)
    };

    function handleCancelDelete() {
        setMetaChange(null)
        setModalState({ remove: false });
    };

    return (
        <Box>
            <ModalBasico
                style={modalStyle}
                modal={modalState.add}
                setModal={() => setModalState({ add: false })}
                titulo="Nova meta"
            >
                <AddMeta retornaNovaMeta={handleAdicionaNovaMeta} />
            </ModalBasico>

            <ModalBasico
                style={modalStyle}
                modal={modalState.update}
                setModal={() => setModalState({ update: false })}
                titulo="Atualizar valor"
            >
                <UpdateMeta meta={metaChange} retornaUpdatedMeta={returnUpdateMeta} />
            </ModalBasico>

            <RemoveMeta open={modalState.remove} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} meta={metaChange} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Box>
                    <Typography variant="h1" align="center" gutterBottom
                        sx={{
                            fontSize: "36px",
                            marginBottom: "10px",
                            textAlign: "left",
                            color: "#2980B9",
                            fontWeight: 'bold'
                        }}>
                        Metas
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontSize: "1.8rem",
                            marginBottom: "20px",
                            textAlign: "left",
                            color: "#595959",
                        }}>
                        Planeje, gerencie e atinja suas metas com facilidade.
                    </Typography>
                </Box>
                <Button onClick={() => setModalState({ add: true })} variant="contained" sx={{ height: '3rem' }}>Adicionar meta</Button>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '2rem',
                    '@media (max-width: 680px)': { gridTemplateColumns: '1fr', justifyItems: 'center' },
                    margin: 'auto 0'
                }}
            >
                {listaMetas?.map((meta, index) => {
                    const isCompleted = (meta.valorAlcancado / meta.valor) * 100 === 100;
                    return (
                        <Card key={index} sx={{
                            position: 'relative', 
                            maxWidth: 345,
                            boxShadow: 3,
                            transition: 'transform 0.3s ease-out',
                            '&:hover': {
                                transform: 'scale(1.05)', 
                            },
                            backgroundColor: isCompleted ? '#d4edda' : 'white', 
                            border: isCompleted ? '2px solid #28a745' : 'none', 
                            borderRadius: 2, 
                        }}>
                            <img
                                src={
                                    meta.nome.includes("Perfume") ? bolsoJpg :
                                        meta.nome.includes("Viagem") ? greciaJpg :
                                            meta.nome.includes("Whisky") ? whiskyJpg :
                                                meta.nome.includes("Bicicleta") ? bicicletaJpg :
                                                    meta.nome.includes("Casa") ? casaJpg :
                                                        meta.nome.includes("Armário") ? armarioJpg :
                                                            meta.nome.includes("Curso") ? cursoJpg :
                                                                meta.nome.includes("Carro") ? carroJpg :
                                                                    meta.nome.includes("Computador") ? computadorJpg :
                                                                        padraoJpg
                                }
                                alt={meta.nome} 
                                width={345} 
                                height={140} 
                                style={{ objectFit: 'cover' }}
                            />

                            {isCompleted && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        borderRadius: '50%',
                                        padding: '0.3rem',
                                    }}
                                >
                                    <CheckCircleIcon
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            color: '#2e7d32',
                                            cursor: 'default',
                                            fontSize: '2.3rem'
                                        }}
                                    />
                                </Box>
                            )}

                            <CardContent sx={{ padding: '1rem' }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.5rem' }}>
                                    {meta.nome} 
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.3rem' }}>
                                    Valor: R$ {formatadorMonetario(meta.valor)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.3rem' }}>
                                    Data de encerramento: {meta.data} 
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.3rem' }}>
                                    Progresso:
                                </Typography>
                                <Tooltip
                                    title={`R$ ${formatadorMonetario(meta.valorAlcancado)} de R$ ${formatadorMonetario(meta.valor)}`}
                                    arrow>
                                    <LinearProgressWithLabel
                                        value={(meta.valorAlcancado / meta.valor) * 100}
                                    />
                                </Tooltip>
                            </CardContent>

                            <CardActions>
                                <Button size="medium" onClick={() => handleUpdateMeta(meta)}>Atualizar</Button>
                                <Button size="medium" onClick={() => handleDeleteMeta(meta.nome)}>Remover</Button>
                            </CardActions>
                        </Card>
                    );
                })}
            </Box>
        </Box >
    )
};