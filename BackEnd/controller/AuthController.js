const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const UsersModel = require('../models/UsersModel');
const cloudinary = require('cloudinary').v2;
const ImageModel = require('../models/ImagesModel')

let refreshTokenArr = [];

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
        },
            process.env.JWT_ACCESS_KEY, { expiresIn: "10s" }
        )
    },

    generateRefreshTokenAAA: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_REFESH_KEY, { expiresIn: "365d" }
        )
    },

    // REGISTER 
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const hashConfirmPass = await bcrypt.hash(req.body.confirm, salt)

            // create new
            const newUser = await new UsersModel({
                username: req.body.username,
                avatar: "",
                cover_img: "",
                email: req.body.email,
                password: hashedPassword,
                confirm: hashConfirmPass,
            })

            const user = await newUser.save();
            res.status(200).json(user)

        } catch (e) {
            res.status(500).json({ Err: e.message })
        }

    },

    loginUser: async (req, res) => {
        try {
            const user = await UsersModel.findOne({
                username: req.body.username
            });

            if (!user) {
                return res.status(500).json({ message: "Wrong username !" });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(500).json({ message: "Wrong password !" });
            }

            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshTokenAAA(user);

            // Xóa các refresh token cũ của người dùng trước khi thêm token mới vào mảng
            refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken);
            refreshTokenArr.push(refreshToken);

            // Lưu refresh token vào cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
            });

            // Trả về phản hồi với access token và refresh token
            res.status(200).json({ user, accessToken, refreshToken });
        } catch (e) {
            console.error("Error while finding user", e.message);
            res.status(500).json({ err: e.message });
        }
    },


    // LOGOUT
    logoutUser: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        refreshTokenArr = refreshTokenArr.filter(token => token !== refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json("Logout success !");
    },

    requestRefeshToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");

        if (!refreshTokenArr.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        } 
        // verify refresh token
        jwt.verify(refreshToken, process.env.JWT_REFESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json("Refresh token is not valid");
            }

            // Nếu có refresh token mới rồi lọc cái cũ ra
            refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);

            // Tạo mới một accessToken và refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshTokenAAA(user);
            refreshTokenArr.push(newRefreshToken);

            // lưu refresh token vào cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
            });

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });
    },

    // SET AVATAR + COVER_IMG
    updateProfileImages: async (req, res) => {
        const { userId } = req.params;
        const avatarFile = req.files.avatar ? req.files.avatar[0] : null;
        const coverImgFile = req.files.cover_img ? req.files.cover_img[0] : null;

        try {
            const user = await UsersModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (avatarFile) {
                const avatarUpload = await cloudinary.uploader.upload(avatarFile.path, { folder: 'avatar' });
                user.avatar = avatarUpload.secure_url;
                const newAvatarImage = new ImageModel({
                    title: 'Avatar Image',
                    description: 'User avatar image',
                    url: avatarUpload.secure_url,
                    folder: null,
                    userId: userId
                });
                await newAvatarImage.save();
            }

            if (coverImgFile) {
                const coverImgUpload = await cloudinary.uploader.upload(coverImgFile.path, { folder: 'cover_img' });
                user.cover_img = coverImgUpload.secure_url;
                const newCoverImage = new ImageModel({
                    title: 'Cover Image',
                    description: 'User cover image',
                    url: coverImgUpload.secure_url,
                    folder: null,
                    userId: userId
                });
                await newCoverImage.save();
            }

            await user.save();
            res.status(200).json({ message: 'Profile images updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile images', error });
        }
    },
}

module.exports = authController
