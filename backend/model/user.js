const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ['admin'], default: 'admin' },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
