const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");

router.post("/", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Access denied. No refresh token provided." });
    }
    const decoded = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    const newAccessToken = jwt.sign({ id: decoded.id, username: decoded.username }, process.env.ACCESS_SECRET_KEY, { expiresIn: "5m" });
    logger.info(`New access token generated for "${decoded.username}"`);
    return res.send({ accessToken: newAccessToken,id: decoded.id, username: decoded.username });
  } catch (error) {
    logger.warn(`Error refreshing token: "${error.message}"`);
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
});

module.exports = router;