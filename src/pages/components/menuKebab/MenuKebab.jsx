//react
import React, { useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';

//mui
import { Box, Typography, ClickAwayListener, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    position: 'relative',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '2.5rem',
                    cursor: 'pointer',
                    color: '#333'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '100%',
                    textAlign: 'left',
                    padding: '2px 16px',
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: '#595959',
                    '&:hover': {
                        backgroundColor: '#f5f5f5',  
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    textAlign: 'left',
                    padding: '6px 16px',
                    fontSize: '1.2rem',
                },
            },
        },
    },
});

export function MenuKebab({
    menuItems
}) {
    const menuValido = useMemo(() =>
        menuItems.filter(item => item.label && typeof item.onClick === 'function'),
        [menuItems]
    );
    const [abrirMenu, setAbrirMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const iconRef = useRef(null); // Referência para o ícone

    // Função para abrir o menu e calcular a posição
    const handleClique = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + window.scrollY + 2,
                right: window.innerWidth - rect.left - rect.width + 8,
            });
        }
        setAbrirMenu((prev) => !prev);
    };

    const handleCliqueFora = () => {
        setAbrirMenu(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={handleCliqueFora}
                >
                    <Box>
                        <>
                            <MoreVertIcon
                                ref={iconRef} // Referência ao ícone
                                onClick={handleClique}
                            />
                            {abrirMenu &&
                                ReactDOM.createPortal(
                                    <Box
                                        position="absolute"
                                        top={menuPosition.top} // Usando a posição calculada
                                        right={menuPosition.right} // Usando a posição calculada para o lado direito
                                        bgcolor="white"
                                        boxShadow={3}
                                        borderRadius={1}
                                        p={1}
                                        zIndex={9999}
                                        sx={{ maxWidth: 200 }} // Opcional: Tamanho máximo do menu
                                        role="menu"
                                    >
                                        {menuValido.map((item, index) => (
                                            <Button
                                                key={index}
                                                onClick={() => {
                                                    setAbrirMenu(false); // Fecha o menu após clicar
                                                    item.onClick(); // Executa a função associada ao item
                                                }}
                                            >
                                                <Typography>{item.label}</Typography>
                                            </Button>
                                        ))}
                                    </Box>,
                                    document.body // Renderiza o menu no body
                                )}
                        </>
                    </Box>
                </ClickAwayListener>
            </Box>
        </ThemeProvider>
    );
}
