exports.handler = async (event, context) => {
  try {
    // Get articles from Netlify's edge functions context
    const articlesJson = await context.store.get('articles');
    const articles = articlesJson ? JSON.parse(articlesJson) : [];
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(articles)
    };
  } catch (error) {
    console.error('Error retrieving articles:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve articles' })
    };
  }
};
