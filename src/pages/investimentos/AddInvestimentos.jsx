import { TextField, MenuItem, Button, Box, Typography, Grid } from '@mui/material';
import { useState } from "react";
import Swal from 'sweetalert2';
import { isEmpty } from '../../utils/validadores';
import { Link } from 'react-router-dom';

export function AddInvestimentos() {
    
    const [valorInicial, setValorInicial] = useState('');
    const [tipoInvestimento, setTipoInvestimento] = useState('');
    const [nomeInvestimento, setNomeInvestimento] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [rentabilidade, setRentabilidade] = useState('');
    const [liquidez, setLiquidez] = useState('');
    const [valorAtual, setValorAtual] = useState('');
    const [impostos, setImpostos] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const campos = [
            valorInicial,
            tipoInvestimento,
            nomeInvestimento,
            dataInicio,
            dataVencimento,
            rentabilidade,
            liquidez,
            valorAtual,
            impostos
        ];

        if (
            isEmpty(valorInicial,
                tipoInvestimento,
                nomeInvestimento,
                dataInicio,
                dataVencimento,
                rentabilidade,
                liquidez,
                valorAtual,
                impostos)
        ) {
            Swal.fire({
                title: "Falha ao cadastrar!",
                text: "Por favor, preencha todos os campos para prosseguir!",
                icon: "warning",
                confirmButtonColor: '#2980B9',
            });
            return; // Impede o envio do formulário se algum campo estiver vazio
        }

        const novoInvestimento = {
            valorInicial,
            tipoInvestimento,
            nomeInvestimento,
            dataInicio,
            dataVencimento,
            rentabilidade,
            liquidez,
            valorAtual,
            impostos
        };
    };

    return (
        <Box>

            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#2980B9' }}>
                Novo investimento
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Tipo de Investimento"
                            value={tipoInvestimento}
                            onChange={(e) => setTipoInvestimento(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        >
                            <MenuItem value="CDB">CDB</MenuItem>
                            <MenuItem value="Tesouro Direto">Tesouro Direto</MenuItem>
                            <MenuItem value="LCI">LCI</MenuItem>
                            <MenuItem value="LCA">LCA</MenuItem>
                            <MenuItem value="LCA">Ação</MenuItem>
                            <MenuItem value="LCA">FIIs</MenuItem>
                            <MenuItem value="LCA">Bitcoin</MenuItem>
                            <MenuItem value="LCA">Ethereum</MenuItem>
                            <MenuItem value="LCA">Solana</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nome do Investimento"
                            value={nomeInvestimento}
                            onChange={(e) => setNomeInvestimento(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Data de Início"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Data de Vencimento"
                            type="date"
                            value={dataVencimento}
                            onChange={(e) => setDataVencimento(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Valor Inicial"
                            type="number"
                            value={valorInicial}
                            onChange={(e) => setValorInicial(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Rentabilidade"
                            value={rentabilidade}
                            onChange={(e) => setRentabilidade(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Liquidez"
                            value={liquidez}
                            onChange={(e) => setLiquidez(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Impostos"
                            value={impostos}
                            onChange={(e) => setImpostos(e.target.value)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem', marginTop: '20px' }}>
                    <Link to='/investimentos'>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#b92929', color: '#fff', padding: '10px 20px' }}>
                            Cancelar
                        </Button>
                    </Link>
                    <Button onClick={handleSubmit} type="submit" variant="contained" sx={{ backgroundColor: '#2980B9', color: '#fff', padding: '10px 20px' }}>
                        Cadastrar
                    </Button>
                </Box>
            </form>
        </Box>
    );
};