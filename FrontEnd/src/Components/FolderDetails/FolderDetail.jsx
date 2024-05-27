import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Divider, Grid, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import '../CSS/FolderDetail.css';
import SettingsIcon from '@mui/icons-material/Settings';


export default function FolderDetail({ darkMode }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_API_LOCAL;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [nameFolder, setNameFolder] = useState()
    const [imgFolder, setImgFolder] = useState()
    const [imgAll, setImgAll] = useState()

    const getAllImg = async () => {
        try {
            const res = await axios.get(`${baseURL}upload/getAll/${userId}`)
            setImgAll(res.data);
        } catch (e) {
            console.log('Err: ', res);
        }
    }

    const getFolderDetail = async () => {
        try {
            const res = await axios.get(`${baseURL}folder/${userId}/${id}`)
            setNameFolder(res.data.name);

        } catch (e) {
            console.log('Err:', e);
        }
    }

    const getImgFolder = async () => {
        try {
            const res = await axios.get(`${baseURL}upload/images/${id}`)
            setImgFolder(res.data);

        } catch (e) {
            console.log('Err:', e);
        }
    }

    const imagesToDisplay = id === 'all' ? imgAll : imgFolder;

    useEffect(() => {
        if (id != 'all') {
            getFolderDetail()
            getImgFolder()
        } else {
            getAllImg()
        }
    }, [id])

    return (
        <Box sx={{ mb: 60, pt: 18 }}>
            <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ px: 20 }}>
                <Grid item>
                    <IconButton onClick={() => navigate('/profile')}>
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: darkMode ? 'white' : 'unset' }}>
                        {id != 'all' ? nameFolder : 'All'}
                    </Typography>
                </Grid>
                <Grid item>
                    <img src='/Folder_img.png' style={{ width: 40, height: 40 }} />
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ borderColor: darkMode ? 'white' : 'unset' }} />
                </Grid>
            </Grid>
            <SearchBar />
            <Grid container justifyContent={'center'}>
                {imagesToDisplay?.length > 0 ? <Grid item>
                    <ImageList variant="masonry" cols={4} gap={8}>
                        {imagesToDisplay?.map((item, idx) => (
                            <ImageListItem key={idx} sx={{ ...styleImgZoom }}>
                                <motion.div
                                    animate={{ x: 0 }}
                                    transition={{ type: 'tween', duration: 0.5 }}
                                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                                // whileTap={{ scale: 0.6 }}
                                >
                                    <div className='div-container'>
                                        <img
                                            srcSet={item.url}
                                            src={item.url}
                                            loading="lazy"
                                            style={{ width: 400 }}
                                        />
                                        <div className="overlay"></div>
                                        <Grid className="icon-all" container justifyContent={'center'}>
                                            <Grid item>
                                                <IconButton>
                                                    <SettingsIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </div>

                                </motion.div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid> : <Typography variant='h4' sx={{ mt: 20, color: 'gray' }}>The folder is empty !</Typography>}
            </Grid>
        </Box>
    )
}

const styleImgZoom = {
    position: 'relative',
    overflow: 'hidden'
}