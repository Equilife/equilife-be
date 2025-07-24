import { Request, Response, NextFunction } from 'express';
import * as assessmentService from './assessment.service';

export const handleCreateAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const assessmentData = req.body;
        const result = await assessmentService.createAssessment(userId, assessmentData);

        res.status(201).json({ message: "Assessment created successfully", data: result });
    } catch (error) {
        next(error);
    }
};