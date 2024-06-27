import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Divider, Grid, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetColumns } from '../../Hook/useGetColums';
import '../CSS/FolderDetail.css';
import ModalFolder from '../Modal/ModalFolder';
import ModalUploadFolder from '../Modal/ModalUploadFolder';
import SearchBar from '../SearchBar/SearchBar';


export default function FolderDetail({ darkMode }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [folderId, setFolderId] = useState()
    const [nameFolder, setNameFolder] = useState()
    const [imgFolder, setImgFolder] = useState()
    const [imgAll, setImgAll] = useState()
    const [openModalOp, setOpenModalOp] = useState(false)
    const [openUploadFolder, setOpenUploadFolder] = useState(false)
    const [ImgId, setImgId] = useState()
    const [urlImg, setUrlImg] = useState()
    const [filteredImages, setFilteredImages] = useState([]);

    const getColumns = useGetColumns();

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
            setFolderId(res.data._id);

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

    const openModalChooseFolder = (id, url) => {
        setOpenModalOp(true)
        setImgId(id)
        setUrlImg(url)
    }

    const handleOpenUploadImg = () => {
        if (id === 'all') {
            navigate('/upload')
        } else {
            setOpenUploadFolder(true)
        }
    }


    const imagesToDisplay = id === 'all' ? imgAll : imgFolder;

    const handleSearch = async (searchTerm) => {
        if (searchTerm === '') {
            setFilteredImages([]);
            return;
        }
        try {
            const res =
                await axios.get(`${baseURL}upload/search/${searchTerm}/${id === 'all' ? '' : id}`);
            setFilteredImages(res.data);
        } catch (e) {
            toast.warn("Not found !")
            console.log('Err:', e);
        }
    };

    useEffect(() => {
        if (id != 'all') {
            getFolderDetail()
            getImgFolder()
        } else {
            getAllImg()
        }
    }, [id])

    return (
        <Box sx={{ mb: 60, pt: 18, overflowX: 'hidden' }}>
            <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ px: {xs: 8, sm: 10, md: 20} }}>
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
            <SearchBar
                onSearch={handleSearch}
                isFetching={id != 'all' ? getImgFolder : getAllImg}
            />
            <Grid container justifyContent={'center'}>
                {filteredImages?.length > 0 ?
                    <Grid item>
                        <ImageList variant="masonry" cols={getColumns()} gap={8}>
                            {filteredImages?.map((item, idx) => (
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
                                                    <IconButton onClick={() => openModalChooseFolder(item?._id, item?.url)}>
                                                        <SettingsIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </div>

                                    </motion.div>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid> : imagesToDisplay?.length > 0 ?
                        <Grid item>
                            <ImageList variant="masonry" cols={getColumns()} gap={8}>
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
                                                        <IconButton onClick={() => openModalChooseFolder(item?._id, item?.url)}>
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
            <ModalFolder
                open={openModalOp}
                setOpen={setOpenModalOp}
                imgId={ImgId}
                urlImg={urlImg}
                getAll={getAllImg}
                getImgFolder={getImgFolder}
            />
            <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
                <IconButton
                    aria-label="back to top"
                    sx={{ color: 'black', width: '48px', height: '48px' }}
                    onClick={() => handleOpenUploadImg()}
                >
                    <FileUploadIcon sx={{
                        width: '38px', height: '38px', color: darkMode
                            ? 'white' : 'black'
                    }} />
                </IconButton>
            </Box>
            <ModalUploadFolder
                open={openUploadFolder}
                setOpen={setOpenUploadFolder}
                darkMode={darkMode}
                folderId={folderId}
                getImgFolder={getImgFolder}
            />
        </Box>
    )
}

const styleImgZoom = {
    position: 'relative',
    overflow: 'hidden'
}