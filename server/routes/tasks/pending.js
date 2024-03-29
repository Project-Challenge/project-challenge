const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js');
const authMiddleware = require("../../middlewares/auth");
const joi = require("joi");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = await validateTask(req.body);
    if (result.error)  {
      logger.info(result.error.details[0].message);
      return res.status(403).send({error: result.error.details[0].message});
    }
    const task = await TaskModel.findByIdAndUpdate(
      req.body.id,
      {
        state: 1,
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

async function validateTask(user) {
  const schema = joi.object({
    id: joi.string().required()
  });
  return schema.validate(user); 
}

module.exports = router;
