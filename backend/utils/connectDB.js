const mongoose = require("mongoose");
const connectDB = async () => {
  const MONGO_URI =
    "mongodb+srv://itsproali:VerySecretPassword.@testcluster.tbwfynz.mongodb.net/stripe_test?retryWrites=true&w=majority";
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
