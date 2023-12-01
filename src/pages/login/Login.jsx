import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from '../../context/darkModeContext'
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Register from '../register/Register';
import axios from 'axios';


import { ThemeProvider, createTheme } from '@mui/system';
const Login = () => {
    const {currentUser} = useContext(AuthContext);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null)
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const { login } = useContext(AuthContext);
    const { darkMode } = useContext(DarkModeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(currentUser);
        try {
            await login(inputs);
            navigate('/') 
        } catch (err) {
            console.log(err.response.data);
        }
    };
    return (
        <ThemeProvider>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://png.pngtree.com/background/20230617/original/pngtree-miniature-3d-render-of-a-workstation-picture-image_3697219.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin='normal' required fullWidth id='username' name='username' onChange={handleChange} label="Username" autoFocus />
                            <TextField type="password" margin='normal' required fullWidth id='password' name='password' onChange={handleChange} label="Password" autoFocus />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
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
                                <Button onClick={handleClick}>
                                    click to
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </ThemeProvider>
        // <div>
        //     <form>
        //         <input
        //             type="text"
        //             placeholder="Username"
        //             name="username"
        //             onChange={handleChange}
        //         />
        //         <input
        //             type="password"
        //             placeholder="Password"
        //             name="password"
        //             onChange={handleChange}
        //         />
        //         {err && err}
        //         <button onClick={handleLogin}>Login</button>
        //     </form>
        // </div>
    )
}

export default Login