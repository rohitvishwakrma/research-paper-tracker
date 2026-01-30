
import mongoose from 'mongoose';
import { mongodbUri } from './env.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodbUri);
    console.log(`MongoDB Connected.`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;