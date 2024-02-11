const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require,
        unique: true
    },
    email: {
        type: String,
        require,
        unique: true
    },
    password: {
        type: String,
        require
    },
    isAvataeImageset: {
        type: Boolean,
        default: false
    },
    avtarImage: {
        type: String,
        default: ""
    }
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel };
