import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { AppBar, Box, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfileSuccess } from '../../redux/authSlice';

export default function ModalUpdateProfile({ open, setOpen, darkMode }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [isLoading, setIsLoading] = useState(false)
    const [previewAva, setPreviewAva] = useState(null);
    const [previewCover, setPreviewCover] = useState(null)
    const [file, setFile] = useState(null);
    const [fileCover, setFileCover] = useState(null)
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false)
        setFile(null);
        setFileCover(null);
        setPreviewAva(null);
        setPreviewCover(null)
    }

    const handleFileChangeAva = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAva(reader.result);
            };
            reader.readAsDataURL(selectedFile); 
        }
    };

    const handleFileChangeCover = (event) => {
        const selectedFileCover = event.target.files[0];
        if (selectedFileCover) {
            setFileCover(selectedFileCover);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewCover(reader.result);
            };
            reader.readAsDataURL(selectedFileCover);
        }
    };

    const handleUpdateProfile = async () => {
        setIsLoading(true);
        const formData = new FormData();
        if (file) {
            formData.append('avatar', file);
        }
        if (fileCover) {
            formData.append('cover_img', fileCover);
        }

        try {
            const res = await axios.put(`${baseURL}auth/update-profile-images/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(res.data.message);

            // Update user state
            const updatedUser = res.data.user;
            dispatch(updateProfileSuccess(updatedUser));

            setIsLoading(false);

            // Update user state or other necessary states
            handleClose();
        } catch (error) {
            toast.error(res.data.message);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
                <AppBar sx={{ position: 'relative', bgcolor: '#B6B4B4', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                            Update Profile
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="close"
                            sx={{ ...iconButton }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Box sx={{ p: 5}}>
                        <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>Upload avatar</Typography>
                        <Grid item sm={12} sx={{ ...styleUpload }}>
                            <Grid textAlign={'center'}>
                                <IconButton>
                                    <label htmlFor="file-upload">
                                        <img src={previewAva || '/add_img.png'} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                                        <input
                                            id="file-upload"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChangeAva}
                                        />
                                    </label>
                                </IconButton>
                                <Typography sx={{ color: darkMode ? 'white' : 'black' }}>Drag image here or click to select an image</Typography>
                                <Typography sx={{ mt: 1, fontSize: 14, color: '#9E9B9B' }}>image should not exceed 5mb</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>Upload cover</Typography>
                        <Grid item sm={12} sx={{ ...styleUpload }}>
                            <Grid textAlign={'center'}>
                                <IconButton>
                                    <label htmlFor="file-upload-cover">
                                        <img src={previewCover || '/add_img.png'} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                                        <input
                                            id="file-upload-cover"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChangeCover}
                                        />
                                    </label>
                                </IconButton>
                                <Typography sx={{ color: darkMode ? 'white' : 'black' }}>Drag image here or click to select an image</Typography>
                                <Typography sx={{ mt: 1, fontSize: 14, color: '#9E9B9B' }}>image should not exceed 5mb</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <Box
                    sx={{ padding: '0px 10px 30px 10px' }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2} justifyContent={'center'} sx={{ gap: 1 }} >
                        <LoadingButton loading={isLoading} onClick={handleUpdateProfile} type="submit" variant="contained" sx={{ ...styleBtnAdd }}>
                            Update
                        </LoadingButton>
                    </Grid>

                </Box>
            </Dialog>
        </>
    )
}

const styleDialog = {
    '.MuiDialogContent-root': { padding: { xs: 1, sm: 2 } },
    '& .MuiDialog-container': {
        '& .MuiDialog-paper': {
            margin: '16px'
        }
    },
}

const styleTextTitle = {
    fontSize: { xs: 14, sm: 16 },
    textTransform: 'uppercase',
    fontWeight: 'bold',
}

const iconButton = {
    marginLeft: 'auto'
}

const styleBoxContainer = {
    padding: { xs: '10px 12px', sm: '10px 30px' },
    position: 'relative',
    overflow: 'auto',
    '::-webkit-scrollbar': { width: 4, height: 8 },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: '#F0F0F0'
    },
    mb: 4,
}

const styleBtnAdd = {
    bgcolor: '#B6B4B4',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    '&:hover': {
        bgcolor: '#B6B4B4',
    },
}

const styleUpload = {
    border: '1px dashed #B2BAC2',
    borderRadius: 5,
    p: 4,
    mb: 2
};