const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // Consider storing the URL or path to the image instead of the actual image data
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number, // Use Number instead of String for numerical values
        required: true
    },
    old_price: {
        type: Number, // Use Number instead of String for numerical values
        required: true
    },
    quantity: {
        type: Number, // Use Number instead of String for numerical values
        default: 1
    }
});

// Create Model
const practice = mongoose.model("practice", schema);
module.exports = practice;