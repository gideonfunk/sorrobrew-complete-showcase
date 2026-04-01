const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Compress files for modern performance
function compressFiles() {
  const distDir = './dist';
  
  if (!fs.existsSync(distDir)) {
    console.log('Dist directory not found. Run build first.');
    return;
  }

  const files = [];
  
  // Find all files to compress
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.match(/\.(html|css|js|json|xml|txt|svg)$/i)) {
        files.push(fullPath);
      }
    });
  }
  
  scanDirectory(distDir);
  
  // Compress each file with Gzip and Brotli
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file);
      
      // Gzip compression
      const gzip = zlib.gzipSync(content, { level: 9 });
      const gzipPath = file + '.gz';
      fs.writeFileSync(gzipPath, gzip);
      
      // Brotli compression (better for modern browsers)
      const brotli = zlib.brotliCompressSync(content, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: content.length
        }
      });
      const brotliPath = file + '.br';
      fs.writeFileSync(brotliPath, brotli);
      
      const originalSize = content.length;
      const gzipSize = gzip.length;
      const brotliSize = brotli.length;
      
      const gzipReduction = ((originalSize - gzipSize) / originalSize * 100).toFixed(1);
      const brotliReduction = ((originalSize - brotliSize) / originalSize * 100).toFixed(1);
      
      console.log(`${path.relative('./dist', file)}: ${originalSize} → ${gzipSize}B (${gzipReduction}% gzip) → ${brotliSize}B (${brotliReduction}% brotli)`);
      
    } catch (error) {
      console.error(`Error compressing ${file}:`, error.message);
    }
  });
}

// Generate compression report
function generateCompressionReport() {
  const report = {
    timestamp: new Date().toISOString(),
    compression: {
      enabled: true,
      formats: ['gzip', 'brotli'],
      targetReduction: '70%+'
    },
    performance: {
      caching: '1 year for static assets',
      cdn: 'Ready for CDN deployment',
      earthModern: 'Optimized for Earth Modern design performance'
    }
  };
  
  fs.writeFileSync('./dist/compression-report.json', JSON.stringify(report, null, 2));
  console.log('Generated compression report');
}

function main() {
  console.log('🗜️ Compressing assets for maximum performance...');
  
  compressFiles();
  generateCompressionReport();
  
  console.log('✅ Compression complete. Files ready for modern web deployment.');
}

main().catch(console.error);
