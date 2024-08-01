const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    //   extract Jwt token
    console.log("boodies: ", req.body.token);
    console.log("cookies: ", req.cookies.token);
    console.log("headers: ", req.header("Authorization"));

    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // verify token

    try {
      const decode = jwt.verify(token, process.env.JWT_Secret);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
