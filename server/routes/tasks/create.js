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
      return res.status(400).send({ error: result.error.details[0].message });
    }
    const newTask = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      points: req.body.points,
      creationDate: new Date(),
      deadlineDate: req.body.deadline,
      author: req.user.id,
      verifier: req.body.verifier,
      state: 0,
    });
    await newTask.save();
    logger.info(`Task "${newTask._id}" created`);
    return res.status(201).json(newTask);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

async function validateTask(task) {
  const schema = joi.object({
    title: joi.string().min(5).max(40).required().messages({
      "string.base": "Title must be a string",
      "string.min": "Title must be at least 5 characters long",
      "string.max": "Title cannot be more than 40 characters long",
      "any.required": "Title is required",
      "string.empty": "Title is required",
    }),
    verifier: joi.string().required().messages({
      "string.base": "Verifier must be a string",
      "any.required": "Verifier is required",
      "string.empty": "Verifier is required",
    }),
    points: joi.string().required().messages({
      "int.base": "Points must be an number",
      "any.required": "Points are required",
      "string.empty": "Points are required",
    }),
    description: joi.string().max(120).messages({
      "string.base": "Description must be a string",
      "string.max": "Description cannot be more than 120 characters long",
    }),
    deadline: joi.string().required().messages({
      "string.base": "Deadline must be a string",
      "any.required": "Deadline is required",
      "string.empty": "Deadline is required",
    }),
  });
  return schema.validate(task);
}

module.exports = router;
