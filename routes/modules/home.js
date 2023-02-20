const express = require("express");
const router = express.Router();

const Records = require("../../models/record");

router.get("/", (req, res) => {
  // const userId = req.user._id;
  res.render("index");
  // Records.find({ userId})
  //   .lean()
  //   .sort({ date: 'desc'})
  //   .then(() => res.render('index'))
});

module.exports = router;
