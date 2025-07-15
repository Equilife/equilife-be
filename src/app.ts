import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './api/routes';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './core/middleware/errorHandler';

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Backend API!');
});

app.use('/api', apiRoutes);
app.use(errorHandler);

export default app;