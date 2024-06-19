import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

export default function LoadingScreens({ darkMode }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            <CircularProgress sx={{ color: darkMode ? 'white' : 'black' }} />
        </Box>
    )
}
