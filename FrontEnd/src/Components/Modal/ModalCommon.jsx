import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CssTextField } from '../Home';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ModalCommon({ open, setOpen, getAll, data, isEdit, setIsEdit }) {
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id

    const handleClose = () => {
        setOpen(false)
        setIsEdit(false)
    };
    const [folderName, setFolderName] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event) => {
        setFolderName(event.target.value);
        setError(false);
    }

    const reset_form = () => {
        setFolderName('')
        setError(false);
    }

    const handleAddFolder = async (e) => {
        e.preventDefault();
        if (!folderName.trim()) {
            setError('Directory name cannot be empty');
            return;
        }
        setError('');
        try {
            const newFolder = {
                name: folderName
            }
            const res = isEdit
                ? await axios.put(`${baseURL}folder/${userId}/${data?._id}`, newFolder)
                : await axios.post(`${baseURL}folder/${userId}`, newFolder)
            toast.success("Created successfully!")
            setOpen(false);
            setIsEdit(false);
            getAll()
        } catch (e) {
            console.log('Err: ', e);
            toast.warn("Failed !")
        }
    }

    useEffect(() => {
        if (open) {
            reset_form()
        }
    }, [open])

    useEffect(() => {
        if (isEdit) {
            setFolderName(data?.name)
        }
    }, [isEdit])

    return (
        <>
            <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
                <AppBar sx={{ position: 'relative', bgcolor: '#B6B4B4', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                            {isEdit ? 'Edit' : 'Create new'}
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
                        <CssTextField
                            fullWidth
                            label='Name'
                            sx={{ width: 400 }}
                            value={folderName}
                            onChange={handleChange}
                            error={!!error}
                            helperText={error}
                        />
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
                        <LoadingButton onClick={handleAddFolder} type="submit" variant="contained" sx={{ ...styleBtnAdd }}>
                            {isEdit ? 'Update' : 'Add'}
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
