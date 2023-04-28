const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const TaskModel = require('../../models/tasks.js');
const UserModel = require('../../models/users.js');
const authMiddleware = require("../../middlewares/auth");
const joi = require("joi");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = await validateTask(req.body);
    if (result.error)  {
      logger.info(result.error.details[0].message);
      return res.status(403).send({error: result.error.details[0].message});
    }
    const newState = parseInt(req.body.state) -1;
    const task = await TaskModel.findByIdAndUpdate(
      req.body.id,
      {
        state: newState,
        finishedBy: null,
        pendingDate: null
      },
      { new: true }
    );
    if (!task) {    
      return res.status(404).send({error: "Task not found"});
    }
    if (req.body.state === 2) {
      const user = await UserModel.findById(task.author);
      user.points -= task.points;
      await user.save();
      logger.info(`Task "${task._id}" set to reverted and ${task.points} points deducted from user ${user._id}`);
    } else {
      logger.info(`Task "${task._id}" set to reverted`);
    }
    res.send(task);
  } catch (err) {
    logger.error(err);
    res.status(500).send({error: "Internal Server Error"});
  }
});


async function validateTask(user) {
  const schema = joi.object({
    id: joi.string().required(),
    state: joi.number().required()
  });
  return schema.validate(user); 
}

module.exports = router;
