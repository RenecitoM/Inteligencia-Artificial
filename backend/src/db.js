const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ReneM:EKU1K05wGBuJb5ZW@cluster0.hqifvb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
