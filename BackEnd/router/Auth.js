const router = require('express').Router();
const AuthController = require('../controller/AuthController');
const upload = require('../config/multer');
const middlewareController = require('../middleware/middlewareController')


router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.loginUser)

router.post("/logout",AuthController.logoutUser)

router.post('/refresh-token', AuthController.requestRefeshToken)

router.put('/update-profile-images/:userId', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover_img', maxCount: 1 }]), AuthController.updateProfileImages);

module.exports = router