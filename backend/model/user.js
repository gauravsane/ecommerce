const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type: String,
        default: null
    }
})

const user = new mongoose.model("user",schema);
module.exports = user