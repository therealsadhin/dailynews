import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
}

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const navigate = useNavigate();

  // Create an excerpt from the content (first paragraph)
  const excerpt = article.content.split('\n')[0].slice(0, 150) + '...';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => navigate(`/article/${article.id}`)}>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <div className="text-sm text-blue-600 mb-2 capitalize">{article.category}</div>
        <CardTitle className="text-xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{article.source}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}