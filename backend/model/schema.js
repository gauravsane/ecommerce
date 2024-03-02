const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: String,
        required: true
    },
    old_price:{
        type: String,
        required: true
    }
});

//Create Model
const backend = new mongoose.model("backend", schema);
module.exports = backend;