const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT} `);
});
