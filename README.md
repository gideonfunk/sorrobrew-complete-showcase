# Sorro Brew Landing Page - Earth Modern Design

A heritage-rich, performance-optimized landing page for Sorro Brew - the premium Salvadoran maicillo coffee substitute featuring Earth Modern design aesthetics.

## 🌍 Earth Modern Design Features

- **Natural Color Palette**: Earth tones inspired by Salvadoran volcanic soil
- **Performance Optimized**: Sub-2 second load times with modern compression
- **Responsive Design**: Flawless experience across all devices
- **Typography**: Manrope and Be Vietnam Pro for modern readability
- **Micro-interactions**: Subtle animations enhancing user experience

## 🚀 Quick Start with Windsurf

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Opens live preview at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build:prod
```
Creates optimized production build in `./dist`

### 4. Preview Production Build
```bash
npm run preview
```
Opens production preview at `http://localhost:3001`

## 📦 Deployment

### Vercel (Recommended)
```bash
npm run deploy:vercel
```

### Netlify
```bash
npm run deploy:netlify
```

## 🔧 Build Process

The build pipeline includes:

1. **Asset Optimization**: Images converted to WebP with optimal compression
2. **HTML Minification**: Remove unnecessary characters and whitespace
3. **CSS Optimization**: Earth Modern design system with critical CSS
4. **Compression**: Gzip and Brotli compression for all assets
5. **SEO Generation**: Automatic sitemap and robots.txt

## 🎨 Earth Modern Design System

### Color Variables
```css
--earth-primary: #271310;
--earth-secondary: #735c00;
--earth-surface: #fefccf;
--earth-accent: #ffdad4;
```

### Performance Features
- Font display swap for faster text rendering
- Lazy loading for images
- Optimized animations with CSS transforms
- Critical CSS inlining

## 📁 Project Structure

```
stitch_sorro_brew_landing_page/
├── stitch_sorro_brew_landing_page/
│   └── sorro_brew_landing_page/
│       ├── code.html              # Main landing page
│       └── screen.png              # Design reference
├── scripts/
│   ├── optimize-assets.js          # Image and CSS optimization
│   ├── generate-dist.js            # Build process
│   └── compress-assets.js          # Gzip/Brotli compression
├── dist/                           # Production build output
├── package.json                    # Dependencies and scripts
├── vercel.json                     # Vercel configuration
├── netlify.toml                    # Netlify configuration
└── README.md                       # This file
```

## 🌐 Environment Setup

1. Copy `.env.example` to `.env`
2. Update environment variables as needed
3. Configure analytics and API keys if required

## 🎯 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔍 SEO Optimization

- Semantic HTML5 structure
- Meta tags for social sharing
- Structured data for search engines
- Optimized images with alt text
- XML sitemap generation

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 🤝 Contributing

1. Follow Earth Modern design principles
2. Ensure performance standards are met
3. Test on multiple devices and browsers
4. Maintain semantic HTML structure

---

**Break up with coffee, not your morning.** ☕🌍
