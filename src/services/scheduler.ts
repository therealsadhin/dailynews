import cron from 'node-cron';
import { NewsService } from './newsService';

export class NewsScheduler {
  private newsService: NewsService;

  constructor(newsApiKey: string, geminiApiKey: string) {
    this.newsService = new NewsService(newsApiKey, geminiApiKey);
  }

  startScheduler() {
    // Run immediately when started
    this.newsService.processAndSaveNews()
      .then(() => console.log('Initial news update completed'))
      .catch(error => console.error('Error in initial news update:', error));

    // Then run every day at midnight
    cron.schedule('0 0 * * *', async () => {
      console.log('Running daily news update...');
      try {
        await this.newsService.processAndSaveNews();
        console.log('Daily news update completed successfully');
      } catch (error) {
        console.error('Error in daily news update:', error);
      }
    });
  }
}
