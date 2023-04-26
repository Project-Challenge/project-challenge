const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require("../../models/tasks.js");
const authMiddleware = require("../../middlewares/auth");
const joi = require("joi");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await validateTask(req.body);
    if (result.error) {
      logger.info(result.error.details[0].message);
      return res.status(403).send({ error: result.error.details[0].message });
    }
    const query = {
      ...(req.body.id && { _id: req.body.id }),
      ...(req.body.author && { _id: req.body.author }),
      ...(req.body.verifier && { _id: req.body.verifier }),
      ...(req.body.state && { state: req.body.state }),
      ...(req.body.like && {
        $or: [
          { title: { $regex: req.body.like, $options: "i" } },
          { description: { $regex: req.body.like, $options: "i" } },
        ],
      }),
    };
    const tasks = await TaskModel.find(query)
      .populate('author', 'username')
      .populate('verifier', 'username');
    if (!tasks || tasks.length === 0) {
      logger.debug("No tasks found");
      return res.status(404).send({ error: "No tasks found" });
    }
    logger.debug(`Task/s displayed`);
    res.send(tasks);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

async function validateTask(task) {
  const schema = joi.object({
    id: joi.string(),
    state: joi.string().valid(0, 1, 2, 3),
    author: joi.string(),
    verifier: joi.string(),
    like: joi.string(),
    date: joi.date(),
  });
  return schema.validate(task);
}

module.exports = router;
