
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { AppBar, Box, Dialog, DialogContent, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ModalMoveImg({ open, setOpen, getImgFolder, imgId }) {
    const { id } = useParams();
    const baseURL = import.meta.env.VITE_API_PRODUCTS;
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user?._id
    const [folders, setFolders] = useState()
    const [folderIdNew, setFolderIdNew] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getAllFolders = async () => {
        try {
            const res = await axios.get(`${baseURL}folder/${userId}`)
            setFolders(res.data);
        } catch (e) {
            console.log('Err: ', e);
        }
    }

    const handleMoveImg = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const newItem = {
                imageId: imgId,
                folderId: folderIdNew
            }
            const res = await axios.put(`${baseURL}upload/moveImage`, newItem)
            setOpen(false)
            setIsLoading(false)
            getImgFolder()
            toast.success("Moved photos to folder successfully")

        } catch (e) {
            console.log('Err:', e);
            toast.warn("Failed !")
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
    };

    useEffect(() => {
        if (open) {
            getAllFolders()
        }
    }, [open])

    return (
        <>
            <Dialog open={open} maxWidth="md" sx={{ ...styleDialog }}>
                <AppBar sx={{ position: 'relative', bgcolor: '#B6B4B4', color: 'black' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ ...styleTextTitle }}>
                            Folder
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
                        <FormControl>
                            <FormLabel>Choose folder ?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={id}
                                name="radio-buttons-group"
                                onChange={(e) => setFolderIdNew(e.target.value)}
                            >
                                {folders?.map((item, idx) => {
                                    return (
                                        <FormControlLabel
                                            value={item._id}
                                            key={idx}
                                            control={<Radio color="default" />}
                                            label={item.name}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Box>
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
                            type="submit"
                            variant="contained"
                            sx={{ ...styleBtnAdd }}
                            onClick={handleMoveImg}>
                            Move
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
    minWidth: 400,
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
