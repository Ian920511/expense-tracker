const Category = require("../category");

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid",
};

const db = require("../../config/mongoose");

db.once("open", async () => {
  for (let name in CATEGORY) {
    const icon = CATEGORY[name];
    await Category.create({ name, icon });
  }
  console.log("category seed is done!");
  process.exit();
});
