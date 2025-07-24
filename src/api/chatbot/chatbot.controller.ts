import { Request, Response, NextFunction } from 'express';
import * as chatbotService from './chatbot.service';

export const handleChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { sessionId, message } = req.body;
        if (!sessionId || !message) {
            return res.status(400).json({ message: 'sessionId and message are required' });
        }

        const agentResponse = await chatbotService.handleChatMessage(userId, sessionId, message);
        res.status(200).json(agentResponse);
    } catch (error) {
        next(error);
    }
};