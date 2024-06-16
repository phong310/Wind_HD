import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../CSS/Profile.css"
import ModalDelete from '../Modal/ModalDelete';
import ModalCommon from '../Modal/ModalCommon';
import { Link } from 'react-router-dom';
import ModalUpdateProfile from '../Modal/ModalUpdateProfile';


export default function Profile({ darkMode }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [folders, setFolders] = useState();
    const [openModal, setOpenModal] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const [folderId, setFolderId] = useState()
    const [itemData, setItemData] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [isDelFolder, setIsDelFolder] = useState(true)
    const [openUpdatePrf, setOpenUpdatePrf] = useState()

    const getAllFolders = async () => {
        try {
            const res = await axios.get(`${baseURL}folder/${userId}`)
            setFolders(res.data);
        } catch (e) {
            console.log('Err: ', e);
        }
    }

    const handelOpenDel = (id) => {
        setOpenDel(true)
        setFolderId(id)
        setIsDelFolder(false)
    }

    const handleOpenUpdate = (item) => {
        setOpenModal(true)
        setItemData(item)
        setIsEdit(true)
    }

    const openAdd = () => {
        setOpenModal(true)
        setIsEdit(false)
    }

    useEffect(() => {
        if (isDelFolder) {
            getAllFolders()
        }
    }, [isDelFolder])

    return (
        <Box sx={{ mb: 60, pt: 13, }}>
            <Grid sx={{ position: 'relative' }}>
                <img src={user?.user.cover_img ? user?.user.cover_img : '/coverImg_default.jpg'} style={styleImgCover} />
                <div className='div-container'>
                    <Box sx={styleAvatarContainer}>
                        <img src={user?.user.avatar ? user?.user.avatar : '/defaul_avatar.png'} alt='Avatar' style={styleAvatar} />
                        <div className="overlay"></div>
                        <Grid className="icon-all" container justifyContent={'center'}>
                            <Grid item>
                                <IconButton onClick={() => setOpenUpdatePrf(true)}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </div>

            </Grid>
            <Grid container justifyContent={'flex-end'} sx={{ p: 6 }}>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ ...btnUpload }}
                    onClick={openAdd}
                >
                    New folder
                </Button>
            </Grid>
            <Grid container justifyContent={'center'} gap={6}>
                <motion.div
                    animate={{ x: 0 }}
                    transition={{ type: 'tween', duration: 0.5 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                // whileTap={{ scale: 0.6 }}
                >
                    <Grid className='grid_container' item sx={{ ...styleFolder }}>
                        <Link to={`/folder/all`}>
                            <img src='/Folder_img.png' />
                        </Link>
                        <Typography sx={{ color: darkMode ? 'white' : 'unset' }}>All</Typography>
                    </Grid>
                </motion.div>
                {folders?.map((item, idx) => {
                    return (
                        <motion.div
                            animate={{ x: 0 }}
                            transition={{ type: 'tween', duration: 0.5 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            // whileTap={{ scale: 0.6 }}
                            key={idx}
                        >
                            <Grid className='grid_container' item sx={{ ...styleFolder }}>
                                <Grid className="icon-container" display={'flex'} justifyContent={'center'} gap={2}>
                                    <IconButton sx={{ ...iconButtonHover }} onClick={() => handleOpenUpdate(item)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton sx={{ ...iconButtonHover }} onClick={() => handelOpenDel(item?._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Link to={`/folder/${item._id}`}>
                                    <img src='/Folder_img.png' />
                                </Link>
                                <Typography sx={{ color: darkMode ? 'white' : 'unset' }}>{item.name}</Typography>
                            </Grid>
                        </motion.div>

                    )
                })}

            </Grid>
            <ModalCommon
                open={openModal}
                setOpen={setOpenModal}
                getAll={getAllFolders}
                data={itemData}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
            />
            <ModalDelete
                open={openDel}
                setOpen={setOpenDel}
                folderId={folderId}
                setIsDelFolder={setIsDelFolder}
            />

            <ModalUpdateProfile
                open={openUpdatePrf}
                setOpen={setOpenUpdatePrf}
                darkMode={darkMode}
            />
        </Box>
    )
}

const styleImgCover = {
    width: '100%',
    height: 500,
    objectFit: 'cover',
    position: 'relative',
}

const styleAvatarContainer = {
    bgcolor: 'white',
    position: 'absolute',
    bottom: -110,
    left: '10%',
    transform: 'translateX(-50%)',
    width: 240,
    height: 240,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '5px solid white'
}

const styleAvatar = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}


export const btnUpload = {
    borderRadius: 20,
    background: '#B6B4B4',
    fontWeight: 600,
    color: '#000000',
    width: '180px',
    height: '46px',
    fontSize: 16,
    '&:hover': {
        bgcolor: '#B6B4B4',
    },
}

const styleFolder = {
    textAlign: 'center',
    '&:hover': {
        cursor: 'pointer'
    },
}

const iconButtonHover = {
    // backgroundColor: 'white',
    color: 'black'
}