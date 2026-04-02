const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Optimize images for Earth Modern design performance
async function optimizeImages() {
  const directories = [
    './stitch_sorro_brew_landing_page/sorro_brew_landing_page',
    './stitch_sorro_brew_landing_page/earth_modern_heritage'
  ];

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file.match(/\.(png|jpg|jpeg|webp)$/i)) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, `optimized_${file}`);
        
        try {
          await sharp(inputPath)
            .webp({ quality: 85, effort: 4 })
            .resize(1920, 1080, { 
              fit: 'inside',
              withoutEnlargement: true 
            })
            .toFile(outputPath);
          
          console.log(`Optimized: ${file} -> optimized_${file}`);
        } catch (error) {
          console.error(`Error optimizing ${file}:`, error.message);
        }
      }
    }
  }
}

// Create optimized CSS for Earth Modern design
function generateOptimizedCSS() {
  const css = `
/* Earth Modern Design Optimizations */
:root {
  --earth-primary: #271310;
  --earth-secondary: #735c00;
  --earth-surface: #fefccf;
  --earth-accent: #ffdad4;
  --performance-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Performance optimizations */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-display: swap;
}

body {
  font-family: 'Manrope', 'Be Vietnam Pro', system-ui, sans-serif;
  font-display: swap;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Optimize images */
img {
  max-width: 100%;
  height: auto;
  loading: lazy;
  decoding: async;
}

/* Earth Modern design system */
.earth-modern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.earth-modern-card {
  background: var(--earth-surface);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: var(--performance-transition);
}

.earth-modern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
`;

  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }
  
  fs.writeFileSync('./dist/earth-modern-optimized.css', css);
  console.log('Generated optimized CSS for Earth Modern design');
}

async function main() {
  console.log('🌍 Optimizing assets for Earth Modern design...');
  
  await optimizeImages();
  generateOptimizedCSS();
  
  console.log('✅ Asset optimization complete');
}

main().catch(console.error);
