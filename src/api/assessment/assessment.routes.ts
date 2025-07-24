import { Router } from 'express';
import { authMiddleware } from '../../core/middleware/authMiddleware';
import { handleCreateAssessment } from './assessment.controller';

const router = Router();
router.post('/', authMiddleware, handleCreateAssessment);

export default router;