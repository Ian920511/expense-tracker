const bcrypt = require("bcryptjs");
const Record = require("../record");
const Category = require("../category");
const User = require("../user");
const seeder_record = require("./record.json").results;
const seeder_user = require("./user.json").results[0];

const db = require("../../config/mongoose");

db.on("open", async () => {
  const { account, name, password } = seeder_user;
  const createdUser = await User.create({
    account,
    name,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });
  console.log("user is created");

  for (let record of seeder_record) {
    const { category } = record;
    const categories = await Category.findOne({ name: category }).lean();
    record.userId = createdUser._id;
    record.categoryId = categories._id;

    await Record.create(record);
  }

  console.log("record seed is done!");
  process.exit();
});
