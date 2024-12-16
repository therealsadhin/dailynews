import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
}

export function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch('/articles.json');
        const articles = await response.json();
        const foundArticle = articles.find((a: Article) => a.id === id);
        setArticle(foundArticle || null);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-24">
        <div className="text-center">Article not found</div>
      </div>
    );
  }

  // Format the content by splitting into paragraphs
  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div className="container mx-auto px-6 py-24">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <article className="prose prose-lg mx-auto">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{article.source}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span className="text-blue-600 capitalize">{article.category}</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
        
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700">
              {paragraph.replace(/\*\*/g, '')}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}