import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalMoveImg from './ModalMoveImg';
import ModalDelete from './ModalDelete';

export default function ModalFolder({ open, setOpen, imgId, getAll, getImgFolder }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [openChooseFolder, setOpenChooseFolder] = useState(false)
    const [openModalDel, setOpenModalDel] = useState(false)
    const [isImg, setIsImg] = useState(false)

    const handleClose = () => {
        setOpen(false)
    };

    const handleChooseFolder = (e) => {
        e.preventDefault();
        setOpen(false)
        setOpenChooseFolder(true)
    }

    const openModalDelete = (e) => {
        e.preventDefault()
        setOpenModalDel(true)
        setIsImg(true)
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
                <AppBar sx={{ position: 'relative', bgcolor: '#B6B4B4', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                            Option
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
                        <Typography variant='h5'>
                            What action do you want to perform ?
                        </Typography>
                    </Box>
                </DialogContent>
                <Box
                    sx={{ padding: '0px 10px 30px 10px' }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2} justifyContent={'center'} sx={{ gap: 1 }} >
                        <Button variant="outlined" color='inherit' onClick={openModalDelete}>
                            Delete
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            sx={{ ...styleBtnAdd }}
                            onClick={handleChooseFolder}>
                            Move
                        </LoadingButton>
                    </Grid>

                </Box>
            </Dialog>
            <ModalMoveImg
                open={openChooseFolder}
                setOpen={setOpenChooseFolder}
                imgId={imgId}
                getImgFolder={getImgFolder}
            />
            <ModalDelete
                open={openModalDel}
                setOpen={setOpenModalDel}
                imgId={imgId}
                isImg={isImg}
                setIsImg={setIsImg}
                getAll={getAll}
                getImgFolder={getImgFolder}
            />
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
