// SEO Enhancements for Sorro Brew
class SorroBrewSEO {
    constructor() {
        this.init();
    }

    init() {
        this.addDynamicMetaTags();
        this.addStructuredData();
        this.addOpenGraphTags();
        this.addTwitterCardTags();
        this.addBreadcrumbSchema();
        this.trackPageViews();
    }

    addDynamicMetaTags() {
        const currentPath = window.location.pathname;
        const pageTitle = this.getPageTitle(currentPath);
        const pageDescription = this.getPageDescription(currentPath);
        
        // Update page title
        document.title = pageTitle;
        
        // Update or create meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = pageDescription;
        
        // Add keywords
        let keywords = document.querySelector('meta[name="keywords"]');
        if (!keywords) {
            keywords = document.createElement('meta');
            keywords.name = 'keywords';
            document.head.appendChild(keywords);
        }
        keywords.content = 'Sorro Brew, maicillo, sorghum, coffee substitute, Salvadoran, caffeine-free, wellness, heritage coffee, natural energy';
    }

    getPageTitle(path) {
        const titles = {
            '/': 'Sorro Brew | Salvadoran Heritage Coffee Substitute',
            '/index.html': 'Sorro Brew | Salvadoran Heritage Coffee Substitute',
            '/stitch_sorro_brew_landing_page/sorro_brew_landing_page/code.html': 'Sorro Brew | Premium Maicillo Coffee Alternative',
            '/stitch_sorro_brew_landing_page/our_story_the_sorro_brew_journey/code.html': 'Our Story | Sorro Brew Heritage Journey',
            '/stitch_sorro_brew_landing_page/sorro_brew_cafe_menu_order/code.html': 'Menu & Order | Sorro Brew Cafe',
            '/stitch_sorro_brew_landing_page/health_benefits_comparison/code.html': 'Health Benefits | Sorro Brew vs Coffee',
            '/stitch_sorro_brew_landing_page/sorro_brew_contact_us_ritual_support/code.html': 'Contact Us | Sorro Brew Support'
        };
        
        return titles[path] || 'Sorro Brew | Salvadoran Heritage Coffee Substitute';
    }

    getPageDescription(path) {
        const descriptions = {
            '/': 'Break up with coffee, not your morning. Sorro Brew offers premium Salvadoran maicillo coffee substitute with rich, roasted flavor and natural energy.',
            '/index.html': 'Break up with coffee, not your morning. Sorro Brew offers premium Salvadoran maicillo coffee substitute with rich, roasted flavor and natural energy.',
            '/stitch_sorro_brew_landing_page/sorro_brew_landing_page/code.html': 'Discover Sorro Brew, the premium Salvadoran maicillo coffee substitute. Rich, roasted flavor without caffeine jitters or acidity.',
            '/stitch_sorro_brew_landing_page/our_story_the_sorro_brew_journey/code.html': 'Learn about Sorro Brew\'s journey from Salvadoran volcanic soil to your morning cup. Direct trade, sustainable farming.',
            '/stitch_sorro_brew_landing_page/sorro_brew_cafe_menu_order/code.html': 'Order Sorro Brew products online. Premium maicillo coffee substitute with fast shipping.',
            '/stitch_sorro_brew_landing_page/health_benefits_comparison/code.html': 'Compare Sorro Brew health benefits vs traditional coffee. Jitter-free energy, gut-friendly, antioxidant-rich.',
            '/stitch_sorro_brew_landing_page/sorro_brew_contact_us_ritual_support/code.html': 'Contact Sorro Brew for support, questions, or wholesale inquiries. We\'re here to help.'
        };
        
        return descriptions[path] || 'Sorro Brew - Premium Salvadoran maicillo coffee substitute with rich heritage flavor.';
    }

    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sorro Brew",
            "description": "Premium Salvadoran maicillo coffee substitute with rich heritage flavor",
            "url": "https://sorrobrew.com",
            "logo": "https://sorrobrew.com/logo.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-SORRO",
                "contactType": "customer service"
            },
            "sameAs": [
                "https://instagram.com/sorrobrew",
                "https://facebook.com/sorrobrew"
            ],
            "product": [
                {
                    "@type": "Product",
                    "name": "Sorro Brew Original",
                    "description": "Premium maicillo coffee substitute with rich, roasted flavor",
                    "category": "Beverage",
                    "offers": {
                        "@type": "Offer",
                        "price": "24.99",
                        "priceCurrency": "USD"
                    }
                }
            ]
        };

        // Remove existing structured data
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Add new structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }

    addOpenGraphTags() {
        const ogTags = [
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: this.getPageTitle(window.location.pathname) },
            { property: 'og:description', content: this.getPageDescription(window.location.pathname) },
            { property: 'og:url', content: window.location.href },
            { property: 'og:image', content: 'https://sorrobrew.com/og-image.jpg' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:site_name', content: 'Sorro Brew' }
        ];

        ogTags.forEach(tag => {
            let meta = document.querySelector(`meta[property="${tag.property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', tag.property);
                document.head.appendChild(meta);
            }
            meta.content = tag.content;
        });
    }

    addTwitterCardTags() {
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: this.getPageTitle(window.location.pathname) },
            { name: 'twitter:description', content: this.getPageDescription(window.location.pathname) },
            { name: 'twitter:image', content: 'https://sorrobrew.com/twitter-image.jpg' },
            { name: 'twitter:site', content: '@sorrobrew' }
        ];

        twitterTags.forEach(tag => {
            let meta = document.querySelector(`meta[name="${tag.name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = tag.name;
                document.head.appendChild(meta);
            }
            meta.content = tag.content;
        });
    }

    addBreadcrumbSchema() {
        const currentPath = window.location.pathname;
        const breadcrumbs = this.generateBreadcrumbs(currentPath);
        
        if (breadcrumbs.length > 1) {
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": crumb.name,
                    "item": crumb.url
                }))
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbSchema, null, 2);
            document.head.appendChild(script);
        }
    }

    generateBreadcrumbs(path) {
        const pathSegments = path.split('/').filter(segment => segment);
        const breadcrumbs = [{ name: 'Home', url: '/' }];
        
        let currentPath = '';
        pathSegments.forEach(segment => {
            currentPath += '/' + segment;
            const name = this.formatBreadcrumbName(segment);
            breadcrumbs.push({ name, url: currentPath });
        });
        
        return breadcrumbs;
    }

    formatBreadcrumbName(segment) {
        const names = {
            'stitch_sorro_brew_landing_page': 'Design Variations',
            'sorro_brew_landing_page': 'Main Landing',
            'our_story_the_sorro_brew_journey': 'Our Story',
            'sorro_brew_cafe_menu_order': 'Menu & Order',
            'health_benefits_comparison': 'Health Benefits',
            'sorro_brew_contact_us_ritual_support': 'Contact',
            'code.html': 'Page'
        };
        
        return names[segment] || segment.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    trackPageViews() {
        // Simple analytics tracking
        const pageData = {
            page: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        // Store in localStorage for demo (in production, send to analytics service)
        let pageViews = JSON.parse(localStorage.getItem('sorroBrewPageViews') || '[]');
        pageViews.push(pageData);
        
        // Keep only last 100 page views
        if (pageViews.length > 100) {
            pageViews = pageViews.slice(-100);
        }
        
        localStorage.setItem('sorroBrewPageViews', JSON.stringify(pageViews));
        
        // Add page view indicator
        this.addPageViewIndicator();
    }

    addPageViewIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'fixed bottom-4 left-4 bg-[#735c00] text-white px-3 py-1 rounded-full text-xs font-["Manrope"] z-50 opacity-75';
        indicator.textContent = 'Page tracked';
        indicator.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }, 2000);
    }
}

// Initialize SEO enhancements
const seo = new SorroBrewSEO();

// Export for global access
window.SorroBrewSEO = SorroBrewSEO;
