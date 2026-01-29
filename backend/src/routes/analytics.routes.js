import express from 'express';
import analyticsController from '../controllers/analytics.controller.js';

const router = express.Router();

// Analytics routes
router.get('/funnel', analyticsController.getFunnelAnalytics);
router.get('/scatter', analyticsController.getScatterPlotData);
router.get('/stacked', analyticsController.getStackedBarData);
router.get('/summary', analyticsController.getSummaryAnalytics);
router.get('/filters', analyticsController.getAvailableFilters);

export default router;