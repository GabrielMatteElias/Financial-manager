import React from "react";
import TextField from "@mui/material/TextField";
import { lidarComColagemCpfCnpj, validarTamanhoCpfCnpj } from "../../../../utils/formatadores";

export default function InputCpfCnpj({ valor, setValor }) {
    // Manipula a mudança de valor no input
    const handleChange = (e) => {
        const novoValor = validarTamanhoCpfCnpj(e.target.value);
        setValor(novoValor);
    };

    // Manipula a colagem de valores no input
    const handlePaste = (e) => {
        e.preventDefault(); // Impede a colagem direta sem formatação
        const valorFormatado = lidarComColagemCpfCnpj(e);
        setValor(valorFormatado);
    };

    return (
        <TextField
            type="text"
            name="cpfCnpj"
            value={valor}
            onChange={handleChange}
            onPaste={handlePaste}
            label='CPF'
            fullWidth
            variant="outlined"
            placeholder='***.***.***-**'
        />
    );
}
