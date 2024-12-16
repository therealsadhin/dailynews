import { NewsScheduler } from '../services/scheduler';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const newsApiKey = process.env.VITE_NEWS_API_KEY;
const geminiApiKey = process.env.VITE_GEMINI_API_KEY;

if (!newsApiKey || !geminiApiKey) {
  console.error('Missing API keys in environment variables');
  process.exit(1);
}

const scheduler = new NewsScheduler(newsApiKey, geminiApiKey);
scheduler.startScheduler();

console.log('News scheduler started. Press Ctrl+C to stop.');
