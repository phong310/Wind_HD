const router = require('express').Router();
const AuthController = require('../controller/AuthController');


router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser)
router.post("/logout", AuthController.logoutUser)

module.exports = router