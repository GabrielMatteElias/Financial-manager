import { Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from "react";

export function EditarPerfil({ user }) {
    const [userData, setUserData] = useState({ ...user });
    
    useEffect(() => {
        if (userData.dob) {
            const formattedDate = new Date(userData.dob).toISOString().split('T')[0]; // Formata para "yyyy-MM-dd"
            setUserData(prevState => ({ ...prevState, dob: formattedDate }));
        }
    }, [user]);

    const handleSave = () => {
        console.log('Dados do usuário atualizados', userData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Verificar se o campo é a data e formatar antes de atualizar o estado
        if (name === "dob") {
            const date = new Date(value);
            const formattedDate = date.toISOString().split('T')[0]; // Formata para "yyyy-MM-dd"
            setUserData({ ...userData, [name]: formattedDate });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <TextField
                label="Nome"
                name="name"
                value={userData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Telefone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Data de Nascimento"
                name="dob"
                type="date"
                value={userData.dob}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Endereço"
                name="address"
                value={userData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleSave} variant="contained">
                    Salvar
                </Button>
            </Box>
        </Box>
    );
};