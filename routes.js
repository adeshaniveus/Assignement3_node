const express = require("express");
const controler = require("./controller/user.controller");
const app = express.Router();

app.get("/", controler.getUser);

app.post("/", controler.addUser);

app.put("/:id", controler.updateUser);
module.exports = app;
