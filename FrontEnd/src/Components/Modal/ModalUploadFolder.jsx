import { LoadingButton } from '@mui/lab'
import { AppBar, Box, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { CssTextField } from '../Home';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';


export default function ModalUploadFolder({ open, setOpen, darkMode, folderId, getImgFolder }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const reset_form = () => {
        setTitle('')
        setDescription('')
        setFile(null)
        setPreview(null)
    }


    const handleClose = () => {
        setOpen(false)
        reset_form()
    }

    const handleUpload = async () => {
        if (!file) {
            toast.warning("Please select a file first.")
            return;
        }
        const formData = new FormData();
        if (!title || !description) {
            toast.warning("Title and description are required");
            return;
        } else {
            formData.append('title', title);
            formData.append('description', description);
        }
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('folder', folderId);
        setIsLoading(true)

        try {
            const response = await axios.post(`${baseURL}upload/${userId}/${folderId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Upload photo successfully")
            reset_form()
            setIsLoading(false)
            setOpen(false)
            getImgFolder()
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.warning(error.response.data.message);
            } else {
                toast.warning("Failed to upload file. Please try again.")
            }
            setIsLoading(false)
        }
    };

    return (
        <>
            <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
                <AppBar sx={{ position: 'relative', bgcolor: '#B6B4B4', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                            Upload Images Folder
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
                    <Grid container justifyContent={'center'} alignContent={'center'} sx={{ p: 2 }} gap={4}>
                        <Grid item xs={12}>
                            <CssTextField
                                fullWidth
                                size='small'
                                label={<><span>Title</span><span style={{ color: 'red' }}> *</span></>}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                multiline
                                rows={4}
                                maxRows={4}
                                fullWidth
                                size='small'
                                label={<><span>Description</span><span style={{ color: 'red' }}> *</span></>}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ ...styleUpload }}>
                            <Grid textAlign={'center'}>
                                <IconButton>
                                    <label htmlFor="file-upload">
                                        <img src={preview || '/add_img.png'} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                                        <input
                                            id="file-upload"
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </IconButton>
                                <Typography sx={{ color: darkMode ? 'white' : 'black' }}>Drag image here or click to select an image</Typography>
                                <Typography sx={{ mt: 1, fontSize: 14, color: '#9E9B9B' }}>image should not exceed 5mb</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Box
                    sx={{ padding: '0px 10px 30px 10px' }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2} justifyContent={'center'} sx={{ gap: 1 }} >
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            endIcon={<FileUploadIcon />}
                            sx={{ ...btnUpload }}
                            onClick={handleUpload}
                        >
                            Upload
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

const styleUpload = {
    border: '1px dashed #B2BAC2',
    borderRadius: 5,
    p: 4,
};

export const btnUpload = {
    borderRadius: 20,
    mt: 4,
    background: '#B6B4B4',
    fontWeight: 600,
    color: '#000000',
    width: '140px',
    fontSize: 16,
    '&:hover': {
        bgcolor: '#B6B4B4',
    },
};
