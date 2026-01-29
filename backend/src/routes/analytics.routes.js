const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

// Analytics routes
router.get('/funnel', analyticsController.getFunnelAnalytics);
router.get('/scatter', analyticsController.getScatterPlotData);
router.get('/stacked', analyticsController.getStackedBarData);
router.get('/summary', analyticsController.getSummaryAnalytics);
router.get('/filters', analyticsController.getAvailableFilters);

module.exports = router;