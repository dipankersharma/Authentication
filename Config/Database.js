const mongoose = require("mongoose");

require("dotenv").config();
const DBconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error(err));
};

module.exports = DBconnect;
