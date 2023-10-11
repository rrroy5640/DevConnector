const express = require("express");
const router = express.Router();
const { query, body, validationResult } = require("express-validator");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("name", "name is required.").notEmpty(),
    body("email", "email not valid.").isEmail(),
    body("password", "password minimum length 6.").isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // See if user exists

    // Get users gravatar
    // Encrypt password
    // Return jsonwebtoken

    res.send("User registered successfully");
  }
);
module.exports = router;
