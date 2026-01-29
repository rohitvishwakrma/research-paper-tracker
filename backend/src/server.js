const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down server due to unhandled promise rejection');
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down server due to uncaught exception');
  server.close(() => process.exit(1));
});