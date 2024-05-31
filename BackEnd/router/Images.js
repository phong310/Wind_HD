const router = require('express').Router();
const ImagesController = require('../controller/ImagesController');
const upload = require('../config/multer');

router.get('/getAll/:userId', ImagesController.getAllUserImages)

router.get('/images/:folderId', ImagesController.getImagesInFolder);

// Upload ảnh
router.post('/:userId/:folderId?', upload.single('file'), ImagesController.uploadImage);

router.delete('/img/:imageId', ImagesController.deleteImage);

// chuyển ảnh
router.put('/moveImage', ImagesController.moveImage);

module.exports = router;
