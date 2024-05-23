import { Chip, Grid } from '@mui/material'
import React from 'react'


const TagsRecommend = [
    {
        stt: 1,
        title: 'Natural'
    },
    {
        stt: 2,
        title: 'Cyberpunk'
    },
    {
        stt: 3,
        title: 'Anime'
    },
    {
        stt: 4,
        title: 'Game'
    },
    {
        stt: 5,
        title: 'Food'
    },
    {
        stt: 6,
        title: 'Movie'
    },
    {
        stt: 7,
        title: 'Comics'
    },
    {
        stt: 8,
        title: 'Digital Art'
    },
    {
        stt: 9,
        title: 'Hip-hop'
    },
    {
        stt: 10,
        title: 'Wallpapper Desktop'
    }
]

export default function TagsList({ searchTags }) {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'} gap={2} sx={{ mb: 6 }}>
            {TagsRecommend.map((item, idx) => {
                return (
                    <Grid item key={idx}>
                        <Chip label={item.title} onClick={() => searchTags(item.title)} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
