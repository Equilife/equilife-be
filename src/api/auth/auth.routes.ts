import { Router } from 'express';
import { handleLogin, handleRegister } from './auth.controller';
import { registerValidationRules, loginValidationRules } from './auth.validator';

const router = Router();

router.post('/login', loginValidationRules(), handleLogin);
router.post('/register', registerValidationRules(), handleRegister);

export default router;