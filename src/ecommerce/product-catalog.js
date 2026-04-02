// Product Catalog Component with State Integration
import { sorroBrewState } from '../state-management.js';
import { EARTH_MODERN } from '../../config/design-tokens.js';

class ProductCatalog {
    constructor() {
        this.container = null;
        this.filters = {
            category: 'all',
            searchQuery: '',
            sortBy: 'featured'
        };
        this.init();
    }

    init() {
        this.createCatalogHTML();
        this.bindEvents();
        this.loadProducts();
    }

    createCatalogHTML() {
        const catalogHTML = `
        <div id="product-catalog" class="min-h-screen bg-[${EARTH_MODERN.colors.surface}]">
            <!-- Catalog Header -->
            <header class="sticky top-0 bg-[${EARTH_MODERN.colors.surface}] backdrop-blur-lg z-40 border-b border-[${EARTH_MODERN.colors.outlineVariant}]">
                <div class="max-w-screen-2xl mx-auto px-6 py-4">
                    <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <!-- Search Bar -->
                        <div class="relative flex-1 max-w-2xl">
                            <input 
                                type="text" 
                                id="catalog-search"
                                placeholder="Search Sorro Brew products..."
                                class="w-full px-4 py-3 pl-12 bg-[${EARTH_MODERN.colors.surfaceContainerLow}] rounded-lg border border-[${EARTH_MODERN.colors.outlineVariant}] focus:outline-none focus:ring-2 focus:ring-[${EARTH_MODERN.colors.secondary}] font-['Be_Vietnam_Pro'] text-[${EARTH_MODERN.colors.onSurface}] placeholder-[${EARTH_MODERN.colors.onSurfaceVariant}]"
                            >
                            <span class="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-[${EARTH_MODERN.colors.secondary}]">search</span>
                        </div>
                        
                        <!-- Filters -->
                        <div class="flex gap-4 items-center">
                            <select id="category-filter" class="px-4 py-3 bg-[${EARTH_MODERN.colors.surfaceContainerLow}] rounded-lg border border-[${EARTH_MODERN.colors.outlineVariant}] font-['Be_Vietnam_Pro'] text-[${EARTH_MODERN.colors.onSurface}]">
                                <option value="all">All Products</option>
                                <option value="Original">Original</option>
                                <option value="Signature Horchata">Signature Horchata</option>
                                <option value="Limited Edition">Limited Edition</option>
                            </select>
                            
                            <select id="sort-filter" class="px-4 py-3 bg-[${EARTH_MODERN.colors.surfaceContainerLow}] rounded-lg border border-[${EARTH_MODERN.colors.outlineVariant}] font-['Be_Vietnam_Pro'] text-[${EARTH_MODERN.colors.onSurface}]">
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Products Grid -->
            <main class="max-w-screen-2xl mx-auto px-6 py-8">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="font-['Manrope'] text-3xl font-bold text-[${EARTH_MODERN.colors.primary}]">Sorro Brew Products</h1>
                    <div class="text-[${EARTH_MODERN.colors.onSurfaceVariant}]">
                        <span id="product-count">0</span> products found
                    </div>
                </div>
                
                <!-- Loading State -->
                <div id="loading-state" class="hidden">
                    <div class="flex justify-center items-center py-20">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[${EARTH_MODERN.colors.secondary}]"></div>
                    </div>
                </div>
                
                <!-- Products Grid -->
                <div id="products-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Products will be inserted here -->
                </div>
                
                <!-- Empty State -->
                <div id="empty-state" class="hidden text-center py-20">
                    <span class="material-symbols-outlined text-6xl text-[${EARTH_MODERN.colors.secondary}] block mb-4">search_off</span>
                    <h3 class="font-['Manrope'] text-xl font-bold text-[${EARTH_MODERN.colors.primary}] mb-2">No products found</h3>
                    <p class="text-[${EARTH_MODERN.colors.onSurfaceVariant}]">Try adjusting your filters or search terms</p>
                </div>
            </main>
        </div>
        `;

        document.body.innerHTML = catalogHTML;
        this.container = document.getElementById('product-catalog');
    }

    bindEvents() {
        // Search input
        const searchInput = document.getElementById('catalog-search');
        searchInput.addEventListener('input', (e) => {
            this.filters.searchQuery = e.target.value;
            this.applyFilters();
        });

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFilters();
        });

        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        sortFilter.addEventListener('change', (e) => {
            this.filters.sortBy = e.target.value;
            this.applyFilters();
        });

        // Subscribe to state changes
        sorroBrewState.subscribe('products', (products) => {
            this.renderProducts(products.catalog);
            this.updateProductCount(products.catalog.length);
        });

        sorroBrewState.subscribe('ui', (ui) => {
            this.toggleLoading(ui.loading);
        });
    }

    loadProducts() {
        sorroBrewState.setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            sorroBrewState.filterProducts(this.filters);
            sorroBrewState.setLoading(false);
        }, 500);
    }

    applyFilters() {
        sorroBrewState.setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            sorroBrewState.filterProducts(this.filters);
            sorroBrewState.setLoading(false);
        }, 300);
    }

    renderProducts(products) {
        const grid = document.getElementById('products-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (products.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        
        grid.innerHTML = products.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to new elements
        this.bindProductEvents();
    }

    createProductCard(product) {
        const isInCart = sorroBrewState.getCart().items.some(item => item.id === product.id);
        
        return `
            <div class="earth-modern-card group relative overflow-hidden" data-product-id="${product.id}">
                <!-- Limited Edition Badge -->
                ${product.isLimited ? `
                    <div class="absolute top-4 right-4 z-10 bg-[${EARTH_MODERN.colors.secondary}] text-white px-3 py-1 rounded-full text-xs font-['Manrope'] font-bold">
                        Limited
                    </div>
                ` : ''}
                
                <!-- Product Image -->
                <div class="relative h-64 bg-[${EARTH_MODERN.colors.surfaceContainerLow}] overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    
                    <!-- Quick Actions -->
                    <div class="absolute inset-0 bg-[rgba(39,19,16,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <button onclick="window.quickView('${product.id}')" class="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                            <span class="material-symbols-outlined">visibility</span>
                        </button>
                        <button onclick="window.addToWishlist('${product.id}')" class="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                            <span class="material-symbols-outlined">favorite_border</span>
                        </button>
                    </div>
                </div>
                
                <!-- Product Info -->
                <div class="p-6">
                    <!-- Category & Rating -->
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs font-['Manrope'] uppercase tracking-wider text-[${EARTH_MODERN.colors.secondary}]">${product.category}</span>
                        <div class="flex items-center gap-1">
                            ${this.renderStars(product.rating)}
                            <span class="text-sm text-[${EARTH_MODERN.colors.onSurfaceVariant}]">(${product.rating})</span>
                        </div>
                    </div>
                    
                    <!-- Product Name -->
                    <h3 class="font-['Manrope'] text-xl font-bold text-[${EARTH_MODERN.colors.primary}] mb-2 line-clamp-2">${product.name}</h3>
                    
                    <!-- Description -->
                    <p class="text-[${EARTH_MODERN.colors.onSurfaceVariant}] mb-4 line-clamp-3">${product.description}</p>
                    
                    <!-- Features -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${product.features.map(feature => `
                            <span class="px-2 py-1 bg-[${EARTH_MODERN.colors.surfaceContainerLow}] text-xs font-['Manrope'] text-[${EARTH_MODERN.colors.secondary}] rounded">
                                ${feature}
                            </span>
                        `).join('')}
                    </div>
                    
                    <!-- Price & Actions -->
                    <div class="flex justify-between items-end">
                        <div>
                            <div class="text-2xl font-['Manrope'] font-bold text-[${EARTH_MODERN.colors.primary}]">$${product.price}</div>
                            ${product.inStock ? `
                                <div class="text-sm text-green-600 font-['Be_Vietnam_Pro']">In Stock</div>
                            ` : `
                                <div class="text-sm text-red-600 font-['Be_Vietnam_Pro']">Out of Stock</div>
                            `}
                        </div>
                        
                        <div class="flex gap-2">
                            <button 
                                onclick="window.addToCart('${product.id}')"
                                ${isInCart ? 'disabled' : ''}
                                class="px-6 py-3 bg-[${EARTH_MODERN.colors.secondary}] text-white font-['Manrope'] font-bold rounded-lg hover:bg-[${EARTH_MODERN.colors.secondaryFixed}] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ${isInCart ? 'In Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="material-symbols-outlined text-yellow-500 text-sm">star</span>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<span class="material-symbols-outlined text-yellow-500 text-sm">star_half</span>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="material-symbols-outlined text-gray-300 text-sm">star_outline</span>';
        }
        
        return stars;
    }

    bindProductEvents() {
        // Add hover effects
        const productCards = document.querySelectorAll('[data-product-id]');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    updateProductCount(count) {
        const countElement = document.getElementById('product-count');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    toggleLoading(isLoading) {
        const loadingState = document.getElementById('loading-state');
        const productsGrid = document.getElementById('products-grid');
        
        if (isLoading) {
            loadingState.classList.remove('hidden');
            productsGrid.classList.add('hidden');
        } else {
            loadingState.classList.add('hidden');
            productsGrid.classList.remove('hidden');
        }
    }
}

// Global functions for button onclick handlers
window.addToCart = (productId) => {
    const product = sorroBrewState.getProducts().catalog.find(p => p.id === productId);
    if (product) {
        sorroBrewState.addToCart(product);
    }
};

window.addToWishlist = (productId) => {
    sorroBrewState.showNotification('Added to wishlist!');
};

window.quickView = (productId) => {
    sorroBrewState.showNotification('Quick view coming soon!');
};

// Initialize catalog when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProductCatalog();
});
