const analyticsService = require('../services/analytics.service');

const analyticsController = {
  // Get funnel analytics
  async getFunnelAnalytics(req, res) {
    try {
      const filters = {
        dateFilter: req.query.dateFilter || 'allTime',
      };

      const funnelData = await analyticsService.getFunnelAnalytics(filters);
      
      res.status(200).json({
        success: true,
        data: funnelData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching funnel analytics',
        error: error.message,
      });
    }
  },

  // Get scatter plot data
  async getScatterPlotData(req, res) {
    try {
      const filters = {
        dateFilter: req.query.dateFilter || 'allTime',
      };

      const scatterData = await analyticsService.getScatterPlotData(filters);
      
      res.status(200).json({
        success: true,
        data: scatterData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching scatter plot data',
        error: error.message,
      });
    }
  },

  // Get stacked bar data
  async getStackedBarData(req, res) {
    try {
      const filters = {
        dateFilter: req.query.dateFilter || 'allTime',
      };

      const stackedData = await analyticsService.getStackedBarData(filters);
      
      res.status(200).json({
        success: true,
        data: stackedData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching stacked bar data',
        error: error.message,
      });
    }
  },

  // Get summary analytics
  async getSummaryAnalytics(req, res) {
    try {
      const filters = {
        dateFilter: req.query.dateFilter || 'allTime',
      };

      const summaryData = await analyticsService.getSummaryAnalytics(filters);
      
      res.status(200).json({
        success: true,
        data: summaryData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching summary analytics',
        error: error.message,
      });
    }
  },

  // Get available filters
  async getAvailableFilters(req, res) {
    try {
      const filters = await analyticsService.getAvailableFilters();
      
      res.status(200).json({
        success: true,
        data: filters,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching available filters',
        error: error.message,
      });
    }
  },
};

module.exports = analyticsController;