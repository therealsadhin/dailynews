const { schedule } = require('@netlify/functions');
const { NewsService } = require('../../src/services/newsService');

const handler = async (event) => {
  try {
    const newsService = new NewsService(
      process.env.VITE_NEWS_API_KEY,
      process.env.VITE_GEMINI_API_KEY
    );

    // Fetch and process news articles
    const articles = await newsService.fetchNewsArticles();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Posts updated successfully', count: articles.length }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update posts' }),
    };
  }
};

// Run every day at midnight UTC
exports.handler = schedule('0 0 * * *', handler);
