// Enhanced Navigation System with Mobile Support and Search
class SorroBrewNavigation {
    constructor() {
        this.isMenuOpen = false;
        this.cartItems = [];
        this.searchResults = [];
        this.init();
    }

    init() {
        this.createMobileMenu();
        this.createSearchOverlay();
        this.createCartSidebar();
        this.addEventListeners();
        this.loadCartFromStorage();
    }

    createMobileMenu() {
        const mobileMenuHTML = `
        <div id="mobile-menu" class="fixed inset-0 bg-[#271310]/95 backdrop-blur-lg z-50 hidden">
            <div class="bg-[#fefccf] h-full w-80 max-w-full shadow-2xl">
                <div class="flex justify-between items-center p-6 border-b border-[#e6e5b9]">
                    <h2 class="font-['Manrope'] text-2xl font-bold text-[#271310]">Menu</h2>
                    <button id="close-mobile-menu" class="material-symbols-outlined text-3xl text-[#735c00] hover:text-[#271310] transition-colors">close</button>
                </div>
                <nav class="p-6 space-y-6">
                    <a href="../the_maicillo_journey_farmer_stories_ethical_sourcing/code.html" class="block font-['Be_Vietnam_Pro'] text-lg text-[#504442] hover:text-[#735c00] transition-colors">Our Farmers</a>
                    <a href="../sorro_brew_cafe_menu_order/code.html" class="block font-['Be_Vietnam_Pro'] text-lg text-[#504442] hover:text-[#735c00] transition-colors">Brewing Guide</a>
                    <a href="../sorro_brew_cafe_menu_order/code.html" class="block font-['Be_Vietnam_Pro'] text-lg text-[#735c00] font-bold">Shop All</a>
                    <a href="../our_story_the_sorro_brew_journey/code.html" class="block font-['Be_Vietnam_Pro'] text-lg text-[#504442] hover:text-[#735c00] transition-colors">Heritage</a>
                    <a href="../health_benefits_comparison/code.html" class="block font-['Be_Vietnam_Pro'] text-lg text-[#504442] hover:text-[#735c00] transition-colors">Health Benefits</a>
                    <a href="../sorro_brew_contact_us_ritual_support/code.html" class="block font-['Be_Vietnam_Pro'] text-lg text-[#504442] hover:text-[#735c00] transition-colors">Contact</a>
                </nav>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    }

    createSearchOverlay() {
        const searchHTML = `
        <div id="search-overlay" class="fixed inset-0 bg-[#271310]/95 backdrop-blur-lg z-50 hidden">
            <div class="bg-[#fefccf] m-4 rounded-lg shadow-2xl max-w-2xl w-full">
                <div class="flex justify-between items-center p-6 border-b border-[#e6e5b9]">
                    <div class="flex-1 flex items-center gap-4">
                        <span class="material-symbols-outlined text-2xl text-[#735c00]">search</span>
                        <input 
                            type="text" 
                            id="search-input" 
                            placeholder="Search Sorro Brew products, stories, and more..."
                            class="flex-1 bg-transparent border-none outline-none text-lg font-['Be_Vietnam_Pro'] text-[#271310] placeholder-[#504442]"
                        >
                    </div>
                    <button id="close-search" class="material-symbols-outlined text-2xl text-[#735c00] hover:text-[#271310] transition-colors">close</button>
                </div>
                <div id="search-results" class="max-h-96 overflow-y-auto p-6">
                    <div class="text-center text-[#504442] py-8">
                        <span class="material-symbols-outlined text-4xl text-[#735c00] block mb-4">search</span>
                        <p>Start typing to search...</p>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', searchHTML);
    }

    createCartSidebar() {
        const cartHTML = `
        <div id="cart-sidebar" class="fixed right-0 top-0 h-full w-96 bg-[#fefccf] shadow-2xl z-50 transform translate-x-full transition-transform duration-300">
            <div class="flex justify-between items-center p-6 border-b border-[#e6e5b9]">
                <h2 class="font-['Manrope'] text-2xl font-bold text-[#271310]">Your Cart</h2>
                <button id="close-cart" class="material-symbols-outlined text-2xl text-[#735c00] hover:text-[#271310] transition-colors">close</button>
            </div>
            <div id="cart-items" class="flex-1 overflow-y-auto p-6">
                <div class="text-center text-[#504442] py-8">
                    <span class="material-symbols-outlined text-4xl text-[#735c00] block mb-4">shopping_bag</span>
                    <p>Your cart is empty</p>
                </div>
            </div>
            <div class="border-t border-[#e6e5b9] p-6">
                <div class="flex justify-between items-center mb-4">
                    <span class="font-['Manrope'] text-lg text-[#271310]">Total:</span>
                    <span id="cart-total" class="font-['Manrope'] text-2xl font-bold text-[#735c00]">$0.00</span>
                </div>
                <button class="w-full py-4 bg-[#735c00] text-white font-['Manrope'] font-bold rounded-lg hover:bg-[#e9c349] transition-colors">
                    Checkout
                </button>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    addEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">menu</span>';
        mobileMenuBtn.className = 'md:hidden material-symbols-outlined text-2xl text-[#271310] hover:text-[#735c00] transition-colors';
        mobileMenuBtn.id = 'mobile-menu-btn';

        // Add to existing nav
        const nav = document.querySelector('nav .flex.justify-between');
        if (nav) {
            nav.appendChild(mobileMenuBtn);
        }

        // Mobile menu events
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => this.openMobileMenu());
        document.getElementById('close-mobile-menu')?.addEventListener('click', () => this.closeMobileMenu());
        document.getElementById('mobile-menu')?.addEventListener('click', (e) => {
            if (e.target.id === 'mobile-menu') this.closeMobileMenu();
        });

        // Search functionality
        const searchBtn = document.createElement('button');
        searchBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">search</span>';
        searchBtn.className = 'material-symbols-outlined text-2xl text-[#271310] hover:text-[#735c00] transition-colors';
        searchBtn.id = 'search-btn';

        if (nav) {
            nav.appendChild(searchBtn);
        }

        document.getElementById('search-btn')?.addEventListener('click', () => this.openSearch());
        document.getElementById('close-search')?.addEventListener('click', () => this.closeSearch());
        document.getElementById('search-input')?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Cart functionality
        document.querySelectorAll('[data-icon="shopping_bag"]').forEach(btn => {
            btn.addEventListener('click', () => this.openCart());
        });

        document.getElementById('close-cart')?.addEventListener('click', () => this.closeCart());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
                this.closeSearch();
                this.closeCart();
            }
        });
    }

    openMobileMenu() {
        document.getElementById('mobile-menu')?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        document.getElementById('mobile-menu')?.classList.add('hidden');
        document.body.style.overflow = '';
    }

    openSearch() {
        document.getElementById('search-overlay')?.classList.remove('hidden');
        document.getElementById('search-input')?.focus();
        document.body.style.overflow = 'hidden';
    }

    closeSearch() {
        document.getElementById('search-overlay')?.classList.add('hidden');
        document.getElementById('search-input').value = '';
        document.body.style.overflow = '';
    }

    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        cartSidebar?.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        cartSidebar?.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }

    handleSearch(query) {
        const searchResults = document.getElementById('search-results');
        
        if (query.length < 2) {
            searchResults.innerHTML = `
                <div class="text-center text-[#504442] py-8">
                    <span class="material-symbols-outlined text-4xl text-[#735c00] block mb-4">search</span>
                    <p>Start typing to search...</p>
                </div>
            `;
            return;
        }

        // Mock search results
        const mockResults = [
            { title: 'Sorro Brew Original', type: 'Product', url: '../sorro_brew_cafe_menu_order/code.html' },
            { title: 'Maicillo Horchata', type: 'Product', url: '../sorro_brew_menu_signature_maicillo_horchata/code.html' },
            { title: 'Our Story', type: 'Story', url: '../our_story_the_sorro_brew_journey/code.html' },
            { title: 'Health Benefits', type: 'Information', url: '../health_benefits_comparison/code.html' },
            { title: 'Contact Us', type: 'Support', url: '../sorro_brew_contact_us_ritual_support/code.html' }
        ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

        if (mockResults.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center text-[#504442] py-8">
                    <span class="material-symbols-outlined text-4xl text-[#735c00] block mb-4">search_off</span>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = mockResults.map(result => `
            <a href="${result.url}" class="block p-4 hover:bg-[#f8f6c9] rounded-lg transition-colors">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-['Manrope'] font-bold text-[#271310]">${result.title}</h3>
                        <span class="text-sm text-[#735c00]">${result.type}</span>
                    </div>
                    <span class="material-symbols-outlined text-[#504442]">arrow_forward</span>
                </div>
            </a>
        `).join('');
    }

    addToCart(product) {
        this.cartItems.push(product);
        this.updateCartUI();
        this.saveCartToStorage();
        this.showNotification('Added to cart!');
    }

    removeFromCart(index) {
        this.cartItems.splice(index, 1);
        this.updateCartUI();
        this.saveCartToStorage();
    }

    updateCartUI() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (this.cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center text-[#504442] py-8">
                    <span class="material-symbols-outlined text-4xl text-[#735c00] block mb-4">shopping_bag</span>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '$0.00';
            return;
        }

        const total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
        
        cartItemsContainer.innerHTML = this.cartItems.map((item, index) => `
            <div class="flex justify-between items-center p-4 border-b border-[#e6e5b9]">
                <div>
                    <h4 class="font-['Manrope'] font-bold text-[#271310]">${item.name}</h4>
                    <p class="text-[#504442]">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="navigation.removeFromCart(${index})" class="material-symbols-outlined text-[#735c00] hover:text-[#271310] transition-colors">remove</button>
            </div>
        `).join('');
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    saveCartToStorage() {
        localStorage.setItem('sorroBrewCart', JSON.stringify(this.cartItems));
    }

    loadCartFromStorage() {
        const saved = localStorage.getItem('sorroBrewCart');
        if (saved) {
            this.cartItems = JSON.parse(saved);
            this.updateCartUI();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-[#735c00] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize enhanced navigation
const navigation = new SorroBrewNavigation();

// Export for global access
window.navigation = navigation;
