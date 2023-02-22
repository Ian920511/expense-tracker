const dayjs = require("dayjs");
const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;
  const checkedCategory = req.query.checkedCategory || "all";
  const user = { userId };

  if (checkedCategory !== "all") {
    user.categoryId = checkedCategory;
  }

  return Category.find({})
    .lean()
    .sort({ _id: "asc" })
    .then((categories) => {
      return Record.find(user)
        .populate("categoryId")
        .lean()
        .sort({ date: "desc" })
        .then((records) => {
          let totalAmount = 0;
          records.forEach((record) => {
            totalAmount += Number(record.amount);
            record.date = dayjs(record.date).format("YYYY-MM-DD");
          });

          res.render("index", {
            records,
            totalAmount,
            categories,
            checkedCategory,
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

module.exports = router;
