import React from 'react';
import { Grid, ImageList, ImageListItem, Pagination } from '@mui/material';
import { motion } from 'framer-motion';

const ImageGallery = ({ photos, currentPage, handlePageChange }) => (
  <Grid container justifyContent={'center'}>
    <Grid item>
      <ImageList variant="masonry" cols={4} gap={8}>
        {photos.map((item, idx) => (
          <ImageListItem key={idx} sx={{ ...styleImgZoom }}>
            <motion.div
              animate={{ x: 0 }}
              transition={{ type: 'tween', duration: 0.5 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.6 }}
            >
              <img
                srcSet={`${item.urls.small}`}
                src={`${item.urls.small}`}
                loading="lazy"
              />
            </motion.div>
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
    <Pagination
      count={10}
      page={currentPage}
      onChange={handlePageChange}
      shape="rounded"
      sx={{ mt: 20 }}
    />
  </Grid>
);

const styleImgZoom = {
  position: 'relative',
  overflow: 'hidden'
}

export default ImageGallery;
