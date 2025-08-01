import { Router } from 'express';
import { authMiddleware } from '../../core/middleware/authMiddleware';
import { handleChat } from './chatbot.controller';

const router = Router();
router.post('/chat', authMiddleware, handleChat);

export default router;