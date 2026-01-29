const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper');

// Get all papers
router.get('/', async (req, res) => {
  try {
    const papers = await Paper.find().sort({ dateAdded: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get paper by ID
router.get('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new paper
router.post('/', async (req, res) => {
  const paper = new Paper(req.body);
  try {
    const newPaper = await paper.save();
    res.status(201).json(newPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update paper
router.put('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    // Update reading stage dates
    if (req.body.readingStage) {
      if (req.body.readingStage === 'reading' && !paper.dateStarted) {
        req.body.dateStarted = new Date();
      }
      if (req.body.readingStage === 'completed' && !paper.dateCompleted) {
        req.body.dateCompleted = new Date();
      }
    }

    Object.assign(paper, req.body);
    const updatedPaper = await paper.save();
    res.json(updatedPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete paper
router.delete('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    await paper.deleteOne();
    res.json({ message: 'Paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics
router.get('/analytics/stats', async (req, res) => {
  try {
    const totalPapers = await Paper.countDocuments();
    const byStage = await Paper.aggregate([
      { $group: { _id: '$readingStage', count: { $sum: 1 } } }
    ]);
    const byPriority = await Paper.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    const avgRating = await Paper.aggregate([
      { $match: { rating: { $exists: true } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      totalPapers,
      byStage: byStage.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byPriority: byPriority.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      averageRating: avgRating.length > 0 ? avgRating[0].avgRating : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
