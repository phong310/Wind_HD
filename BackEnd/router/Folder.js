const router = require('express').Router();
const FoldersController = require('../controller/FoldersController');

router.get('/:userId', FoldersController.getAllFolders)

router.post('/:userId', FoldersController.createFolder)

// Sửa tên thư mục
router.put('/:userId/:folderId', FoldersController.updateFolderName);

// Xóa thư mục
router.delete('/:userId/:folderId', FoldersController.deleteFolder);


module.exports = router