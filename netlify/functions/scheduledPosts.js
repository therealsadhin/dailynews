const { schedule } = require('@netlify/functions');
const { NewsService } = require('../../src/services/newsService');

const handler = async (event) => {
  console.log('Scheduled function started at:', new Date().toISOString());
  
  try {
    const newsService = new NewsService(
      process.env.VITE_NEWS_API_KEY,
      process.env.VITE_GEMINI_API_KEY
    );

    // Fetch and process news articles
    const articles = await newsService.fetchNewsArticles();
    console.log(`Successfully fetched ${articles.length} articles`);
    
    // Store the articles or update the database here
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Posts updated successfully', 
        count: articles.length,
        timestamp: new Date().toISOString() 
      }),
    };
  } catch (error) {
    console.error('Error in scheduled function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to update posts',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
    };
  }
};

// Run every minute using cron expression
exports.handler = schedule('* * * * *', handler);
