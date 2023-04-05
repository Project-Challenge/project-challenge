const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");
const UserModel = require("../../models/users");
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const result = await validateUser(req.body);
    if (result.error)  {
      logger.info(result.error.details[0].message);
      return res.status(403).send({error: result.error.details[0].message});
    }
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      logger.info(`Invalid username "${username}"`);
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Invalid password for username "${username}"`);
      return res.status(401).json({ error: "Invalid username or password" });
    }
    try {
      await UserModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { lastLoginDate: new Date() } }
      );
    } catch (error) {
      logger.error(`Error occurred while updating lastLoginDate for user "${user._id}": ${error}`);
      return res.status(500).json({ error: "Internal server error" });
    }
    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_SECRET_KEY, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_SECRET_KEY, { expiresIn: "30d" });
    logger.debug(`User "${username}" logged in`);
    res.json({ accessToken, refreshToken, id:user.id, username: user.username });
  } catch (error) {
    logger.error(`Error occurred in login route: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function validateUser(user) {
  const schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
  });
  return schema.validate(user); 
}


module.exports = router;
