const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: String,
    email: {
        type: String,
        required: true
    },
    folder_id: {
        type: Array,
        require:false
    },
    password: {
        type: String,
        required: true,
    },
    confirm: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("UserModel", userSchema)