const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js')

router.post("/", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.body.id);
    if (!task) {    
      logger.warn("Task not Found");
      return res.status(404).send("Task not found");
    }
    logger.info(`Task "${task._id}" opened`);
    res.send(task);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
