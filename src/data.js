const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
