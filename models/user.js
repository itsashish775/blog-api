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
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
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
schema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
