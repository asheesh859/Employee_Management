const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const TokenSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    token: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

TokenSchema.set('toJSON', { virtuals: true });
const Token = model('tokens', TokenSchema);
module.exports = { Token, TokenSchema };