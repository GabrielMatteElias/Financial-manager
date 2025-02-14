import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { formatCurrency } from '../../utils/formatadores';
import { isEmpty } from '../../utils/validadores';
import Swal from 'sweetalert2';
import { Grafico } from '../components/grafico/Grafico';

export function CalculadoraJurosCompostos() {
    // Estados dos inputs
    const [valorInicial, setValorInicial] = useState('');
    const [valorMensal, setValorMensal] = useState('');
    const [taxaJuros, setTaxaJuros] = useState('');
    const [tempo, setTempo] = useState('');

    const [resultado, setResultado] = useState(null);
    const [aba, setAba] = useState(1) //state selecao de aba
    const [chartData, setChartData] = useState([]);


    // Função para calcular os juros compostos
    const calcularJurosCompostos = () => {

        if (isEmpty(valorInicial, valorMensal, taxaJuros, tempo)) {
            Swal.fire({
                title: "Falha ao cadastrar!",
                text: "Por favor, preencha todos os campos para prosseguir!",
                icon: "warning",
                confirmButtonColor: '#2980B9',
            });
            return; // Impede o envio do formulário se algum campo estiver vazio
        }

        let valorInicio = parseFloat(valorInicial);
        let valorMes = parseFloat(valorMensal);
        let taxaMensal = parseFloat(taxaJuros / 100);
        let meses = parseInt(tempo);

        const montanteFinal = valorInicio * Math.pow(1 + taxaMensal, meses) + valorMes * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
        const valorInvestido = valorInicio + (valorMes * meses)
        const jurosGanhos = montanteFinal - (valorInicio + (valorMes * meses))

        setChartData({
            labels: ['Total investido', 'Juros ganhos'],
            datasets: [
                {
                    data: [valorInvestido, jurosGanhos],
                    backgroundColor: ['#4CAF50', '#3688f4'], // Cores para o gráfico
                    hoverBackgroundColor: ['#66BB6A', '#73a4e5'], // Cores ao passar o mouse
                },
            ],
        })

        setResultado({
            montanteFinal: montanteFinal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2, }),
            valorInvestido: valorInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2, }),
            jurosGanhos: jurosGanhos.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2, }),
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Formatar o valor para o formato de moeda
        const formattedValue = formatCurrency(value);

        // Atualizar o estado de acordo com o input alterado
        if (name === 'valorInicial') {
            setValorInicial(formattedValue);
        } else if (name === 'valorMensal') {
            setValorMensal(formattedValue);
        } else {
            setTaxaJuros(formattedValue)
        }
    };

    const handleTempo = (e) => {
        const { value } = e.target;

        if (value > 999) {
            setTempo(999)
            return
        }
        setTempo(value)
    };

    return (
        <>
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
                    Calculadora de juros compostos
                </Typography>
                <Typography variant="h4" align="center" gutterBottom
                    sx={{
                        fontSize: "1.8rem",
                        marginBottom: "20px",
                        textAlign: "left",
                        color: "#595959",
                    }}
                >
                    Use a calculadora de juros compostos para analisar se empréstimos e investimentos.
                </Typography>
            </Box>
            <Box>
                <Box display='flex' justifyContent='flex-end' gap={5}>
                    <TextField
                        label="Valor"
                        value={valorInicial.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name='valorInicial'
                    />
                    <TextField
                        label="Valor Mensal"
                        value={valorMensal.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name='valorMensal'

                    />
                </Box>

                <Box display='flex' justifyContent='flex-end' gap={5}>
                    <TextField
                        label="Taxa de Juros Mensal (%)"
                        value={taxaJuros.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })} onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Período (mês)"
                        type="number"
                        value={tempo}
                        onChange={handleTempo}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </Box>

                <Box display='flex' justifyContent='flex-end'>
                    <Button onClick={calcularJurosCompostos} variant="contained" sx={{ backgroundColor: '#2980B9', color: '#fff' }}>
                        Calcular
                    </Button>
                </Box>

                {resultado && (
                    <Box marginTop={2} display='flex' justifyContent='space-evenly' alignItems='center'>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 450 }} aria-label="resultado da calculadora">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Descrição</TableCell>
                                            <TableCell align="right">Valor</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        
                                        <TableRow>
                                            <TableCell align="left">Valor Investido</TableCell>
                                            <TableCell align="right">{resultado.valorInvestido}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Juros Ganhos</TableCell>
                                            <TableCell align="right">{resultado.jurosGanhos}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" sx={{fontWeight: 'bold'}}>Total</TableCell>
                                            <TableCell align="right" sx={{fontWeight: 'bold'}}>{resultado.montanteFinal}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                        <Grafico chartData={chartData} chartType={aba} altura='250px' largura='250px'/>

                    </Box>
                )}
            </Box>
        </>
    );
};