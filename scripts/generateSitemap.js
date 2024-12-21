import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import prettier from 'prettier';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your website URL
const WEBSITE_URL = 'https://yourdomain.com'; // Replace with your actual domain

async function generateSitemap() {
    // Get all HTML files
    const pages = await glob('**/*.html', {
        cwd: path.join(__dirname, '../'),
        ignore: ['node_modules/**', 'scripts/**']
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages.map(page => {
            const stats = fs.statSync(path.join(__dirname, '../', page));
            const lastmod = stats.mtime.toISOString().split('T')[0];
            const url = page === 'index.html' ? '' : page.replace('.html', '');
            
            return `
            <url>
                <loc>${WEBSITE_URL}/${url}</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>${page === 'index.html' ? 'daily' : 'weekly'}</changefreq>
                <priority>${page === 'index.html' ? '1.0' : '0.8'}</priority>
            </url>`;
        }).join('')}
    </urlset>`;

    // Format the XML
    const formattedSitemap = await prettier.format(sitemap, { parser: 'html' });

    // Write to file
    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), formattedSitemap);
    console.log('Sitemap generated successfully!');
}

// Generate sitemap
generateSitemap().catch(console.error);

// Export for use in other files if needed
export default generateSitemap;
