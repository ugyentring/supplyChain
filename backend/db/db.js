const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

module.exports = connectDb;
