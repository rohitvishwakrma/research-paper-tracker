import express from 'express';
import paperController from '../controllers/paper.controller.js';

const router = express.Router();

// Paper CRUD routes
router.post('/', paperController.addPaper);
router.get('/', paperController.getPapers);
router.get('/stats', paperController.getPaperStats);
router.get('/:id', paperController.getPaper);
router.put('/:id', paperController.updatePaper);
router.delete('/:id', paperController.deletePaper);

export default router;