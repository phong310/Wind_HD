const router = require('express').Router();
const ImagesController = require('../controller/ImagesController');
const upload = require('../config/multer');

// Upload ảnh
router.post('/:folderId', upload.single('file'), ImagesController.uploadImage);

router.delete('/img/:imageId', ImagesController.deleteImage);

module.exports = router;
