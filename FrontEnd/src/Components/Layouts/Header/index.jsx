import { Button, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../../../Api/apiRequest';

export default function Header({ darkMode, toggleDarkMode }) {
    const location = useLocation();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const id = user?.user._id;
    const accessToken = user?.accessToken
    const path = location.pathname
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        LogoutUser(id, dispatch, navigate, accessToken)
    }


    return (
        <Box sx={{ ...boxContainer, backgroundColor: darkMode ? '#696969' : '#D9D9D9' }}>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                    <Grid display={'flex'} alignItems={'center'} gap={2}>
                        {/* <img src={Logo} /> */}
                        <img src='/logo_cut.png' style={{ width: 40, height: 40 }} />

                        <Typography sx={{ ...styleTitle, color: darkMode ? 'white' : 'black' }}> WINDSAVE</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems={'center'} justifyContent={'center'} gap={6}>
                        <Grid item>
                            <Button
                                sx={path === '/'
                                    ?
                                    {
                                        ...styleMenuButtonMain, ...activeStyle, color: darkMode
                                            ? 'white' : 'black', textDecorationColor: darkMode
                                                ? 'white' : 'black',
                                    }
                                    : { ...styleMenuButtonMain, color: darkMode ? 'white' : 'black' }}
                                onClick={() => navigate('/')}>
                                HOME
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={path === '/upload'
                                    ?
                                    {
                                        ...styleMenuButtonMain, ...activeStyle, color: darkMode
                                            ? 'white' : 'black', textDecorationColor: darkMode
                                                ? 'white' : 'black'
                                    }
                                    : { ...styleMenuButtonMain, color: darkMode ? 'white' : 'black' }}
                                onClick={() => navigate('/upload')}>
                                UPLOAD
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={path === '/profile'
                                    ?
                                    {
                                        ...styleMenuButtonMain, ...activeStyle, color: darkMode
                                            ? 'white' : 'black', textDecorationColor: darkMode
                                                ? 'white' : 'black'
                                    }
                                    : { ...styleMenuButtonMain, color: darkMode ? 'white' : 'black' }}
                                onClick={() => navigate('/profile')}>
                                PROFILE
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item display={'flex'} justifyContent={'center'} gap={2}>
                    {user ?
                        <>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ color: 'black', fontWeight: 'bold' }}
                                endIcon={<ArrowDropDownIcon />}
                            >
                                {user.user?.username}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <IconButton>
                                        <LogoutIcon />
                                    </IconButton>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                        : <Button variant="contained" sx={{ ...btnLogin }} onClick={() => navigate('/login')}>Login</Button>}

                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

const boxContainer = {
    // backgroundColor: '#D9D9D9',
    position: 'fixed',
    width: '100%',
    zIndex: 999,
    top: 0,
    p: 4,
}

const styleMenuButtonMain = {
    fontSize: 18,
    fontWeight: 400,
    color: 'black',
    textTransform: 'uppercase'
}

const styleTitle = {
    fontWeight: 'bold',
    fontSize: 20
}

const btnLogin = {
    borderRadius: 20,
    background: '#B6B4B4',
    fontWeight: 600,
    color: '#000000',
    width: '116px',
    height: '43px',
    fontSize: 16,
    '&:hover': {
        bgcolor: '#B6B4B4',
    },
}

const activeStyle = {
    textDecoration: 'underline',
    textDecorationThickness: '2px',
}