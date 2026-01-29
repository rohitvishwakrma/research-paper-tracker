const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paper.controller');

// Paper CRUD routes
router.post('/', paperController.addPaper);
router.get('/', paperController.getPapers);
router.get('/stats', paperController.getPaperStats);
router.get('/:id', paperController.getPaper);
router.put('/:id', paperController.updatePaper);
router.delete('/:id', paperController.deletePaper);

module.exports = router;