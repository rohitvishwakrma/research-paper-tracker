
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import paperRoutes from './src/routes/paper.routes.js';
import analyticsRoutes from './src/routes/analytics.routes.js';
import authRoutes from './src/routes/auth.routes.js';

// Import middleware
import errorHandler from './src/middlewares/error.middleware.js';

const app = express();

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
  })
); // Security headers (CSP relaxed for inline scripts)
app.use(cors()); // Enable CORS
// app.use(morgan('dev')); // HTTP request logger (disabled to reduce console noise)
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/papers', paperRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);

// dir to frontend s backend or frontend  

// Serve frontend build from correct location
app.use(express.static(path.join(__dirname, "../PaperResearch/dist")));


// Catch-all route for SPA: serve index.html for any unmatched route
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../PaperResearch/dist", "index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler
app.use(errorHandler);

export default app;