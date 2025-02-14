import { Box, TextField, Button } from '@mui/material';
import { useState } from "react";
import { formatCurrency } from '../../../../utils/formatadores';

export function Pagamentos() {
    const [cnpj, setCnpj] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [valor, setValor] = useState("");

    const validarTamanhoCpf = (input) => { //define um numero maximo de caracteres para o input cpf    
        let valor = String(input);
        const valorFormatado = formataCpf(valor.replace(/\D/g, '').substring(0, 14));
        return valorFormatado
    }

    const lidarComColagemCpf = (event) => { //formata cpf ao colar 
        const valorColado = event.clipboardData.getData('text/plain');

        const valorFormatado = formataCpf(valorColado.replace(/\D/g, '').substring(0, 14));
        return valorFormatado
    }

    const handleChangeCpf = (e) => {
        let valor = e.target.value;

        valor = validarTamanhoCpf(valor);

        setCnpj(valor);
    };

    const formataCpf = (value) => {
        // Remove caracteres não numéricos
        if (value.length <= 11) {
            // Formata CPF (###.###.###-##)
            return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (value.length > 11 && value.length <= 14) {
            // Formata CNPJ (##.###.###/####-##)
            return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        } else {
            return value
        }
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatCurrency(inputValue);
        setValor(formattedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                padding: '2rem 0'
            }}
        >
            <TextField
                onPaste={lidarComColagemCpf}
                value={cnpj}
                onChange={handleChangeCpf}
                label="CPF/CNPJ"
                type="text"
            />
            <TextField
                label="Nome da empresa"
                variant="outlined"
                fullWidth
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
            />
            <TextField
                label="Valor pago"
                value={valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <Box display='flex' justifyContent='flex-end'>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Adicionar
                </Button>
            </Box>
        </Box>
    );
};