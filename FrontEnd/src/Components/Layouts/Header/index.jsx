import { Button, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../../../Api/apiRequest';
import { toast } from 'react-toastify';
import { createAxios } from '../../interceptor';
import { logOutSuccess } from '../../../redux/authSlice';
import { HeaderMobile } from '../HeaderMobile';

const menuList = [
    {
        title: 'HOME',
        path: '/',
        secure: false
    },
    {
        title: 'UPLOAD',
        path: '/upload',
        secure: false
    },
    {
        title: 'PROFILE',
        path: '/profile',
        secure: true
    }
]

export default function Header({ darkMode, toggleDarkMode }) {
    const location = useLocation();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const id = user?.user?._id;
    const accessToken = user?.accessToken
    const rfToken = user?.refreshToken
    const path = location.pathname
    const navigate = useNavigate()
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        LogoutUser(id, dispatch, navigate, accessToken, axiosJWT)
    }

    const handleNavigate = (path, secure) => {
        if (!secure || user) {
            navigate(path)
        } else {
            toast.warn('You need to log in first !')
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <Box sx={{ ...boxContainer, backgroundColor: darkMode ? '#696969' : '#D9D9D9' }}>
            <Grid 
                container 
                alignItems={'center'} 
                justifyContent={'space-between'} 
                sx={{ display: { xs: 'none', sm: 'none', md: 'flex', } }}
            >
                <Grid item>
                    <Grid
                        display={'flex'}
                        alignItems={'center'}
                        gap={2}
                        onClick={() => navigate('/')}
                        sx={{ ...logo }}
                    >
                        <img src='/logo_cut.png' style={{ width: 40, height: 40 }} />
                        <Typography sx={{ ...styleTitle, color: darkMode ? 'white' : 'black' }}> WINDSAVE</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container alignItems={'center'} justifyContent={'center'}>
                        <Grid item>
                            {menuList.map((item, idx) => {
                                return (
                                    <Button
                                        key={idx}
                                        sx={path === `${item.path}`
                                            ?
                                            {
                                                ...styleMenuButtonMain, ...activeStyle, color: darkMode
                                                    ? 'white' : 'black', textDecorationColor: darkMode
                                                        ? 'white' : 'black',
                                            }
                                            : { ...styleMenuButtonMain, color: darkMode ? 'white' : 'black' }}
                                        onClick={() => handleNavigate(item.path, item.secure)}>
                                        {item.title}
                                    </Button>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item justifyContent={'center'} gap={2}>
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
            <HeaderMobile 
                user={user}
                handleNavigate={handleNavigate}
                handleLogout={handleLogout}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
                menuList={menuList} 
                handleDrawerToggle={handleDrawerToggle} 
                isDrawerOpen={isDrawerOpen} 
            />
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
    textTransform: 'uppercase',
    mx: 4
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

const logo = {
    '&:hover': {
        cursor: 'pointer'
    },
}