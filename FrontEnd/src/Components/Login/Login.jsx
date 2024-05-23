import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../Api/apiRequest';
import { CssTextField } from '../Home';
import { btnUpload } from '../Upload/UploadImg';
import { LoadingButton } from '@mui/lab';

export default function Login({ darkMode }) {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password
    }
    setIsLoading(true)
    setTimeout(()=>{
      LoginUser(newUser, dispatch, navigate)
      setIsLoading(false)
    }, 800)
  }

  return (
    <Box sx={{ mb: 20, pt: 14 }}>
      <Typography variant='h5' sx={{ ...styleTypoTitle, color: darkMode ? 'white' : 'black' }}>LOGIN</Typography>
      <Grid container justifyContent={'center'} alignContent={'center'} sx={{ px: 80 }} gap={4}>
        <Grid item sm={12}>
          <CssTextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Grid>
        <Grid item sm={12}>
          <PasswordFormControl fullWidth variant="outlined"  >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />
          </PasswordFormControl>
        </Grid>
        <LoadingButton loading={isLoading} variant="contained" sx={{ ...btnUpload }} onClick={handleLogin}>Login</LoadingButton>
        <Grid item sm={12} sx={{ textAlign: 'center' }}>
          <Typography sx={{ ...styleTypo, color: darkMode ? 'white' : 'black' }}>No account? <span style={styleRegister} onClick={() => navigate('/register')}>Register</span></Typography>
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

export const PasswordFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

export const styleTypo = {
  fontWeight: 'bold',
  fontSize: 16,
  '&:hover': {
    cursor: 'pointer'
  },
}

export const styleRegister = {
  textDecoration: 'underline',
  color: '#8B8585',
}