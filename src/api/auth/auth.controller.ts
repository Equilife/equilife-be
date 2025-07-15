import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as authService from './auth.service';

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const result = await authService.registerUser(email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(409).json({ success: false, message: error.message });
  }
};