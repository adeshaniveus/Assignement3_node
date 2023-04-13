const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const route = require("./routes");

const port = process.env.port || 8000;

app.use("/user", route);

app.get("/", (req, res) => {
  res.send("<h1>Hello Welcome</h1>");
});

app.listen(port, () => {
  console.log("server runing");
});
module.exports.app = app;
