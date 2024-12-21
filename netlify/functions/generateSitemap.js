import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import prettier from 'prettier';

const WEBSITE_URL = process.env.URL || 'https://yourdomain.com'; // Netlify automatically sets the URL environment variable

async function generateSitemap() {
    try {
        // Get all HTML files from the publish directory
        const publishDir = path.join(process.cwd(), 'public');
        const pages = await glob('**/*.html', {
            cwd: publishDir,
            ignore: ['node_modules/**', 'scripts/**']
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages.map(page => {
                const stats = fs.statSync(path.join(publishDir, page));
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
        fs.writeFileSync(path.join(publishDir, 'sitemap.xml'), formattedSitemap);
        return { statusCode: 200, body: 'Sitemap generated successfully!' };
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return { statusCode: 500, body: 'Error generating sitemap: ' + error.message };
    }
}

// Handler for scheduled event
export const handler = async (event) => {
    if (event.type === 'scheduled') {
        return await generateSitemap();
    }
    return { statusCode: 400, body: 'Invalid event type' };
};
