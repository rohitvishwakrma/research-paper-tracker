const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to start MongoDB and the server
async function startServer() {
  try {
    console.log('Starting in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    
    console.log('MongoDB connected successfully');

    // Routes
    const papersRouter = require('./routes/papers');
    app.use('/api/papers', papersRouter);

    // Root route
    app.get('/', (req, res) => {
      res.json({ message: 'Research Paper Tracker API - Running with In-Memory MongoDB' });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('API is ready to accept requests');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
