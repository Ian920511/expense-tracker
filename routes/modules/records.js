const dayjs = require("dayjs");
const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (_req, res) => {
  Category.find()
    .lean()
    .then((category) => {
      res.render("new", { category });
    })
    .catch((error) => console.log(error));
});

router.post("/new", (req, res) => {
  const userId = req.user._id;
  return Record.create({ ...req.body, userId })
    .then(res.redirect("/"))
    .catch((error) => console.log(error));
});

router.get("/edit/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      const { _id, name, amount, categoryId } = record;
      const date = dayjs(record.date).format("YYYY-MM-DD");

      Category.find({})
        .lean()
        .then((categories) => {
          res.render("edit", { _id,name, amount, categoryId, date, categories });
        })
        .catch((error) => console.log(error));
    });
});

router.put("/edit/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const { name, date, categoryId, amount } = req.body;

  return Record.findOneAndUpdate(
    { _id, userId },
    { name, date, categoryId, userId, amount }
  )
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
