import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ModalDelete({
    open,
    setOpen,
    folderId,
    imgId,
    isImg,
    setIsImg,
    getImgFolder,
    setIsDelFolder,
}) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        setOpen(false)
        setIsImg(false)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const res =
                imgId && isImg
                    ? await axios.delete(`${baseURL}upload/img/${imgId}`)
                    : await axios.delete(`${baseURL}folder/${userId}/${folderId}`)
            toast.success('Delete success')
            setIsLoading(false)
            setOpen(false)
            setIsImg && setIsImg(false)
            imgId && isImg ? getImgFolder() : setIsDelFolder(true)
        } catch (e) {
            console.log('Err:', e);
            setIsLoading(false)
            // toast.warn('Failed!')
        }
    }

    return (
        <>
            <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
                <AppBar sx={{ position: 'relative', bgcolor: '#B6B4B4', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                            Delete
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
                    <Box
                        sx={{ ...styleBoxContainer }}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>Are you sure you want to delete this {imgId && isImg ? 'image' : 'folder'} ?</Typography>
                    </Box>
                </DialogContent>
                <Box
                    sx={{ padding: '0px 10px 30px 10px' }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2} justifyContent={'center'} sx={{ gap: 1 }} >
                        <Button variant="outlined" color='inherit' onClick={handleClose}>
                            Cancel
                        </Button>
                        <LoadingButton loading={isLoading} type="submit" variant="contained" sx={{ ...styleBtnAdd }} onClick={handleDelete}>
                            Delete
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
