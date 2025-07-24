import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET || 'zhafranganteng123',
  aiApiUrl: process.env.AI_API_URL || '',
  // Tambahkan variabel lain di sini
  // contoh: googleApiKey: process.env.GOOGLE_API_KEY
};

export default config;