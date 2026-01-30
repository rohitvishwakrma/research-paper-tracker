

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });
console.log('[DEBUG] dotenv loaded from:', envPath);
console.log('[DEBUG] MONGO_URI:', process.env.MONGO_URI);

export const port = process.env.PORT || 5000;
export const mongodbUri = process.env.MONGO_URI;
export const nodeEnv = process.env.NODE_ENV || 'development';