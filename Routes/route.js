const express = require("express");
const routes = express.Router();

const { signup, login } = require("../Controller/User");

routes.post("/signup", signup);
// routes.post("/login", login);

module.exports = routes;
