const paperService = require('../services/paper.service');

const paperController = {
  // Add a new paper
  async addPaper(req, res) {
    try {
      const paperData = req.body;
      
      // Validate required fields
      const requiredFields = ['title', 'firstAuthor', 'researchDomain', 'readingStage'];
      for (const field of requiredFields) {
        if (!paperData[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      const paper = await paperService.createPaper(paperData);
      
      res.status(201).json({
        success: true,
        message: 'Paper added successfully',
        data: paper,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding paper',
        error: error.message,
      });
    }
  },

  // Get all papers with filters
  async getPapers(req, res) {
    try {
      const filters = {
        search: req.query.search || '',
        domain: req.query.domain || '',
        stage: req.query.stage || '',
        impact: req.query.impact || '',
        dateFilter: req.query.dateFilter || 'allTime',
        sortBy: req.query.sortBy || 'dateAdded',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page || 1,
        limit: req.query.limit || 20,
      };

      const result = await paperService.getPapers(filters);
      
      res.status(200).json({
        success: true,
        data: result.papers,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching papers',
        error: error.message,
      });
    }
  },

  // Get single paper by ID
  async getPaper(req, res) {
    try {
      const paper = await paperService.getPaperById(req.params.id);
      
      if (!paper) {
        return res.status(404).json({
          success: false,
          message: 'Paper not found',
        });
      }

      res.status(200).json({
        success: true,
        data: paper,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching paper',
        error: error.message,
      });
    }
  },

  // Update paper
  async updatePaper(req, res) {
    try {
      const updatedPaper = await paperService.updatePaper(req.params.id, req.body);
      
      if (!updatedPaper) {
        return res.status(404).json({
          success: false,
          message: 'Paper not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Paper updated successfully',
        data: updatedPaper,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating paper',
        error: error.message,
      });
    }
  },

  // Delete paper
  async deletePaper(req, res) {
    try {
      const deletedPaper = await paperService.deletePaper(req.params.id);
      
      if (!deletedPaper) {
        return res.status(404).json({
          success: false,
          message: 'Paper not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Paper deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting paper',
        error: error.message,
      });
    }
  },

  // Get paper statistics
  async getPaperStats(req, res) {
    try {
      const stats = await paperService.getPaperStats();
      
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching paper statistics',
        error: error.message,
      });
    }
  },
};

module.exports = paperController;