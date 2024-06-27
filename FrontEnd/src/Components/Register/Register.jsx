import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CssTextField } from '../Home'
import { PasswordFormControl, styleRegister } from '../Login/Login'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { btnUpload } from '../Upload/UploadImg';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../Api/apiRequest';

export default function Register({ darkMode }) {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = async () => {
        const newUser = {
            username: username,
            email: email,
            password: password,
            confirm: confirmPass
        }
        RegisterUser(newUser, dispatch, navigate)
    }
    return (
        <Box sx={{ mb: 20, pt: 14 }}>
            <Typography variant='h5' sx={{ ...styleTypoTitle, color: darkMode ? 'white' : 'black' }}>REGISTER</Typography>
            <Grid container justifyContent={'center'} alignContent={'center'} sx={{ px: { xs: 2, sm: 10, md: 20, lg: 40, xl: 80 } }} gap={4}>
                <Grid item xs={12}>
                    <CssTextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <CssTextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <PasswordFormControl fullWidth variant="outlined"  >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </PasswordFormControl>
                </Grid>
                <Grid item xs={12}>
                    <PasswordFormControl fullWidth variant="outlined"  >
                        <InputLabel htmlFor="outlined-adornment-password">Cofirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Cofirm Password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </PasswordFormControl>
                </Grid>
                <Button variant="contained" sx={{ ...btnUpload }} onClick={handleRegister} >Register</Button>
                <Grid item sm={12} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ ...styleTypo, color: darkMode ? 'white' : 'black' }}>Have account? <span style={styleRegister} onClick={() => navigate('/login')}>Login</span></Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

const styleTypoTitle = {
    textAlign: 'center',
    my: 6,
    fontWeight: 'bold'
}

export const styleTypo = {
    fontWeight: 'bold',
    fontSize: 16,
    '&:hover': {
        cursor: 'pointer'
    },
}
