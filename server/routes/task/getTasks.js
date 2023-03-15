const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js')

router.post("/", async (req, res) => {
  try {
    const task = await TaskModel.find();
    if (!task) {    
      logger.warn("No tasks");
      return res.status(404).send("No tasks");
    }
    logger.debug(`Tasks displayed`);
    res.send(task);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
