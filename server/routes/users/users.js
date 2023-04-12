const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const UserModel = require("../../models/users.js");
const joi = require("joi");

router.get("/", async (req, res) => {
  try {
    const result = await validateUser(req.body);
    if (result.error) {
      logger.info(result.error.details[0].message);
      return res.status(403).send({ error: result.error.details[0].message });
    }
    const query = {
      ...(req.body.id && { _id: req.body.id }),
      ...(req.body.username && { username: req.body.username }),
      ...(req.body.like && {
        $or: [
          { username: { $regex: req.body.like, $options: "i" } },
        ],
      }),
    };
    const users = await UserModel.find(query).select("_id, username, points, lastLoginDate, registeredDate, isAdmin");
    if (!users || users.length === 0) {
      logger.debug("No users found");
      return res.status(404).send({ error: "No users found" });
    }
    logger.debug(`User/s displayed`);
    res.send(users);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

async function validateUser(user) {
  const schema = joi.object({
    id: joi.string(),
    like: joi.string(),
    username: joi.string(),
  });
  return schema.validate(user);
}

module.exports = router;
