dotenv.config();
import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 5000;
export const mongodbUri = process.env.MONGO_URI;
export const nodeEnv = process.env.NODE_ENV || 'development';