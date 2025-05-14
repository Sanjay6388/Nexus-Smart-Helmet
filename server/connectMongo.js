const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    // Remove the useUnifiedTopology and useNewUrlParser options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = connectMongo;
