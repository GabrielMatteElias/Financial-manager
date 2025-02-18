import { Box, TextField, Button, Stack } from '@mui/material';
import { useEffect, useState } from "react";

export function EditarPerfil({ user }) {
    const [userData, setUserData] = useState({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        celular: user.celular,
        nascimento: user.nascimento,
    });

    useEffect(() => {
        if (user) {
            setUserData({
                nome: user.nome || "",
                sobrenome: user.sobrenome || "",
                email: user.email || "",
                celular: user.celular || "",
                nascimento: user.nascimento || "",
            });
        }
    }, [user]);

    const handleSave = () => {
        console.log('Dados do usuário atualizados', userData);
        console.log('Dados do usuário atualizados', userData);
        console.log('Dados do usuário atualizados', userData);
        console.log('Dados do usuário atualizados', userData);
        console.log('Dados do usuário atualizados', userData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Verificar se o campo é a data e formatar antes de atualizar o estado
        if (name === "nascimento") {
            const date = new Date(value);
            const formattedDate = date.toISOString().split('T')[0]; // Formata para "yyyy-MM-dd"
            setUserData({ ...userData, [name]: formattedDate });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                    label="Nome"
                    name="nome"
                    value={userData.nome || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Sobrenome"
                    name="sobrenome"
                    value={userData.sobrenome || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            </Stack>
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
                name="celular"
                value={userData.celular}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Data de Nascimento"
                name="nascimento"
                type="date"
                value={userData.nascimento}
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