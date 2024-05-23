const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Wind_HD',
        allowed_formats: ['jpg', 'png']
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
