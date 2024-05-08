const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
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
    type: {
        type: String,
        enum: ["ADMIN", "REGULAR USER"],
        default: "REGULAR USER"
    },

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', schema);
