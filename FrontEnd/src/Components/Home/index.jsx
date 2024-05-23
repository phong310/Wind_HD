import SearchIcon from '@mui/icons-material/Search';
import { Box, Chip, Grid, IconButton, ImageList, ImageListItem, Pagination, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import LoadingScreens from '../LoadingScreens/LoadingScreens';
import SearchBar from '../SearchBar/SearchBar';
import TagsList from '../TagsList/TagsList';
import ImageGallery from '../ImageGallery/ImageGallery';
import { useFetchPhotos } from '../../Hook/useFetchPhotos';

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

export default function Home({ darkmode }) {
  const clientId = process.env.Access_Key
  // const [itemData, setItemData] = useState([])
  // const [searchTag, setSearchTag] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTags, setCurrentTags] = useState();
  // const [isLoading, setIsLoading] = useState(false)

  const { itemData, searchTag, isLoading, setSearchTag } = useFetchPhotos(clientId, currentPage, currentTags);

  // const getListPhotos = async () => {
  //   setIsLoading(true)
  //   try {
  //     const res = await axios.get(`https://api.unsplash.com/photos?client_id=${clientId}&per_page=30&page=${currentPage}`)
  //     setTimeout(() => {
  //       setItemData(res.data);
  //       setIsLoading(false);
  //     }, 800);

  //   } catch (e) {
  //     console.log('Err:', e);
  //     setIsLoading(false)
  //   }
  // }

  // const searchTags = async (tags) => {
  //   setIsLoading(true)
  //   try {
  //     const res = await axios.get(`https://api.unsplash.com/search/photos?client_id=${clientId}&query=${tags}&per_page=30&page=${currentPage}`)
  //     setSearchTag(res.data.results);
  //     setCurrentTags(tags)
  //     setIsLoading(false);

  //   } catch (e) {
  //     console.log('Err:', e);
  //   }
  // }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const searchTags = (tags) => {
    setCurrentTags(tags);
    setCurrentPage(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // useEffect(() => {
  //   if (searchTag.length > 0) {
  //     searchTags(currentTags)
  //   } else {
  //     getListPhotos()
  //   }
  // }, [currentPage])

  // useEffect(() => {
  //   if (currentTags) {
  //     setCurrentPage(1);
  //     searchTags(currentTags);
  //   }
  // }, [currentTags]);


  useEffect(() => {
    scrollToTop()
  }, [currentPage])




  return (
    <Box sx={{ mb: 10, pt: 14 }}>
      <SearchBar onSearch={searchTags} />
      <TagsList searchTags={searchTags} />
      {/* {isLoading ? <LoadingScreens darkmode={darkmode} /> : <Grid container justifyContent={'center'}>
        <Grid item>
          <ImageList variant="masonry" cols={4} gap={8}>
            {searchTag.length > 0 ? searchTag?.map((item, idx) => (
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
            )) : itemData?.map((item, idx) => (
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
      </Grid>} */}
      {isLoading ? (
        <LoadingScreens darkmode={darkmode} />
      ) : (
        <ImageGallery
          photos={searchTag.length > 0 ? searchTag : itemData}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </Box>
  )
}

