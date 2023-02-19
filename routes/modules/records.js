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
      Category.findOne({ _id: record.categoryId })
        .lean()
        .then((category) => {
          const categoryName = category.name;
          res.render("edit", { record, categoryName });
        })
        .catch((error) => console.log(error));
    });
});

router.put("/edit/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Record.findOne({ _id, userId })
    .update(req.body)
    .then(() => res.redirect(`/records/${_id}`))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const _id = req.params._id;
  const userId = req.user_id;

  return Record.findOne({ _id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
