const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    DOB: Date,
    role: String,
    location: String,
    password: String,
    confirm_password: String,
}, {
    versionKey: false
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };