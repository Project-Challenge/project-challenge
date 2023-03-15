const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js')


router.post("/", async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.body.id,
      {
        state: 1,
        finishedBy: "placeholder",
        pendingDate: new Date()
      },
      { new: true }
    );
    if (!task) {    
      return res.status(404).send({error: "Task not found"});
    }
    logger.info(`Task "${task._id}" set to pending`);
    res.send(task);
  } catch (err) {
    logger.error(err);
    res.status(500).send({error: "Internal Server Error"});
  }
});

module.exports = router;
