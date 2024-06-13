import FileUploadIcon from '@mui/icons-material/FileUpload';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CssTextField } from '../Home';
import { useSelector } from 'react-redux';

export default function UploadImg({ darkMode }) {
  const baseURL = import.meta.env.VITE_API_PRODUCTS;
  const user = useSelector((state) => state.auth.login?.currentUser)
  const userId = user?.user?._id
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const reset_form = () => {
    setTitle('')
    setDescription('')
    setFile(null)
    setPreview(null)
  }

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select a file first.")
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('userId', userId);
    formData.append('folder', null);
    formData.append('description', description);
    setIsLoading(true)

    try {
      const response = await axios.post(`${baseURL}upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Upload photo successfully")
      reset_form()
      setIsLoading(false)
    } catch (error) {
      console.error('Error uploading the file:', error);
      toast.warning("Failed to upload file. Please try again.")
      setIsLoading(false)
    }
  };

  return (
    <Box sx={{ mb: 8, pt: 14 }}>
      <Typography variant='h5' sx={{ ...styleTypoTitle, color: darkMode ? 'white' : 'black' }}>UPLOAD NEW IMAGE</Typography>
      <Grid container justifyContent={'center'} alignContent={'center'} sx={{ px: 80 }} gap={4}>
        <Grid item sm={12}>
          <CssTextField
            fullWidth
            size='small'
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item sm={12}>
          <CssTextField
            multiline
            rows={4}
            maxRows={4}
            fullWidth
            size='small'
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item sm={12} sx={{ ...styleUpload }}>
          <Grid textAlign={'center'}>
            <IconButton>
              <label htmlFor="file-upload">
                <img src={preview || '/add_img.png'} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
            </IconButton>
            <Typography sx={{ color: darkMode ? 'white' : 'black' }}>Drag image here or click to select an image</Typography>
            <Typography sx={{ mt: 1, fontSize: 14, color: '#9E9B9B' }}>image should not exceed 5mb</Typography>
          </Grid>
        </Grid>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          endIcon={<FileUploadIcon />}
          sx={{ ...btnUpload }}
          onClick={handleUpload}
        >
          Upload
        </LoadingButton>
      </Grid>
    </Box>
  );
}

export const btnUpload = {
  borderRadius: 20,
  background: '#B6B4B4',
  fontWeight: 600,
  color: '#000000',
  width: '140px',
  fontSize: 16,
  '&:hover': {
    bgcolor: '#B6B4B4',
  },
};

const styleUpload = {
  border: '1px dashed #B2BAC2',
  borderRadius: 5,
  p: 4,
};

const styleTypoTitle = {
  textAlign: 'center',
  my: 6,
  fontWeight: 'bold',
};
