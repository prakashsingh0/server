const express = require('express');
const { Register, Login, Users } = require('../controllers/authentication');

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login)
router.route("/users").get(Users)
module.exports = router