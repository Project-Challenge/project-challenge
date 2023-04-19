const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "No description was provided",
  },
  state: {
    //  0 - created, 1 - pending, 2 - finished
    type: Number,
    required: false,
    default: 0,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  pendingDate: {
    type: Date,
    required: false,
  },
  finishedDate: {
    type: Date,
    required: false,
  },
  author: {
    type: String,
    required: true,
    ref: "users",
  },
  recipient: {
    type: String,
    required: true,
    ref: "users",
  },
  finishedBy: {
    type: String,
    required: false,
    ref: "users",
  },
  verifiedBy: {
    type: String,
    required: false,
    ref: "users",
  },
});

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
