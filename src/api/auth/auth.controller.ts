import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    next(error);
  }
};

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.registerUser(email, password);
    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    next(error);
  }
};
