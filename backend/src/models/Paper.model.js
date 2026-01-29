const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Paper title is required'],
    trim: true,
  },
  firstAuthor: {
    type: String,
    required: [true, 'First author name is required'],
    trim: true,
  },
  researchDomain: {
    type: String,
    required: [true, 'Research domain is required'],
    enum: [
      'Computer Science',
      'Data Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Bioinformatics',
      'Chemistry',
      'Physics',
      'Mathematics',
      'Engineering',
      'Social Sciences',
      'Medical Research',
      'Environmental Science',
      'Other'
    ],
  },
  readingStage: {
    type: String,
    required: [true, 'Reading stage is required'],
    enum: [
      'To Read',
      'Currently Reading',
      'Partially Read',
      'Fully Read',
      'Reviewed'
    ],
  },
  citationCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  impactScore: {
    type: String,
    enum: ['High Impact', 'Medium Impact', 'Low Impact', 'Unknown'],
    default: 'Unknown',
  },
  dateAdded: {
    type: Date,
    required: [true, 'Date added is required'],
    default: Date.now,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
paperSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
paperSchema.index({ researchDomain: 1, readingStage: 1, impactScore: 1 });
paperSchema.index({ dateAdded: -1 });

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;