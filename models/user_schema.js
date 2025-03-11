const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Retailer', 'FOS'],
        default: 'FOS', // Set default value to 'FOS'
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
