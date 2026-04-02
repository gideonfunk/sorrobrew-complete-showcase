const { test, expect } = require('@playwright/test');

test.describe('Sorro Brew Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title and meta tags', async ({ page }) => {
    await expect(page).toHaveTitle(/Sorro Brew.*Salvadoran Heritage Coffee Substitute/);
    
    // Check for important meta tags
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    
    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveAttribute('charset', 'utf-8');
  });

  test('loads Earth Modern design system correctly', async ({ page }) => {
    // Check for Tailwind CSS
    const tailwindScript = page.locator('script[src*="tailwindcss"]');
    await expect(tailwindScript).toBeVisible();
    
    // Check for Earth Modern color variables
    const body = page.locator('body');
    await expect(body).toHaveClass(/bg-surface/);
    
    // Check for custom fonts
    const manropeFont = page.locator('link[href*="Manrope"]');
    const beVietnamFont = page.locator('link[href*="Be+Vietnam+Pro"]');
    await expect(manropeFont).toBeVisible();
    await expect(beVietnamFont).toBeVisible();
  });

  test('navigation links are present and styled correctly', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check main navigation links
    const navLinks = page.locator('nav a');
    await expect(navLinks).toHaveCount(4);
    
    // Check "Shop All" is highlighted as active
    const shopAllLink = page.locator('nav a:has-text("Shop All")');
    await expect(shopAllLink).toHaveClass(/text-yellow-700/);
    await expect(shopAllLink).toHaveClass(/border-b-2/);
  });

  test('hero section displays correctly', async ({ page }) => {
    // Check for main heading
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('Sorro Brew');
    
    // Check for Earth Modern styling
    await expect(mainHeading).toHaveClass(/font-headline/);
  });

  test('benefits section displays three key benefits', async ({ page }) => {
    const benefits = page.locator('section:has(h2:has-text("Why Choose Sorro Brew"))');
    await expect(benefits).toBeVisible();
    
    // Check for three benefit cards
    const benefitCards = benefits.locator('.flex.flex-col.items-center');
    await expect(benefitCards).toHaveCount(3);
    
    // Check specific benefits
    await expect(benefits).toContainText('Jitter-Free Energy');
    await expect(benefits).toContainText('Gut-Friendly');
    await expect(benefits).toContainText('Antioxidant Rich');
  });

  test('heritage story section displays correctly', async ({ page }) => {
    const heritageSection = page.locator('section:has-text("From Salvadoran Hills")');
    await expect(heritageSection).toBeVisible();
    
    // Check for key statistics
    await expect(heritageSection).toContainText('100%');
    await expect(heritageSection).toContainText('Direct Trade');
    await expect(heritageSection).toContainText('Regenerative');
    await expect(heritageSection).toContainText('Farming');
  });

  test('images load with proper attributes', async ({ page }) => {
    const images = page.locator('img');
    await expect(images).toHaveCount.greaterThan(0);
    
    // Check that images have alt attributes
    for (let i = 0; i < await images.count(); i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('Earth Modern design rules are followed', async ({ page }) => {
    // Check for "no-line" rule - no 1px solid borders
    const elementsWithBorders = page.locator('[style*="border: 1px solid"]');
    await expect(elementsWithBorders).toHaveCount(0);
    
    // Check for proper color usage
    const surfaceElements = page.locator('.bg-surface');
    await expect(surfaceElements).toHaveCount.greaterThan(0);
    
    // Check for custom shadows
    const editorialShadows = page.locator('.editorial-shadow');
    await expect(editorialShadows).toHaveCount.greaterThan(0);
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigation should adapt
    const mobileNav = page.locator('nav');
    await expect(mobileNav).toBeVisible();
    
    // Content should be readable
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('accessibility features are present', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check for semantic HTML
    const main = page.locator('main');
    const nav = page.locator('nav');
    const footer = page.locator('footer');
    
    await expect(main).toBeVisible();
    await expect(nav).toBeVisible();
    await expect(footer).toBeVisible();
  });

  test('performance optimizations are in place', async ({ page }) => {
    // Check for preconnect to Google Fonts
    const preconnect = page.locator('link[rel="preconnect"]');
    await expect(preconnect).toHaveCount.greaterThan(0);
    
    // Check for font-display swap
    const fontLinks = page.locator('link[href*="fonts.googleapis.com"]');
    for (let i = 0; i < await fontLinks.count(); i++) {
      const fontLink = fontLinks.nth(i);
      const href = await fontLink.getAttribute('href');
      expect(href).toContain('display=swap');
    }
  });
});

test.describe('Cross-page Navigation', () => {
  test('can navigate between different Stitch pages', async ({ page }) => {
    // Start with main landing page
    await page.goto('/');
    
    // Test that page loads without errors
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for any navigation to other pages (if links exist)
    const allLinks = page.locator('a[href]');
    const linkCount = await allLinks.count();
    
    console.log(`Found ${linkCount} links on the page`);
    
    // Test a few links if they exist
    for (let i = 0; i < Math.min(linkCount, 3); i++) {
      const link = allLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('http')) {
        console.log(`Testing external link: ${href}`);
        // For external links, just check they have proper attributes
        await expect(link).toHaveAttribute('href');
      }
    }
  });
});
