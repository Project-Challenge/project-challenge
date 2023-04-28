const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const result = await validateToken(req.body);
    if (result.error) {
      logger.info(result.error.details[0].message);
      return res.status(403).send({ error: result.error.details[0].message });
    }
    const accessToken = req.body.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const decoded = await jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET_KEY
    );
    logger.info(`Valid token received for user "${decoded.username}"`);
    return res.send({
      isValid: true,
      id: decoded.id,
      username: decoded.username,
    });
  } catch (error) {
    logger.warn(`Error verifying token: "${error.message}"`);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
});

async function validateToken(user) {
  const schema = joi.object({
    accessToken: joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = router;
