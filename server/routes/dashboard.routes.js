const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, (req, res) => {
  res.json({ message: `Welcome to your dashboard, user ${req.user.email}` });
});

module.exports = router;
