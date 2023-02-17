const express = require("express");

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT} `);
});
