const mongoose = require("mongoose");
const { DATABASE_NAME, DATABASE_QUERY } = require("../constants");
const config = require("../config/config");

// Function to establish connection with MongoDB
async function connectDB() {
  try {
    // Connect to the production MongoDB instance for deployment
    const connectInstance = await mongoose.connect(
      `${config.MONGODB_URI}/${DATABASE_NAME}${DATABASE_QUERY}`
    );

    // Log successful connection to MongoDB
    console.log(
      `MongoDB connected!! DB HOST: ${connectInstance.connection.host}`
    );
  } catch (error) {
    // Log error and exit the process if connection fails
    console.log("MONGODB CONNECTION FIELD: ", error);
    process.exit(1);
  }
}

module.exports = connectDB;
