const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
}, { versionKey: false });

module.exports = mongoose.model("User", UserSchema);
