import { Box, Grid, ImageList, ImageListItem, Pagination } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useGetColumns } from '../../Hook/useGetColums';

const ImageGallery = ({ photos, currentPage, handlePageChange }) => {
  const getColumns = useGetColumns();


  return (
    <Box sx={{ px: 10, overflowX: 'hidden' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ImageList variant="masonry" cols={getColumns()} gap={8}>
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
                    style={{ width: '100%' }}
                  />
                </motion.div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item>
          <Pagination
            count={10}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            sx={{ mt: 20 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const styleImgZoom = {
  position: 'relative',
  overflow: 'hidden'
}

export default ImageGallery;
