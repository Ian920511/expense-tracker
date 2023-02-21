const express = require("express");
const router = express.Router();

const Records = require("../../models/record");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;

  Category.find({})
    .lean()
    .sort({ _id: "asc" })
    .then((checkedCategory) => {
      Records.find({ userId })
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((records) => {
          let totalAmount = 0;
          records.forEach((record) => (totalAmount += record.amount));
          res.render("index", { records, totalAmount, checkedCategory });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

module.exports = router;
