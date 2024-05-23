import React, { useEffect, useState } from 'react'
import Header from './Header'
import Home from '../Home'
import Footer from './Footer'
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Route, Routes } from 'react-router-dom';
import UploadImg from '../Upload/UploadImg';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import FolderDetail from '../FolderDetails/FolderDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LayoutMain({ toggleDarkMode, darkMode }) {
    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 600 && scrollY < 3400) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <ToastContainer autoClose={1500} theme="colored" />
            <Routes>
                <Route path='/' element={<Home darkMode={darkMode} />} />
                <Route path='/upload' element={<UploadImg darkMode={darkMode} />} />
                <Route path='/profile' element={<Profile darkMode={darkMode} />} />
                <Route path='/login' element={<Login darkMode={darkMode} />} />
                <Route path='/register' element={<Register darkMode={darkMode} />} />
                <Route path='/folder' element={<FolderDetail darkMode={darkMode} />} />
            </Routes>
            {showBackToTop && (
                <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
                    <IconButton onClick={scrollToTop} aria-label="back to top" sx={{ color: 'black', width: '48px', height: '48px' }}>
                        <KeyboardArrowUpIcon sx={{
                            width: '38px', height: '38px', color: darkMode
                                ? 'white' : 'black'
                        }} />
                    </IconButton>
                </Box>
            )}
            <Footer darkMode={darkMode} />
        </>
    )
}
