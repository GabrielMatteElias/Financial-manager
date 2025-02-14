import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { validarTamanhoCpfCnpj } from "../../../utils/formatadores";

export function Tabela({ headers, data, alturaMaxima, iconeAcao, acaoIcone }) {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: alturaMaxima || '', overflow: 'auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((col, index) => (
                            <TableCell key={index} align={col.align || "left"}>
                                {col.header}
                            </TableCell>
                        ))}
                        {iconeAcao && <TableCell align="center" sx={{width: '1rem'}}></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((col, colIndex) => (
                                <TableCell key={colIndex} align={col.align || "left"}>
                                    {col.field === "cpf" || col.field === "cnpj" ? validarTamanhoCpfCnpj(row[col.field]) : row[col.field]}
                                </TableCell>
                            ))}
                            {iconeAcao && (
                                <TableCell align="center">
                                    <IconButton onClick={() => acaoIcone(row)}>
                                        {iconeAcao}
                                    </IconButton>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
