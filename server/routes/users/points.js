const express = require('express');
const router = express.Router();
const UserModel = require('../../models/users.js');
const authMiddleware = require("../../middlewares/auth");

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const points = user.points;
    res.json({ points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
