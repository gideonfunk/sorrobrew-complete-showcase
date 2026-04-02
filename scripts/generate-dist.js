const fs = require('fs');
const path = require('path');

// Create distribution folder structure
function createDistStructure() {
  const dirs = [
    './dist',
    './dist/assets',
    './dist/components',
    './dist/styles'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}

// Copy and process HTML files
function processHTMLFiles() {
  const sourceDir = './stitch_sorro_brew_landing_page/sorro_brew_landing_page';
  const targetDir = './dist';

  if (!fs.existsSync(sourceDir)) {
    console.log('Source directory not found, skipping HTML processing');
    return;
  }

  // Copy main HTML file
  const sourceHTML = path.join(sourceDir, 'code.html');
  const targetHTML = path.join(targetDir, 'index.html');

  if (fs.existsSync(sourceHTML)) {
    let htmlContent = fs.readFileSync(sourceHTML, 'utf8');
    
    // Add optimized CSS reference
    const cssLink = '<link rel="stylesheet" href="./styles/earth-modern-optimized.css">';
    htmlContent = htmlContent.replace('</head>', `${cssLink}\n</head>`);
    
    // Add performance optimizations
    const performanceMeta = `
<meta name="theme-color" content="#fefccf">
<meta name="description" content="Sorro Brew - Premium Salvadoran maicillo coffee substitute. Heritage-rich, caffeine-free morning ritual with Earth Modern design.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
`;
    
    htmlContent = htmlContent.replace('<head>', `<head>\n${performanceMeta}`);
    
    fs.writeFileSync(targetHTML, htmlContent);
    console.log('Processed and optimized HTML file');
  }
}

// Copy assets
function copyAssets() {
  const sourceDir = './stitch_sorro_brew_landing_page/sorro_brew_landing_page';
  const targetDir = './dist/assets';

  if (!fs.existsSync(sourceDir)) return;

  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    if (file.match(/\.(png|jpg|jpeg|webp|svg|ico)$/i)) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied asset: ${file}`);
      }
    }
  });
}

// Generate sitemap for SEO
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sorrobrew.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  fs.writeFileSync('./dist/sitemap.xml', sitemap);
  console.log('Generated sitemap.xml');
}

// Generate robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://sorrobrew.com/sitemap.xml`;

  fs.writeFileSync('./dist/robots.txt', robots);
  console.log('Generated robots.txt');
}

function main() {
  console.log('📦 Generating distribution files...');
  
  createDistStructure();
  processHTMLFiles();
  copyAssets();
  generateSitemap();
  generateRobots();
  
  console.log('✅ Distribution generation complete');
  console.log('🚀 Ready for deployment with Earth Modern optimizations');
}

main().catch(console.error);
