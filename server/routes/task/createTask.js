const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js');
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const result = await validateTask(req.body);
    if (result.error)  {
      logger.info(result.error.details[0].message);
      return res.status(403).send({error: result.error.details[0].message});
    }
    const newTask = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      creationDate: new Date(),
      createdBy: req.body.createdBy,
      state: 0
    });
    await newTask.save();
    logger.info(`Task "${newTask._id}" created`);
    res.status(201).json(newTask);
  } catch (error) {
    logger.error(error);
    res.status(500).send({error: "Internal Server Error"});
  }
});

async function validateTask(task) {
  const schema = joi.object({
    title: joi.string().min(5).max(40).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title cannot be more than 40 characters long",
    "any.required": "Title is required",
    "string.empty": "Title is required"
    }),
    createdBy: joi.string().required().messages({
      "string.base": "User ID must be a string",
      "any.required": "User ID is required",
      "string.empty": "User ID is required"
      }),
    description: joi.string().max(120).messages({
      "string.base": "Description must be a string",
      "string.max": "Description cannot be more than 120 characters long",
      })
  });
  return schema.validate(task); 
}

module.exports = router;
