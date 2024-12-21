const { schedule } = require('@netlify/functions');

const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

class NewsService {
  constructor(newsApiKey) {
    this.newsApiKey = newsApiKey;
  }

  async fetchNewsArticles() {
    const articles = [];
    
    // Fetch multiple articles for each category
    for (const category of CATEGORIES) {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=3&apiKey=${this.newsApiKey}`
        );
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          data.articles.forEach((article, index) => {
            articles.push({
              id: `${Date.now()}-${category}-${index}`,
              title: article.title,
              content: article.description || article.content,
              imageUrl: article.urlToImage,
              publishedAt: article.publishedAt,
              source: article.source.name,
              category
            });
          });
        }
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      }
    }
    
    return articles;
  }
}

const handler = async (event) => {
  console.log('Scheduled function started at:', new Date().toISOString());
  
  try {
    const newsService = new NewsService(process.env.VITE_NEWS_API_KEY);

    // Fetch and process news articles
    const articles = await newsService.fetchNewsArticles();
    console.log(`Successfully fetched ${articles.length} articles`);
    
    // Store the articles in Netlify's edge functions context
    const context = event.context;
    if (context && context.store) {
      await context.store.set('articles', JSON.stringify(articles));
      console.log('Articles stored successfully');
    }
    
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
