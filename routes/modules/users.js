const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post('/register', (req, res) => {

})

router.get("/login", (req, res) => {
  res.render("login");
});

router.post('/login', (req, res) => {
  
})

module.exports = router;
