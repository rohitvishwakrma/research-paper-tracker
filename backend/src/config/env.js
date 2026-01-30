

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

export const port = process.env.PORT || 5000;
export const mongodbUri = process.env.MONGO_URI;
export const nodeEnv = process.env.NODE_ENV || 'development';