import { body } from 'express-validator';

export const registerValidationRules = () => {
  return [
    body('email')
      .isEmail().withMessage('Must be a valid email address')
      .trim()
      .normalizeEmail(),

    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .trim()
      .escape(),
  ];
};

export const loginValidationRules = () => {
  return [
    body('email').isEmail().trim().normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').trim().escape(),
  ];
}