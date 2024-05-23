import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { CssTextField } from '../Home';
import SearchBar from '../SearchBar/SearchBar';

export default function FolderDetail({ darkMode }) {
    return (
        <Box sx={{ mb: 60, pt: 18 }}>
            <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ px: 20 }}>
                <Grid item>
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: darkMode ? 'white' : 'unset' }}>Upload</Typography>
                </Grid>
                <Grid item>
                    {/* <IconButton>
                        <FolderIcon />
                    </IconButton> */}
                    <img src='/Folder_img.png' style={{ width: 40, height: 40 }} />
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ borderColor: darkMode ? 'white' : 'unset' }} />
                </Grid>
            </Grid>
            <SearchBar/>
        </Box>
    )
}
