const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { account, name, password, confirmPassword } = req.body;
  const errors = [];

  if (!account || !name || !password || !confirmPassword) {
    errors.push({ message: "所有欄位皆為必填!" });
  }

  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符!" });
  }

  if (errors.length) {
    return res.render("register", {
      errors,
      account,
      name,
      password,
      confirmPassword,
    });
  }

  User.findOne({ account }).then((user) => {
    if (user) {
      errors.push({ message: "此 Email 已被註冊過了!" });

      return res.render("register", {
        errors,
        account,
        name,
        password,
        confirmPassword,
      });
    }

    return User.create({
      account,
      name,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    })
      .then(() => res.redirect("/users/login"))
      .catch((error) => console.log(error));
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  (req, res, next) => {
    const { account, password } = req.body;
    if (!account || !password) {
      req.flash("warning_msg", "請輸入信箱或密碼");
      res.redirect("/users/login");
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出!");
  res.redirect("/users/login");
});

module.exports = router;
