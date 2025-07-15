import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import apiRoutes from './api/routes';
import { errorHandler } from './core/middleware/errorHandler';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Astro Backend API!');
});

app.use('/api', apiRoutes);
app.use(errorHandler);

export default app;