const ImageModel = require('../models/ImagesModel');
const cloudinary = require('cloudinary').v2;

const ImagesController = {
    // Upload ảnh
    uploadImage: async (req, res) => {
        const { folderId } = req.params;

        try {
            // Lưu thông tin ảnh vào MongoDB
            const newImage = new ImageModel({
                title: req.body.title,
                description: req.body.description,
                url: req.file.path,
                folder: folderId
            });

            await newImage.save();

            res.status(201).json(newImage);
        } catch (error) {
            res.status(500).json({ message: 'Error uploading image', error });
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
    }
};

module.exports = ImagesController;
