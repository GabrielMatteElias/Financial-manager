import { Alert, Box, Button, Slider, TextField, Typography } from '@mui/material';
import { useState } from "react";
import { formatCurrency } from '../../../../utils/formatadores';

export function UpdateMeta({ meta, retornaUpdatedMeta }) {

    const [value, setValue] = useState(meta.valorAlcancado);
    const [alerta, setAlerta] = useState('');

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatCurrency(inputValue);
        if (formattedValue > meta.valor) {
            setValue(meta.valor);
            return;
        }
        setValue(formattedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value === meta.valorAlcancado) {
            setAlerta("Por favor altere o valor antes de salvar!")
            return
        }

        retornaUpdatedMeta(value, meta.nome);
        setAlerta("Valor alcançado alterado com sucesso!")
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
            <Typography sx={{ fontSize: '1.3rem' }}>Digite um valor de até: R${meta.valor} reais</Typography>
            <TextField
                label="Novo valor"
                value={value.toLocaleString("pt-BR", {
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
                    Salvar
                </Button>
            </Box>
            {alerta && (
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {alerta.includes("Por favor") ? (
                        <Alert variant="filled" severity="warning">
                            {alerta}
                        </Alert>
                    ) : (
                        <Alert variant="filled" severity="success">
                            {alerta}
                        </Alert>
                    )}
                </Box>
            )}
        </Box>
    );
};