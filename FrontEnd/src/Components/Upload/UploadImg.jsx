import { Box, Button, Grid, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { CssTextField } from '../Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function UploadImg({ darkMode }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select a file first.")
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', 'test');
    formData.append('description', 'okokokoko');

    try {
      const response = await axios.post('http://localhost:8080/upload/664c5614f35573ea5112ad8d', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // alert('File uploaded successfully. Image URL: ' + response.data.imageURL);
      toast.success("Upload ảnh thành công")
    } catch (error) {
      console.error('Error uploading the file:', error);
      toast.warning("Failed to upload file. Please try again.")
    }
  };

  return (
    <Box sx={{ mb: 8, pt: 14 }}>
      <Typography variant='h5' sx={{ ...styleTypoTitle, color: darkMode ? 'white' : 'black' }}>UPLOAD NEW IMAGE</Typography>
      <Grid container justifyContent={'center'} alignContent={'center'} sx={{ px: 80 }} gap={4}>
        <Grid item sm={12}>
          <CssTextField fullWidth size='small' label="Title" />
        </Grid>
        <Grid item sm={12}>
          <CssTextField multiline rows={4} maxRows={4} fullWidth size='small' label="Description" />
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
        <Button
          variant="contained"
          endIcon={<FileUploadIcon />}
          sx={{ ...btnUpload }}
          onClick={handleUpload}
        >
          Upload
        </Button>
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
