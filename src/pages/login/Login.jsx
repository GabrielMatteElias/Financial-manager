import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import InputTelefone from '../components/input/inputTelefone/InputTelefone';
import { useEffect, useState } from 'react';
import InputCpfCnpj from '../components/input/inputCpf/InputCpf';
import { ThemeProvider } from '@emotion/react';
import UseFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc(100vh - 8px)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
    },
}));

const globalTeme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputLabel-root': {
                        backgroundColor: 'white',
                        padding: '0 4px',
                        fontSize: '1.6rem', //fonte placeholder 
                    },
                    '& input': {
                        fontSize: '1.5rem', //fonte escrita
                        height: '1.4rem'
                    }
                }
            }
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


export default function Login() {
    const [acao, setAcao] = useState('Login');
    const [carregamento, setCarregamento] = useState(false);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repitaSenha, setRepitaSenha] = useState('');

    const [errors, setErrors] = useState({});

    const navegar = useNavigate()

    useEffect(() => {
        setErrors({});
        resetForm()
    }, [acao])

    const resetForm = () => {
        setNome('');
        setSobrenome('');
        setDataNascimento('');
        setCpf('');
        setTelefone('');
        setEmail('');
        setSenha('');
        setRepitaSenha('');
    };

    const validateFields = () => {
        let tempErrors = {};
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (acao === 'Login') {
            if (!email.trim()) tempErrors.email = 'O e-mail é obrigatório.';
            else if (!emailRegex.test(email)) tempErrors.email = 'Insira um e-mail válido.';

            if (!senha) tempErrors.senha = 'A senha é obrigatória.';
            else if (senha.length < 6) tempErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';

        } else if (acao === 'Cadastro') {
            if (!senha) tempErrors.senha = 'A senha é obrigatória.';
            else if (senha.length < 6) tempErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';
            if (!nome.trim()) tempErrors.nome = 'O nome é obrigatório.';
            if (!sobrenome.trim()) tempErrors.sobrenome = 'O sobrenome é obrigatório.';
            if (!dataNascimento) tempErrors.dataNascimento = 'A data de nascimento é obrigatória.';

            if (!email.trim()) tempErrors.email = 'O e-mail é obrigatório.';
            else if (!emailRegex.test(email)) tempErrors.email = 'Insira um e-mail válido.';

            if (!senha) tempErrors.senha = 'A senha é obrigatória.';
            else if (senha.length < 6) tempErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';

            if (!repitaSenha) tempErrors.repitaSenha = 'Confirme sua senha.';
            else if (repitaSenha !== senha) tempErrors.repitaSenha = 'As senhas não coincidem.';
        } else {
            if (!email.trim()) tempErrors.email = 'O e-mail é obrigatório.';
            else if (!emailRegex.test(email)) tempErrors.email = 'Insira um e-mail válido.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setCarregamento(true)
        if (!validateFields(true)) {
            setCarregamento(false)
            return;
        }

        const data = {
            email,
            senha
        }

        const res = await UseFetch(`auth/login`, 'POST', data)

        if (res.status_code === 202) {
            navegar('/')
        }
        else if (res.status_code === 401) {
            Swal.fire({
                title: 'Falha na autenticação.',
                text: res.status_msg,
                icon: 'warning',
                confirmButtonColor: '#2980B9',
            })
        }

        setCarregamento(false)
    };

    const handleSubmitCadastro = async (e) => {
        e.preventDefault();
        setCarregamento(true)

        if (!validateFields()) {
            setCarregamento(false)
            return;
        }

        const data = {
            nome,
            sobrenome,
            dataNascimento,
            cpf,
            email,
            celular: telefone,
            senha
        }

        const res = await UseFetch(`auth/cad/user`, 'POST', data)

        if (res.status_code === 200) {
            Swal.fire({
                icon: 'success', // Alterado para 'success' para combinar com a mensagem
                title: res.status_msg,
                confirmButtonColor: '#2980B9',
                customClass: {
                    popup: 'swal-popup'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    setAcao('Login'); // Executado apenas quando o usuário clica no botão de confirmação
                }
            });

        }
        else if (res.status_code === 409) {
            Swal.fire({
                icon: 'warning',
                title: 'Erro ao realizar cadastro.',
                text: res.status_msg,
                confirmButtonColor: '#2980B9',
                customClass: {
                    popup: 'swal-popup'  // Adiciona uma classe personalizada ao popup do SweetAlert
                }
            })
        }
        setCarregamento(false)
    };

    const handleSubmitResetSenha = async (e) => {
        e.preventDefault();
        setCarregamento(true)
        if (!validateFields(true)) {
            setCarregamento(false)
            return;
        }

        const res = await UseFetch(`email/reset-password/${email}`, 'POST')

        if (res.status_code === 200) {
            Swal.fire({
                icon: 'success', // Alterado para 'success' para combinar com a mensagem
                title: 'Senha de recuperação criada.',
                text: res.status_msg,
                confirmButtonColor: '#2980B9',
                customClass: {
                    popup: 'swal-popup'
                }
            })
        }
        else if (res.status_code === 404) {
            Swal.fire({
                title: 'Falha ao recuperar Senha.',
                text: res.status_msg,
                icon: 'warning',
                confirmButtonColor: '#2980B9',
            })
        }

        setCarregamento(false)
    };

    return (
        <ThemeProvider theme={globalTeme}>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    {acao === 'Recuperar senha' && (
                        <Box>
                            <IconButton onClick={() => setAcao('Login')}>
                                <ArrowBackIcon sx={{ fontSize: '1.9rem' }} />
                            </IconButton>
                        </Box>
                    )}
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        {acao}
                    </Typography>
                    {acao === 'Recuperar senha' && (
                        <Typography variant="h4" sx={{ fontSize: "1.3rem", color: "#595959" }}>
                            Uma senha temporária será enviado para o seu email
                        </Typography>
                    )}
                    {acao === 'Login' ? (
                        <>
                            <Box
                                component="form"
                                onSubmit={handleSubmitLogin}
                                noValidate
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    fullWidth
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email ? <span style={{ fontSize: '1.1rem' }}>{errors.email}</span> : ''}
                                />
                                <TextField
                                    label="Senha"
                                    type="password"
                                    name="password"
                                    fullWidth
                                    variant="outlined"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    error={!!errors.senha}
                                    helperText={errors.senha ? <span style={{ fontSize: '1.1rem' }}>{errors.senha}</span> : ''}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={carregamento}
                                >
                                    {carregamento ? <CircularProgress size={15} /> : 'Entrar'}
                                </Button>
                                <Link
                                    component="button"
                                    type="button"
                                    onClick={() => setAcao("Recuperar senha")}
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Forgot your password?
                                </Link>
                            </Box>
                            <Divider>ou</Divider>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => alert('Sign in with Google')}
                                    startIcon={<GoogleIcon />}
                                >
                                    Entrar com Google
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => alert('Sign in with Facebook')}
                                    startIcon={<FacebookIcon />}
                                >
                                    Entrar com Facebook
                                </Button>
                                <Typography sx={{ textAlign: 'center' }}>
                                    Não possui uma conta?{' '}
                                    <Link
                                        onClick={() => setAcao("Cadastro")}
                                        variant="body2"
                                        sx={{ alignSelf: 'center', cursor: 'pointer' }}
                                    >
                                        Cadastre-se
                                    </Link>
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <>
                            {acao === 'Cadastro' ? (
                                <>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmitCadastro}
                                        noValidate
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: 2,
                                        }}
                                    >
                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                            <TextField
                                                label="Nome"
                                                fullWidth
                                                variant="outlined"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                error={!!errors.nome}
                                                helperText={errors.nome ? <span style={{ fontSize: '1.1rem' }}>{errors.nome}</span> : ''}
                                            />
                                            <TextField
                                                label="Sobrenome"
                                                fullWidth
                                                variant="outlined"
                                                value={sobrenome}
                                                onChange={(e) => setSobrenome(e.target.value)}
                                                error={!!errors.sobrenome}
                                                helperText={errors.sobrenome ? <span style={{ fontSize: '1.1rem' }}>{errors.sobrenome}</span> : ''}
                                            />
                                        </Stack>

                                        <TextField
                                            label="Data de Nascimento"
                                            type="date"
                                            fullWidth
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            value={dataNascimento}
                                            onChange={(e) => setDataNascimento(e.target.value)}
                                            error={!!errors.dataNascimento}
                                            helperText={errors.dataNascimento ? <span style={{ fontSize: '1.1rem' }}>{errors.dataNascimento}</span> : ''}
                                        />

                                        <InputCpfCnpj
                                            valor={cpf}
                                            setValor={setCpf}
                                        />

                                        <InputTelefone
                                            valor={telefone}
                                            setValor={setTelefone}
                                        />

                                        <TextField
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            variant="outlined"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email ? <span style={{ fontSize: '1.1rem' }}>{errors.email}</span> : ''}
                                        />

                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                            <TextField
                                                label="Senha"
                                                type="password"
                                                fullWidth
                                                variant="outlined"
                                                value={senha}
                                                onChange={(e) => setSenha(e.target.value)}
                                                error={!!errors.senha}
                                                helperText={errors.senha ? <span style={{ fontSize: '1.1rem' }}>{errors.senha}</span> : ''}
                                            />
                                            <TextField
                                                label="Repita a Senha"
                                                type="password"
                                                fullWidth
                                                variant="outlined"
                                                value={repitaSenha}
                                                onChange={(e) => setRepitaSenha(e.target.value)}
                                                error={!!errors.repitaSenha}
                                                helperText={errors.repitaSenha ? <span style={{ fontSize: '1.1rem' }}>{errors.repitaSenha}</span> : ''}
                                            />
                                        </Stack>

                                        <Button type="submit" fullWidth variant="contained" disabled={carregamento}>
                                            {carregamento ? <CircularProgress size={15} /> : 'Cadastrar'}
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            Já possui uma conta?{' '}
                                            <Link
                                                onClick={() => setAcao("Login")}
                                                variant="body2"
                                                sx={{ alignSelf: 'center', cursor: 'pointer' }}
                                            >
                                                Retornar
                                            </Link>
                                        </Typography>
                                    </Box>
                                </>
                            ) : (
                                <Box
                                    component="form"
                                    onSubmit={handleSubmitResetSenha}
                                    noValidate
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        gap: 2,
                                    }}
                                >
                                    <TextField
                                        label="Email"
                                        type="email"
                                        name="email"
                                        fullWidth
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email ? <span style={{ fontSize: '1.1rem' }}>{errors.email}</span> : ''}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={carregamento}
                                    >
                                        {carregamento ? <CircularProgress size={15} /> : 'Solicitar Nova Senha'}
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Card>
            </SignInContainer >
        </ThemeProvider>
    );
}
