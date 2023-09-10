const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    city: String
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;