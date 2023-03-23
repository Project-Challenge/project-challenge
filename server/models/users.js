const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique : true
    },
    password: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0
    },
    lastLoginDate: {
      type: Date,
      required: true,
    },
    registeredDate: {
      type: Date,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
});

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;