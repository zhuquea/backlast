const mongoose = require("mongoose");
const CateGorySchema = mongoose.Schema;

const CateSchema = new CateGorySchema({
  content: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  endTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  participants: {
    type: Array,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("cate", CateSchema);
