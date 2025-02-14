import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { formatarTelefone } from "../../../../utils/formatadores";

export default function InputTelefone({ valor, setValor }) {
    const handleTelefoneChange = (e) => {
        const telefoneFormatado = formatarTelefone(e.target.value);
        setValor(telefoneFormatado);
    };

    return (
        <TextField
            type="tel"
            name="telefone"
            value={valor}
            label='Telefone'
            onChange={handleTelefoneChange}            
            fullWidth
            variant="outlined"
            placeholder='(**)*****-****'
            slotProps={{
                input: {
                    startAdornment:
                        <InputAdornment position="start">
                            <span style={{ fontSize: '1.5rem', marginTop: '.3rem' }}>+55</span>
                        </InputAdornment>,
                },
            }}
        />
    );
}
