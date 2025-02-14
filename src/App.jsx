import { ThemeProvider } from '@emotion/react'
import { Box, createTheme } from '@mui/material'
import { Header } from './pages/components/header/Header'
import { Outlet } from 'react-router-dom'

const globalTeme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    marginTop: '.5rem',
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2980B9',
                    color: '#ffffff',
                    padding: '1.6rem',
                    textAlign: 'center',
                },
                title: {
                    fontSize: '2rem',
                    fontWeight: 'bold',
                },
                subheader: {
                    fontSize: '1.2rem',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '0px',
                    paddingBottom: '0 !important',
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    maxHeight: '70vh',
                    overflow: 'auto',
                    borderRadius: 0,
                    '&::-webkit-scrollbar': { //SCROLLBAR 
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#3694d3',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f0f0f0',
                        borderRadius: '10px',
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: '#79b8e2', // Cor do cabeçalho da tabela
                    '&:hover': {
                        '& .MuiTableCell-root': {
                            color: '#000 !important', // Cor do texto nas células para nao alterar com hover
                        },
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:last-child td, &:last-child th': {
                        border: 0,
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(41, 128, 185, 0.1)',  // Cor de fundo do hover tabela
                    }
                },
                head: {
                    '&:hover': {
                        backgroundColor: 'inherit', // Ignora hover no cabecalho da tabela
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: '1.4rem',
                    padding: '1rem',
                },
                head: {
                    fontWeight: 'bold',
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        backgroundColor: 'white',
                        padding: '0 4px',
                        fontSize: '1.6rem', //fonte placeholder 
                    },
                    '& input': {
                        fontSize: '1.5rem' //fonte escrita
                    }
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%',
                    '& .MuiInputLabel-root': {
                        backgroundColor: 'white',
                        padding: '0 4px',
                        fontSize: '1.6rem', // fonte placeholder
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    fontSize: '1.5rem', // Fonte do valor selecionado
                    '& .MuiInputBase-input': {
                        fontSize: '1.5rem',
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '1.5rem', // Fonte dos itens no menu
                    padding: '8px 16px', // Espaçamento interno para melhor aparência
                    '&:hover': {
                        backgroundColor: '#f5f5f5', // Cor de fundo ao passar o mouse
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    cursor: 'pointer', // Disable hover for TableHead        
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#020202', // Cor do texto
                    '&.Mui-selected': {
                        color: '#f2f2f2', // Cor do texto quando selecionado
                        fontWeight: 'bold'
                    },
                    '& .MuiTouchRipple-root': {
                        color: '#9ea0a1', // Cor do efeito de clique
                    },
                    fontSize: '1.3rem',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#f2f2f2', // Cor da barrinha embaixo do texto
                },
            },
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    fontSize: '1.3rem', // Ajusta a fonte geral no calendário
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    fontSize: '1.3rem', // Ajusta o tamanho da fonte dos dias
                },
            },
        },
        MuiPickersYear: {
            styleOverrides: {
                root: {
                    fontSize: '1.3rem', // Fonte nos anos (ao abrir a seleção de anos)
                },
            },
        },
        MuiPickersMonth: {
            styleOverrides: {
                root: {
                    fontSize: '1.3rem', // Fonte nos meses (ao abrir a seleção de meses)
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '1.1rem',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: 'calc(1rem * 1.375)', // Aumento de 37.5% no tamanho da fonte
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    fontSize: 'calc(1rem * 1.375)', // Aumento de 37.5% no tamanho da fonte
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    fontSize: 'calc(1rem * 1.375)', // Aumento de 37.5% no tamanho da fonte
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontSize: '1.3rem', // Definindo o fontSize do Alert
                },
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: "#ffffff", // Cor do progresso circular
                },
            },
        },
    }
})

function App() {
    return (
        <ThemeProvider theme={globalTeme}>
            <Box>
                <Header />
                <Box sx={{ width: '100%', maxWidth: '120rem', margin: '0 auto', padding: '2.4rem 2.4rem 2.4rem 8.4rem' }}>
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
