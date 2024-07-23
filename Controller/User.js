const bcrypt = require("bcrypt");
const User = require("../Models/user");

// signup

exports.signup = async (req, res) => {
  try {
    // import data from request
    const { name, email, password, role } = req.body;

    // check if user is already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // hash password
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error in hashing password" });
    }

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
