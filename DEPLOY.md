# Deployment Instructions for cPanel

## Pre-deployment Steps

1. Build the project locally:
```bash
npm install
npm run build
```

2. Create a ZIP file containing:
   - The `dist` folder (contains the built website)
   - `cron-scheduler.js`
   - `.htaccess` file
   - `package.json`
   - `src/scheduler.ts`
   - `.env` file (make sure it has the correct API keys)

## cPanel Deployment Steps

1. **Upload and Extract Files**
   - Log in to your cPanel account
   - Navigate to File Manager
   - Go to `public_html` directory
   - Upload the ZIP file and extract it

2. **Set Up Node.js**
   - In cPanel, go to "Setup Node.js App"
   - Create a new Node.js application
   - Set the application path to your website directory
   - Set Node.js version to 18.x or higher
   - Save and restart the application

3. **Install Dependencies**
   - Using cPanel's Terminal or SSH:
   ```bash
   cd public_html
   npm install
   ```

4. **Set Up Cron Job**
   - In cPanel, go to "Cron Jobs"
   - Add a new cron job
   - Set the schedule to run daily (e.g., at 00:00):
   ```
   0 0 * * * /usr/local/bin/node /home/username/public_html/cron-scheduler.js >> /home/username/scheduler.log 2>&1
   ```
   Replace 'username' with your actual cPanel username

5. **Environment Variables**
   - Make sure your `.env` file is in the root directory
   - It should contain:
   ```
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

6. **Test the Setup**
   - Visit your website URL
   - Check if the news articles are being displayed
   - Monitor the scheduler.log file for any errors

## Troubleshooting

1. If the website shows a blank page:
   - Check if the .htaccess file is properly uploaded
   - Ensure mod_rewrite is enabled in Apache

2. If the scheduler isn't running:
   - Check the scheduler.log file for errors
   - Verify the cron job is set up correctly
   - Ensure Node.js paths are correct

3. If articles aren't updating:
   - Check the API keys in .env file
   - Verify the cron job is running (check scheduler.log)
   - Ensure proper file permissions (755 for directories, 644 for files)

## Maintenance

- Monitor scheduler.log regularly for any errors
- Keep your Node.js version up to date
- Regularly backup your articles.json file
- Check API key validity and usage limits

## Security Notes

- Keep your .env file secure and never expose it publicly
- Regularly update npm packages for security patches
- Monitor server logs for any suspicious activity
- Consider implementing rate limiting if needed
