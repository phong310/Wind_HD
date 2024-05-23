import { Box, Button, Grid, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { motion } from 'framer-motion';
import React from 'react'

export const ArrFolders = [
    { stt: 1, name: 'Upload' },
    { stt: 2, name: 'Natural' },
    { stt: 3, name: 'Cycberpunk' },
    { stt: 4, name: 'Movie' },
    { stt: 5, name: 'Mine' },
    { stt: 6, name: 'Wallpapper' },
]

export default function Profile({ darkMode }) {
    return (
        <Box sx={{ mb: 60, pt: 13, }}>
            <Grid sx={{ position: 'relative' }}>
                <img src='/astronout_purple.jpg' style={styleImgCover} />
                <Box sx={styleAvatarContainer}>
                    <img src='/avatar.jpg' alt='Avatar' style={styleAvatar} />
                </Box>
            </Grid>
            <Grid container justifyContent={'flex-end'} sx={{ p: 6 }}>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ ...btnUpload }} >New folder</Button>
            </Grid>
            <Grid container justifyContent={'center'} gap={4}>
                {ArrFolders.map((item, idx) => {
                    return (
                        <motion.div
                            animate={{ x: 0 }}
                            transition={{ type: 'tween', duration: 0.5 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.6 }}
                        >
                            <Grid item key={idx} sx={{ ...styleFolder }}>
                                <img src='/Folder_img.png' />
                                <Typography sx={{ color: darkMode ? 'white' : 'unset'}}>{item.name}</Typography>
                            </Grid>
                        </motion.div>

                    )
                })}

            </Grid>
        </Box>
    )
}

const styleImgCover = {
    width: '100%',
    height: 500,
    objectFit: 'cover',
    position: 'relative'
}

const styleAvatarContainer = {
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