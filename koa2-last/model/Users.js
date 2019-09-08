const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  //用户名
  username: {
    type: String,
    required: true
  },
  //密码
  password: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  qqEmail: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("user", UserSchema);
