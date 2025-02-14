import { Box, Button, CircularProgress, IconButton, styled, TextField, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { Tabela } from '../../../components/Tabela/Tabela';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { lidarComColagemCpfCnpj, validarTamanhoCpfCnpj } from '../../../../utils/formatadores';
import { AnimatePresence, motion } from "framer-motion";
import Swal from 'sweetalert2';
import { isEmpty } from '../../../../utils/validadores';
import UseFetch from '../../../../hooks/useFetch';
import { SpinnerCarregamento } from '../../../components/spinnerCarregamento/SpinnerCarregamento';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const headers = [
    { header: "Nome", field: "nome", align: "left" },
    { header: "CPF", field: "cpf", align: "right" },
];

const CustomIconAdd = styled(AddCircleOutlineIcon)({
    color: "#2980B9",

});

const CustomIconRemove = styled(CloseIcon)({
    color: "#b92929",

});

const CustomText = styled(Typography)({
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'pointer',
    transition: "opacity 0.3s",
    fontSize: '1.1rem',
    "&:hover": {
        opacity: 0.6,
    },
});

export function Dependentes() {
    const [cadastrarDependente, setCadastrarDependente] = useState(false); //Mostrar inputs
    const [hasInteracted, setHasInteracted] = useState(false); //Impede a animação do botão na primeira vez que o modal é exibido.
    const [listaDependentes, setListaDependentes] = useState([]); //Lista de dependentes
    const [carregamento, setCarregamento] = useState(true); //Lista de dependentes
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");

    const getDependentes = async () => {
        const res = await UseFetch(`get/dependentes/88888888888`, 'GET')
        setListaDependentes(res)
        setCarregamento(false)
    }

    useEffect(() => {
        getDependentes()
    }, [])

    const handleToggle = () => {
        setCadastrarDependente(!cadastrarDependente);
        if (!hasInteracted) setHasInteracted(true);
    };

    const handleChangeCpf = (event) => {
        const value = event.target.value;
        const formattedValue = validarTamanhoCpfCnpj(value);
        setCpf(formattedValue);
    };

    const handlePasteCPf = (event) => {
        const formattedValue = lidarComColagemCpfCnpj(event);
        setCpf(formattedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(nome) || isEmpty(cpf)) {
            Swal.fire({
                title: "Falha ao cadastrar!",
                text: "Por favor preencha todos os campos para prosseguir!",
                icon: "warning",
                confirmButtonColor: '#2980B9',
                customClass: {
                    popup: 'swal-popup'  // Adiciona uma classe personalizada ao popup do SweetAlert
                }
            });
            return
        }
        setCarregamento(true)
        const data = { nome, cpf }

        const res = await UseFetch(`cad/dependente/88888888888`, 'POST', data)

        if (res === 'Cadastrado com sucesso') {
            Swal.fire({
                icon: 'success',
                title: 'CPF cadastrado com sucesso!',
                confirmButtonColor: '#2980B9',
                customClass: {
                    popup: 'swal-popup'  // Adiciona uma classe personalizada ao popup do SweetAlert
                }
            })

            setListaDependentes((prev) => [...prev, data]);

        } else if (res.includes('cadastrado na base de dados')) {
            Swal.fire({
                icon: 'warning',
                title: 'CPF já cadastrado como dependente',
                confirmButtonColor: '#2980B9',
                customClass: {
                    popup: 'swal-popup'  // Adiciona uma classe personalizada ao popup do SweetAlert
                }
            })
        }
        setCarregamento(false)
    };

    const handleDelete = async (linha) => {
        const res = await UseFetch(`delete/dependente/${linha.cpf}`, 'DELETE')
        if (res.includes('deletado com sucesso')) getDependentes()
    };

    return (
        <>
            {(carregamento && !cadastrarDependente) ? (
                <SpinnerCarregamento />
            ) : (
                <>
                    <Box>

                        <Tabela headers={headers} data={listaDependentes} alturaMaxima={300} iconeAcao={<HighlightOffIcon color='error' />} acaoIcone={handleDelete} />
                        <Box
                            display="flex"
                            alignItems="center"
                            p={2}
                        >
                            <motion.div
                                animate={{ x: cadastrarDependente ? 640 : 0 }} // Move para a direita
                                transition={{ duration: 0.5, ease: "easeInOut" }} // Animação suave
                            >
                                <IconButton onClick={handleToggle}>
                                    {cadastrarDependente ? <CustomIconRemove /> : <CustomIconAdd />}
                                </IconButton>
                            </motion.div>
                            <AnimatePresence>
                                {!cadastrarDependente &&
                                    (hasInteracted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            onClick={handleToggle}
                                        >
                                            <CustomText >
                                                Cadastrar novo dependente
                                            </CustomText>
                                        </motion.div>
                                    ) : (
                                        <CustomText onClick={handleToggle}>
                                            Cadastrar novo dependente
                                        </CustomText>
                                    ))}
                            </AnimatePresence>
                        </Box>
                    </Box >
                    {cadastrarDependente && (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            display='flex'
                            justifyContent='space-around'
                            gap={1}
                            sx={{ pt: 0, pr: 2, pb: 2, pl: 2 }}
                        >
                            <TextField
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                sx={{ width: '38rem' }}
                            />
                            <TextField
                                label="CPF/CNPJ"
                                variant="outlined"
                                onPaste={handlePasteCPf}
                                fullWidth
                                value={validarTamanhoCpfCnpj(cpf)}
                                onChange={handleChangeCpf}
                                sx={{ width: '35rem' }}

                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ width: '28rem', letterSpacing: '0.1rem' }}
                                onClick={handleSubmit}
                            >
                                {carregamento ? <CircularProgress /> : 'Cadastrar'}
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};