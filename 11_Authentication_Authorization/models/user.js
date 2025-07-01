const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
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
    accountType: {
        type: String,
        enum: ['host', 'viewer'],
        required: true
    },
    terms: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (v) {
                return v === true;
            },
            message: 'You must agree to the terms and conditions'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HostHouse'
    }]
});

module.exports = mongoose.model('User', userSchema);
