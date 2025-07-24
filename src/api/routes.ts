import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import assessmentRoutes from './assessment/assessment.routes';
import chatbotRoutes from './chatbot/chatbot.routes'; // Uncomment saat sudah dibuat
// import aiRoutes from './custom-ai/ai.routes';       // Uncomment saat sudah dibuat

const router = Router();

router.use('/auth', authRoutes);
router.use('/assessment', assessmentRoutes);
router.use('/chatbot', chatbotRoutes);
// router.use('/ai', aiRoutes);

export default router;