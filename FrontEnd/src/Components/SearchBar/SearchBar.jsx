import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { CssTextField } from '../Home';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch, isFetching }) {
    const [searchTerm, setSearchTerm] = useState('');
    const previousSearchTerm = useRef('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (searchTerm === '' && previousSearchTerm.current !== '') {
            isFetching();
            onSearch('');
        }
        previousSearchTerm.current = searchTerm;
    }, [searchTerm, isFetching]);

    return (
        <Grid container justifyContent={'center'} sx={{ my: 4 }} gap={1}>
            <Grid item sm={4}>
                <CssTextField
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="outlined-search"
                    size='small'
                    label="Search..."
                    type="search"
                    onKeyDown={handleKeyPress}
                />
            </Grid>
            <Grid item>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
