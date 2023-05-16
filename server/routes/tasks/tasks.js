const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require("../../models/tasks.js");
const authMiddleware = require("../../middlewares/auth");
const joi = require("joi");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = await validateTask(req.body);
    if (result.error) {
      logger.info(result.error.details[0].message);
      return res.status(403).send({ error: result.error.details[0].message });
    }
    let author;
    let verifier;
    if (!req.body.isVerify) {
      author = req.user.id;
    }
    if (req.body.isVerify) {
      verifier = req.user.id;
    }

    const query = {
      ...(req.body.id && { _id: req.body.id }),
      ...(author && { author: author }),
      ...(verifier && { verifier: verifier }),
      ...(req.body.state && req.body.state != -1 && { state: req.body.state }),
      ...(req.body.like && {
        $or: [
          { title: { $regex: req.body.like, $options: "i" } },
          { description: { $regex: req.body.like, $options: "i" } },
        ],
      }),
    };
    const tasks = await TaskModel.find(query)
      .populate("author", "username")
      .populate("verifier", "username");
    if (!tasks || tasks.length === 0) {
      logger.debug("No tasks found");
      return res.status(204).send({ error: "No tasks found" });
    }
    logger.debug(`Task/s displayed`);
    res.send(tasks);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

async function validateTask(user) {
  const schema = joi.object({
    id: joi.string(),
    state: joi.number(),
    author: joi.string(),
    verifier: joi.string(),
    like: joi.string().allow(""),
    date: joi.date(),
    isVerify: joi.boolean(),
  });
  return schema.validate(user);
}

module.exports = router;
