import { Grid, Typography, IconButton } from '@mui/material'
import instagram from '../../../assets/Images/Instagram.png'
import facebook from '../../../assets/Images/Facebook Circled.png'

import React from 'react'

export default function Footer({ darkMode }) {
  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ p: 4 }}>
      <Grid item>
        <img src='/wind_white.png' style={{ width: 240, height: 240 }} />
        {/* <Typography sx={{ ...styleTypo }}>
          The wind
        </Typography> */}
      </Grid>
      <Grid item>
        <Grid display={'flex'} alignContent={'center'} gap={1} sx={{ mb: 2 }} justifyContent={'flex-end'}>
          <IconButton>
            <img src={instagram} />
          </IconButton>
          <IconButton>
            <img src={facebook} />
          </IconButton>
        </Grid>
        <Typography sx={{ ...typoMade, color: darkMode ? 'white' : 'black' }}>
          made by <span style={{ color: 'gray', textDecoration: 'underline' }}>the wind</span>
        </Typography>
      </Grid>

    </Grid>
  )
}

const styleTypo = {
  color: 'black',
  fontSize: 26,
  fontWeight: 'bold',
  textTransform: 'uppercase'
}

const typoMade = {
  textTransform: 'uppercase',
  fontWeight: 400,
  fontSize: 18
}