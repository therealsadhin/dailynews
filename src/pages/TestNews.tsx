import { useEffect, useState } from 'react';
import { NewsService } from '../services/newsService';

interface NewsArticle {
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

export function TestNews() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [paraphrasedContent, setParaphrasedContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testNews = async () => {
      try {
        const newsService = new NewsService(
          import.meta.env.VITE_NEWS_API_KEY,
          import.meta.env.VITE_GEMINI_API_KEY
        );

        // Fetch news articles
        const articles = await newsService.fetchNewsArticles();
        if (articles.length > 0) {
          setArticle(articles[0]);
          
          // Paraphrase the content
          const paraphrased = await newsService.paraphraseContent(articles[0].content);
          setParaphrasedContent(paraphrased);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    testNews();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">API Test Results</h1>
      
      {article && (
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h2 className="font-bold">Original Article:</h2>
            <h3 className="text-xl font-semibold">{article.title}</h3>
            {article.imageUrl && (
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="my-4 rounded-lg max-w-full h-auto"
              />
            )}
            <p className="mt-2">{article.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Source: {article.source} | Published: {new Date(article.publishedAt).toLocaleString()}
            </p>
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="font-bold">Paraphrased Content:</h2>
            <p className="mt-2">{paraphrasedContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}
