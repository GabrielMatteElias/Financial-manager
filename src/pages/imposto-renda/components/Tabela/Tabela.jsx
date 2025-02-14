import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { formatadorMonetario } from '../../../../utils/formatadores';

export function renderSection( sectionData, legendas ) {    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Descrição</TableCell>
                        <TableCell align="right" sx={{ paddingRight: "1rem" }}>
                            Valor
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(sectionData).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{legendas[key] || key}</TableCell>
                            <TableCell align="right">{formatadorMonetario(value)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};