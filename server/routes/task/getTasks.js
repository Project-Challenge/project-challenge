const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js')
const joi = require("joi");

router.get("/", async (req, res) => {
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      logger.warn("Invalid request body");
      return res.status(400).send({ error: result.error.details[0].message });
    }
    const query = {
      ...(req.body.id && { _id: req.body.id }),
      ...(req.body.state && { state: req.body.state }),
      ...(req.body.like && {
        $or: [
          { title: { $regex: req.body.like, $options: "i" } },
          { description: { $regex: req.body.like, $options: "i" } },
        ],
      }),
      ...(req.body.date && {
        endDate: { $gt: new Date() },
        startDate: { $lt: new Date() },
      }),
    };
    const tasks = await TaskModel.find(query);
    if (!tasks || tasks.length === 0) {
      logger.warn("No tasks found");
      return res.status(404).send({ error: "No tasks" });
    }
    logger.debug(`Tasks displayed`);
    res.send(tasks);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const schema = joi.object({
  id: joi.string(),
  state: joi.number(),
  like: joi.string(),
  date: joi.boolean(),
});

module.exports = router;
