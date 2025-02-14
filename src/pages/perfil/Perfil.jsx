import React, { useState } from 'react';
import { Box, Paper, Avatar, Typography, Divider, Grid2, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import userPhoto from '../../assets/userPhoto.jpg'
import { ModalBasico } from '../components/modal/Modal';
import { EditarPerfil } from './components/EditarPerfil';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
};

const user = {
    name: 'Gabriel Matte Elias',
    email: 'gabriel@gmail.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123, São Paulo, SP',
    dob: '10/12/2024',
};

export default function Perfil() {

    const [modalState, setModalState] = useState(false);
    const [userPic, setUserPic] = useState(null);


    const handleAvatarChange = (event) => {
        const file = event.target.files[0];       
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Atualiza a foto do avatar no estado
                setUserPic({
                    ...userPhoto,
                    src: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <ModalBasico
                style={modalStyle}
                modal={modalState}
                setModal={() => setModalState(false)}
                titulo="Editar perfil"
            >
                <EditarPerfil
                    user={user}
                />
            </ModalBasico>
            <Paper elevation={3} sx={{ p: 3, position: 'relative' }}>
                {/* Botão de edição no canto superior direito */}
                <IconButton
                    onClick={() => setModalState(true)}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'white',
                        padding: 1
                    }}
                >
                    <EditIcon />
                </IconButton>

                {/* Header com Avatar e Nome */}
                <Box sx={{ display: 'flex', align: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        {/* Avatar */}
                        <Avatar
                            src={userPic ? userPic.src : userPhoto.src}
                            alt={user.name}
                            sx={{
                                width: 100,
                                height: 100,
                                mr: 3,
                            }}
                        />

                        {/* Texto de "Editar Foto" sobre o avatar */}
                        <label htmlFor="avatar-upload">
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    bottom: '11px',
                                    left: '41%',
                                    transform: 'translateX(-50%)',
                                    cursor: 'pointer',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem', // Ajuste do tamanho da fonte
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Alteração do fundo ao passar o mouse
                                        opacity: 0.8, // Efeito de opacidade para um efeito mais suave
                                    },
                                }}
                            >
                                Editar Foto
                            </Typography>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                            id="avatar-upload"
                        />
                    </Box>

                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{ fontSize: '1.325rem' /* 32.5% maior que o padrão 1rem */ }}
                        >
                            {user.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{ fontSize: '1.325rem' }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <Divider />

                {/* Informações do usuário */}
                <Grid2 container spacing={2} sx={{ mt: 3 }}>
                    <Grid2 xs={12} md={6}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            sx={{ fontSize: '1.325rem' }}
                        >
                            Telefone:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.325rem' }}>
                            {user.phone}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} md={6}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            sx={{ fontSize: '1.325rem' }}
                        >
                            Data de Nascimento:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.325rem' }}>
                            {user.dob}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            sx={{ fontSize: '1.325rem' }}
                        >
                            Endereço:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.325rem' }}>
                            {user.address}
                        </Typography>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box>
    );

};