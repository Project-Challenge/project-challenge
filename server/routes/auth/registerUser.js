  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcrypt");
  const joi = require("joi");
  const logger = require("../../utils/logger");
  const UserModel = require("../../models/users");

  router.post("/", async (req, res) => {
    try {
      const result = await validateUser(req.body);
      if (result.error)  {
        logger.info(result.error.details[0].message);
        return res.status(403).send({error: result.error.details[0].message});
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = new UserModel({
        username: req.body.username,
        password: hash,
        registeredDate: new Date(),
        lastLoginDate: new Date()
      });
      const savedUser = await user.save();
      logger.debug(`User "${savedUser.username}" registered`);
      res.status(201).json({ id: savedUser._id, username: savedUser.username});
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.username === 1) {
        logger.info(`Username is already taken.`);
        res.status(409).json({ error: "Username is already taken." });
      } else {
        logger.error(`Error occurred in register route: ${error}`);
        res.status(500).json({ error: error.message });
      }
    }
  });

async function validateUser(user) {
  const schema = joi.object({
    username: joi.string().min(5).max(40).required().messages({
      "string.base": "Username must be a string",
      "string.min": "Username must be at least 5 characters long",
      "string.max": "Username cannot be more than 40 characters long",
      "any.required": "Username is required",
      "string.empty": "Username is required"
    }),
    password: joi.string().min(5).max(80).required().pattern(new RegExp('^(?=.*[!@#$%^&*(),.?":{}|<>]).*$')).messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 5 characters long",
      "string.max": "Password cannot be more than 80 characters long",
      "any.required": "Password is required",
      "string.empty": "Password is required",
      "string.pattern.base": "Password must contain at  least one special character"
    })
  });
  return schema.validate(user); 
}

  module.exports = router;
