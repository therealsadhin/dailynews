import { useState, useEffect } from "react";
import { NewsCard } from "@/components/NewsCard";
import { NewsPagination } from "@/components/Pagination";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
}

const ITEMS_PER_PAGE = 9;

export function LatestPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch('/articles.json');
        const data = await response.json();
        // Sort articles by date, newest first
        const sortedArticles = data.sort((a: NewsArticle, b: NewsArticle) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <NewsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
