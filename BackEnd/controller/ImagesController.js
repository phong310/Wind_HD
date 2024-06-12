const ImageModel = require('../models/ImagesModel');
const cloudinary = require('cloudinary').v2;

const ImagesController = {

    getAllUserImages: async (req, res) => {
        const { userId } = req.params;

        try {
            const images = await ImageModel.find({ userId });

            if (!images || images.length === 0) {
                return res.status(404).json({ message: 'No images found for this user' });
            }

            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching images', error });
        }
    },

    getImagesInFolder: async (req, res) => {
        const { folderId } = req.params;

        try {
            const images = await ImageModel.find({ folder: folderId });

            if (!images) {
                return res.status(404).json({ message: 'No images found in this folder' });
            }

            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching images', error });
        }
    },

    // Upload ảnh
    uploadImage: async (req, res) => {
        const { folderId } = req.params;
        const { userId } = req.params;

        try {
            // Lưu thông tin ảnh vào MongoDB
            const newImage = new ImageModel({
                title: req.body.title,
                description: req.body.description,
                url: req.file.path,
                folder: folderId || null,
                userId: userId
            });

            await newImage.save();

            res.status(201).json(newImage);
        } catch (error) {
            res.status(500).json({ message: 'Error uploading image', error });
        }
    },

    // Chuyển folder
    moveImage: async (req, res) => {
        const { imageId, folderId } = req.body;

        try {
            // Tìm ảnh trong MongoDB
            const image = await ImageModel.findById(imageId);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }

            // Cập nhật folder của ảnh
            image.folder = folderId;
            await image.save();

            res.status(200).json({ message: 'Image moved successfully', image });
        } catch (error) {
            res.status(500).json({ message: 'Error moving image', error });
        }
    },

    // Xóa ảnh
    deleteImage: async (req, res) => {
        const { imageId } = req.params;

        try {
            // Tìm ảnh trong MongoDB
            const image = await ImageModel.findById(imageId);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }

            // Xóa ảnh trên Cloudinary
            // Lấy publicId từ URL (bao gồm cả đường dẫn thư mục nếu có)
            const urlParts = image.url.split('/');
            const publicIdWithExt = urlParts.slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicIdWithExt, function (error, result) {
                if (error) {
                    console.log('Error deleting image on Cloudinary:', error);
                    return res.status(500).json({ message: 'Error deleting image on Cloudinary', error });
                }
            });

            // Xóa ảnh trong MongoDB
            await ImageModel.findByIdAndDelete(imageId);

            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting image', error });
        }
    },

    // Tìm kiếm
    searchImagesByTitleInFolder: async (req, res) => {
        const { folderId, title } = req.params;

        try {
            let images;
            if (folderId) {
                images = await ImageModel.find({ folder: folderId, title: { $regex: title, $options: 'i' } });
            } else {
                images = await ImageModel.find({ title: { $regex: title, $options: 'i' } });
            }

            if (!images || images.length === 0) {
                return res.status(404).json({ message: 'No images found with this title' });
            }

            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({ message: 'Error searching images', error });
        }
    },

};

module.exports = ImagesController;
