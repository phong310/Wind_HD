const FoldersModel = require('../models/FoldersModel');

const FoldersController = {
    // Lấy tất cả các thư mục của người dùng
    getAllFolders: async (req, res) => {
        const { userId } = req.params;

        try {
            const folders = await FoldersModel.find({ user_id: userId });

            res.status(200).json(folders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching folders', error });
        }
    },
    
    // Lấy chi tiết thư mục
    getFolderDetail: async (req, res) => {
        const { userId, folderId } = req.params;

        try {
            const folder = await FoldersModel.findOne({ _id: folderId, user_id: userId });

            if (!folder) {
                return res.status(404).json({ message: 'Folder not found' });
            }

            res.status(200).json(folder);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching folder detail', error });
        }
    },
    
    // Tạo thư mục
    createFolder: async (req, res) => {
        const { userId } = req.params;
        const { name } = req.body;

        try {
            const newFolder = new FoldersModel({
                name: name,
                user_id: userId
            });
            await newFolder.save();

            res.status(201).json(newFolder);
        } catch (error) {
            res.status(500).json({ message: 'Error creating folder', error });
        }
    },
    // Sửa tên thư mục
    updateFolderName: async (req, res) => {
        const { userId, folderId } = req.params;
        const { name } = req.body;

        try {
            const folder = await FoldersModel.findOneAndUpdate(
                { _id: folderId, user_id: userId },
                { name: name },
                { new: true }
            );

            if (!folder) {
                return res.status(404).json({ message: 'Folder not found' });
            }

            res.status(200).json(folder);
        } catch (error) {
            res.status(500).json({ message: 'Error updating folder name', error });
        }
    },

    // Xóa thư mục
    deleteFolder: async (req, res) => {
        const { userId, folderId } = req.params;

        try {
            const folder = await FoldersModel.findOneAndDelete({ _id: folderId, user_id: userId });

            if (!folder) {
                return res.status(404).json({ message: 'Folder not found' });
            }

            res.status(200).json({ message: 'Folder deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting folder', error });
        }
    }
}

module.exports = FoldersController;
