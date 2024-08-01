const express = require("express");
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Import port
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// import cookie parser

const cookieParser = require("cookie-parser");

app.use(cookieParser());

// Routes
const user = require("./Routes/route");
app.use("/api/v1", user);

// Start server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB

const DBconnect = require("./Config/Database");
DBconnect();

app.get("/", (res, req) => {
  res.send("Hello from Express Server");
});
