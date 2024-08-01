const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    //  fetch data
    console.log(req.body);
    const { email, password } = req.body;

    // validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // check whether user exist or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user);
    // validate password and generate jwt token
    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "User password not found in database",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      // generate jwt token

      const token = jwt.sign(payload, process.env.JWT_Secret, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 30000), // 3 days
        httpOnly: true,
      };
      // res.status(200).json({
      //   success: true,
      //   message: "User logged in successfully",
      //   token,
      //   user,
      // });
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error(error);
    console.log(error.message);
  }
};
