const express = require("express");
const routes = express.Router();

const { signup } = require("../Controller/User");
const { login } = require("../Controller/login");
const { auth, isStudent, isAdmin } = require("../middleware/authh");

routes.post("/signup", signup);
routes.post("/login", login);

// test protected routes
routes.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Testing purpose only",
  });
});

// protected routes
routes.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Student only",
  });
});
routes.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Admin only",
  });
});

module.exports = routes;
