const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authors: {
    type: String,
    required: true,
    trim: true
  },
  publicationYear: {
    type: Number,
    required: true
  },
  journal: {
    type: String,
    trim: true
  },
  doi: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  abstract: {
    type: String,
    trim: true
  },
  keywords: {
    type: [String],
    default: []
  },
  readingStage: {
    type: String,
    enum: ['to-read', 'reading', 'completed', 'archived'],
    default: 'to-read'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  notes: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateStarted: {
    type: Date
  },
  dateCompleted: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Paper', paperSchema);
