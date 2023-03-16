const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

router.get("/", async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    if (!accessToken) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
    const decoded = await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    logger.info(`Valid token received for user "${decoded.username}"`);
    return res.send({ isValid: true, id: decoded.id, username: decoded.username });
  } catch (error) {
    logger.warn(`Error verifying token: "${error.message}"`);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
});

module.exports = router;