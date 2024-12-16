import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
}

const CATEGORIES = ['world', 'business', 'technology', 'sports', 'entertainment'];

export class NewsService {
  private newsApiKey: string;
  private geminiApiKey: string;
  private genAI: any;
  private articlesPath: string;

  constructor(newsApiKey: string, geminiApiKey: string) {
    this.newsApiKey = newsApiKey;
    this.geminiApiKey = geminiApiKey;
    this.genAI = new GoogleGenerativeAI(this.geminiApiKey);
    this.articlesPath = 'src/data/articles.json';
  }

  async fetchNewsArticles(): Promise<NewsArticle[]> {
    const articles: NewsArticle[] = [];
    
    // Fetch one article for each category
    for (const category of CATEGORIES) {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=1&apiKey=${this.newsApiKey}`
        );
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          const article = data.articles[0];
          articles.push({
            id: Date.now().toString() + '-' + category,
            title: article.title,
            content: article.content,
            imageUrl: article.urlToImage,
            publishedAt: article.publishedAt,
            source: article.source.name,
            category
          });
        }
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      }
    }
    
    return articles;
  }

  async paraphraseContent(content: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Please paraphrase the following news article in a professional and engaging way, maintaining all important facts and details. Make it around 300 words: ${content}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error paraphrasing content:', error);
      throw error;
    }
  }

  async processAndSaveNews(): Promise<void> {
    try {
      const articles = await this.fetchNewsArticles();
      const processedArticles: NewsArticle[] = [];

      for (const article of articles) {
        const paraphrasedContent = await this.paraphraseContent(article.content);
        processedArticles.push({
          ...article,
          content: paraphrasedContent
        });
      }

      await this.saveArticles(processedArticles);
    } catch (error) {
      console.error('Error processing news:', error);
      throw error;
    }
  }

  private async saveArticles(articles: NewsArticle[]): Promise<void> {
    try {
      // Read existing articles
      let existingArticles: NewsArticle[] = [];
      if (fs.existsSync(this.articlesPath)) {
        const data = await fs.promises.readFile(this.articlesPath, 'utf8');
        existingArticles = JSON.parse(data);
      }

      // Filter out duplicates based on title
      const uniqueArticles = articles.filter(newArticle => 
        !existingArticles.some(existingArticle => 
          existingArticle.title === newArticle.title
        )
      );

      // Add new unique articles
      const updatedArticles = [...uniqueArticles, ...existingArticles];
      
      // Keep only the latest 5 articles (1 per category)
      const latestArticles = CATEGORIES.map(category => {
        const categoryArticles = updatedArticles.filter(article => article.category === category);
        return categoryArticles[0]; // Get the most recent article for this category
      }).filter(Boolean); // Remove any undefined entries

      // Save to file
      await fs.promises.writeFile(
        this.articlesPath,
        JSON.stringify(latestArticles, null, 2)
      );
    } catch (error) {
      console.error('Error saving articles:', error);
      throw error;
    }
  }

  async getArticles(): Promise<NewsArticle[]> {
    try {
      if (fs.existsSync(this.articlesPath)) {
        const data = await fs.promises.readFile(this.articlesPath, 'utf8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error reading articles:', error);
      return [];
    }
  }
}
