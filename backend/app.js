import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import paperRoutes from "./src/routes/paper.routes.js";
import analyticsRoutes from "./src/routes/analytics.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

// Middleware
import errorHandler from "./src/middlewares/error.middleware.js";

const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/* =======================
   GLOBAL MIDDLEWARE
======================= */

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // avoid CSP issues in APIs
  })
);

// CORS (allow frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // 🔴 CHANGE THIS
    ],
    credentials: true,
  })
);

// Logging
app.use(morgan("dev"));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   ROOT ROUTE
======================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PaperResearch API is running",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      papers: "/api/papers",
      analytics: "/api/analytics",
      auth: "/api/auth"
    }
  });
});

/* =======================
   HEALTH CHECK
======================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

/* =======================
   API ROUTES
======================= */

app.use("/api/papers", paperRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);

/* =======================
   404 HANDLER
======================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* =======================
   ERROR HANDLER
======================= */

app.use(errorHandler);

export default app;
