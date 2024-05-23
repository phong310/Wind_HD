const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const UsersModel = require('../models/UsersModel');

let refreshTokenArr = [];

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            role: user.Role
        },
            process.env.JWT_ACCESS_KEY, { expiresIn: "1d" }
        )
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                Role: user.Role
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
                return res.status(500).json("Wrong username !");
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(500).json("Wrong password !");
            }

            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);

            // Lưu refresh token vào mảng
            refreshTokenArr.push(refreshToken);

            // Lưu refresh token vào cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
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
        res.clearCookie("refreshToken");
        res.status(200).json("Logout success !")
    }
}

module.exports = authController
