import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { NewsPagination } from "./Pagination";
import { CategoryFilter } from "./CategoryFilter";

const ITEMS_PER_PAGE = 9;

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
}

export function NewsGrid() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return sessionStorage.getItem('selectedCategory') || 'all';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch('/articles.json');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();

    // Restore scroll position
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);

  // Save state to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage.toString());
    sessionStorage.setItem('selectedCategory', selectedCategory);
  }, [currentPage, selectedCategory]);

  // Save scroll position when navigating away
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    sessionStorage.setItem('scrollPosition', '0');
  };

  const filteredArticles = articles.filter(article => 
    selectedCategory === 'all' ? true : article.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-24">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
            />
          ))}
        </div>

        {/* Pagination */}
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
    </>
  );
}