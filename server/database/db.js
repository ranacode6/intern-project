const mongoose = require('mongoose');

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('DataBase Connected Successfully');
  } catch {
    console.log('Error while connecting to database');
  }
};
