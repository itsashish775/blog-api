// db.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectDB;
