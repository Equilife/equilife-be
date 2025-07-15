import app from './app';
import config from './core/config';

const port = config.port;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});