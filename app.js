const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const PORT = 3000;
const routes = require("./routes");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT} `);
});
