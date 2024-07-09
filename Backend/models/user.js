const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: String
    },
    is_Active: {
        type: Boolean,
        default: true
    },
    gender: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

userSchema.set('toJSON', { virtuals: true });
const User = model('users', userSchema);
module.exports = { User, userSchema };


