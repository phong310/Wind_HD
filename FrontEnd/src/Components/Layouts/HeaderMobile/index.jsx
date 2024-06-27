import { Box, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';



export const HeaderMobile = ({
    user,
    handleNavigate,
    handleLogout,
    toggleDarkMode,
    darkMode,
    menuList,
    handleDrawerToggle,
    isDrawerOpen }) => {
    const navigate = useNavigate()

    const [anchorEls, setAnchorEls] = useState(null);
    const open = Boolean(anchorEls);
    const handleClick = (event) => {
        setAnchorEls(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEls(null);
    };

    const handleLogin = () => {
        navigate('/login')
        handleDrawerToggle()
    }

    const MobileLogout = () => {
        handleLogout()
        handleDrawerToggle()
    }

    return (
        <>
            <Grid container sx={{ ...styleHeaderMobile }}>
                <Grid
                    display={'flex'}
                    alignItems={'center'}
                    gap={2}
                    onClick={() => navigate('/')}
                >
                    <img src='/logo_cut.png' style={{ width: 40, height: 40 }} />
                    <Typography sx={{ ...styleTitle, color: darkMode ? 'white' : 'black' }}> WINDSAVE</Typography>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                    <Button onClick={handleDrawerToggle} sx={{ color: 'inherit' }}>
                        <MenuIcon />
                    </Button>
                </Grid>
            </Grid>

            <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
                <Box sx={{ ...styleBoxList }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                    <List>
                        {menuList.map((item, index) => {
                            return (
                                <>
                                    <ListItem key={index}>
                                        <ListItemButton sx={{ ...styleItemButton }} onClick={() => handleNavigate(item.path, item.secure)}>
                                            {item.title}
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>
                            )
                        })}
                    </List>
                </Box>
                <Grid item justifyContent={'space-between'} sx={{mt: 2 }} gap={2}>
                    {user ?
                        <>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ color: 'black', fontWeight: 'bold', ml: 2.5 }}
                                endIcon={<ArrowDropDownIcon />}
                            >
                                {user.user?.username}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEls}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={MobileLogout}>
                                    <IconButton>
                                        <LogoutIcon />
                                    </IconButton>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                        : <Button variant="contained" sx={{ ...btnLogin }} onClick={() => handleLogin()}>Login</Button>}

                    <IconButton onClick={toggleDarkMode} sx={{ml: 2}}>
                        {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                </Grid>
            </Drawer>
        </>
    )
}


const styleHeaderMobile = {
    display: { sm: 'flex', md: 'none' },
    justifyContent: 'space-between',
    alignItems: 'center',
}

const styleImg = {
    display: 'block',
    textAlign: 'center'
}

styleImg[':hover'] = {
    cursor: 'pointer'
}

const styleItemButton = {
    color: 'inherit',
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: 14
}

const styleBoxList = {
    width: 250,
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
    width: '100px',
    height: '40px',
    fontSize: 14,
    ml: 2.5,
    '&:hover': {
        bgcolor: '#B6B4B4',
    },
}