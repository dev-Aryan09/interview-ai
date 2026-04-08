require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Failed to connect database");
    console.log("mongo uri", process.env.MONGO_URI);
    console.log(err);
  }
}

module.exports = connectToDB;
