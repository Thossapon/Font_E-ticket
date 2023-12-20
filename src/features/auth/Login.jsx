import { useRef, useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate, Link } from 'react-router-dom'
import usePersist from "../../hooks/usePersist";
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider} from '@mui/system';
import toast, { Toaster } from 'react-hot-toast';

const errorToast = () => toast('Incorrect Username or Password ! Please Try Again');



const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const handleToggle = () => setPersist(prev => !prev)
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            toast.success('เข้าสู่ระบบเรียบร้อย')
            navigate('/')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                toast.error(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`)
                // setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>
    return (
        <ThemeProvider>
            <Grid container component="main" sx={{ height: '110vh' }}>
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} sx={{
                    backgroundImage: 'url(https://png.pngtree.com/background/20230617/original/pngtree-miniature-3d-render-of-a-workstation-picture-image_3697219.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sqaure >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin='normal' ref={userRef} required fullWidth id='username' name='username' value={username} onChange={handleUserInput} label="Username"  />
                            <TextField type="password" margin='normal' required fullWidth id='password' name='password' onChange={handlePwdInput} label="Password"  value={password} />
                            <label htmlFor="persist" className="form__persist">
                                <input
                                    type="checkbox"
                                    className="form__checkbox"
                                    id="persist"
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                Trust This Device
                            </label>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>

                                    <Link to={'/forget'}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to={'/register'} style={{ textDecoration: 'underline' }}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>

    )
}

export default Login;