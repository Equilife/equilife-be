import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  // Tambahkan variabel lain di sini
  // contoh: googleApiKey: process.env.GOOGLE_API_KEY
};

export default config;