// Centralized State Management for Sorro Brew E-commerce
class SorroBrewState {
    constructor() {
        this.state = {
            // User state
            user: {
                isLoggedIn: false,
                profile: null,
                preferences: {
                    theme: 'light',
                    currency: 'USD'
                }
            },
            
            // Cart state
            cart: {
                items: [],
                total: 0,
                itemCount: 0,
                isOpen: false
            },
            
            // Product catalog
            products: {
                catalog: [],
                categories: ['Original', 'Signature Horchata', 'Limited Edition'],
                filters: {
                    category: 'all',
                    priceRange: 'all',
                    sortBy: 'featured'
                },
                searchQuery: '',
                isLoading: false
            },
            
            // UI state
            ui: {
                mobileMenuOpen: false,
                searchOpen: false,
                notifications: [],
                loading: false,
                currentPage: 'home'
            },
            
            // Subscription state
            subscription: {
                isActive: false,
                plan: null,
                deliveryFrequency: 'monthly',
                nextDeliveryDate: null
            }
        };
        
        this.listeners = new Map();
        this.loadFromStorage();
        this.initializeProducts();
    }

    // State subscription system
    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
    }

    unsubscribe(key, callback) {
        if (this.listeners.has(key)) {
            const callbacks = this.listeners.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    notify(key, newValue, oldValue = null) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(callback => {
                callback(newValue, oldValue);
            });
        }
        this.saveToStorage();
    }

    // State getters
    getState(key) {
        return key ? this.state[key] : this.state;
    }

    getUser() {
        return this.state.user;
    }

    getCart() {
        return this.state.cart;
    }

    getProducts() {
        return this.state.products;
    }

    getUI() {
        return this.state.ui;
    }

    // State setters with notifications
    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        this.notify(key, value, oldValue);
    }

    // User actions
    login(userData) {
        this.setState('user', {
            ...this.state.user,
            isLoggedIn: true,
            profile: userData
        });
    }

    logout() {
        this.setState('user', {
            ...this.state.user,
            isLoggedIn: false,
            profile: null
        });
        this.clearCart();
    }

    updateUserPreferences(preferences) {
        this.setState('user', {
            ...this.state.user,
            preferences: {
                ...this.state.user.preferences,
                ...preferences
            }
        });
    }

    // Cart actions
    addToCart(product, quantity = 1) {
        const currentCart = [...this.state.cart.items];
        const existingItem = currentCart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentCart.push({
                ...product,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.updateCart(currentCart);
        this.showNotification(`${product.name} added to cart`);
    }

    removeFromCart(productId) {
        const currentCart = this.state.cart.items.filter(item => item.id !== productId);
        this.updateCart(currentCart);
    }

    updateQuantity(productId, quantity) {
        const currentCart = [...this.state.cart.items];
        const item = currentCart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.updateCart(currentCart);
        }
    }

    clearCart() {
        this.updateCart([]);
    }

    updateCart(items) {
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        this.setState('cart', {
            ...this.state.cart,
            items,
            itemCount,
            total: parseFloat(total.toFixed(2))
        });
    }

    toggleCart() {
        this.setState('cart', {
            ...this.state.cart,
            isOpen: !this.state.cart.isOpen
        });
    }

    // Product actions
    initializeProducts() {
        const mockProducts = [
            {
                id: 'sorro-original',
                name: 'Sorro Brew Original',
                description: 'Premium maicillo coffee substitute with rich, roasted flavor',
                price: 24.99,
                category: 'Original',
                image: '/images/sorro-original.jpg',
                features: ['Jitter-free energy', 'Gut-friendly', 'Antioxidant-rich'],
                inStock: true,
                rating: 4.8
            },
            {
                id: 'signature-horchata',
                name: 'Signature Maicillo Horchata',
                description: 'Traditional Salvadoran horchata with premium maicillo',
                price: 28.99,
                category: 'Signature Horchata',
                image: '/images/horchata-signature.jpg',
                features: ['Cinnamon-spiced', 'Creamy texture', 'Authentic recipe'],
                inStock: true,
                rating: 4.9
            },
            {
                id: 'limited-edition',
                name: 'Limited Edition: Volcanic Reserve',
                description: 'Exclusive maicillo from volcanic soil regions',
                price: 34.99,
                category: 'Limited Edition',
                image: '/images/volcanic-reserve.jpg',
                features: ['Rare batch', 'Volcanic minerals', 'Limited quantity'],
                inStock: true,
                rating: 5.0,
                isLimited: true
            }
        ];
        
        this.setState('products', {
            ...this.state.products,
            catalog: mockProducts
        });
    }

    filterProducts(filters) {
        let filtered = [...this.state.products.catalog];
        
        // Category filter
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }
        
        // Search filter
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.features.some(feature => feature.toLowerCase().includes(query))
            );
        }
        
        // Sort
        switch (filters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default: // featured
                filtered.sort((a, b) => {
                    if (a.isLimited) return -1;
                    if (b.isLimited) return 1;
                    return b.rating - a.rating;
                });
        }
        
        this.setState('products', {
            ...this.state.products,
            catalog: filtered
        });
    }

    // UI actions
    toggleMobileMenu() {
        this.setState('ui', {
            ...this.state.ui,
            mobileMenuOpen: !this.state.ui.mobileMenuOpen
        });
    }

    toggleSearch() {
        this.setState('ui', {
            ...this.state.ui,
            searchOpen: !this.state.ui.searchOpen
        });
    }

    setLoading(isLoading) {
        this.setState('ui', {
            ...this.state.ui,
            loading: isLoading
        });
    }

    setCurrentPage(page) {
        this.setState('ui', {
            ...this.state.ui,
            currentPage: page
        });
    }

    showNotification(message, type = 'success') {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toISOString()
        };
        
        this.setState('ui', {
            ...this.state.ui,
            notifications: [...this.state.ui.notifications, notification]
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, 3000);
    }

    removeNotification(id) {
        this.setState('ui', {
            ...this.state.ui,
            notifications: this.state.ui.notifications.filter(n => n.id !== id)
        });
    }

    // Subscription actions
    subscribeToPlan(plan, frequency = 'monthly') {
        this.setState('subscription', {
            isActive: true,
            plan,
            deliveryFrequency: frequency,
            nextDeliveryDate: this.calculateNextDelivery(frequency)
        });
        
        this.showNotification(`Subscribed to ${plan} plan!`);
    }

    updateSubscription(updates) {
        this.setState('subscription', {
            ...this.state.subscription,
            ...updates
        });
    }

    cancelSubscription() {
        this.setState('subscription', {
            isActive: false,
            plan: null,
            nextDeliveryDate: null
        });
        
        this.showNotification('Subscription cancelled');
    }

    calculateNextDelivery(frequency) {
        const now = new Date();
        const days = frequency === 'monthly' ? 30 : frequency === 'biweekly' ? 14 : 7;
        const nextDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
        return nextDate.toISOString();
    }

    // Storage persistence
    saveToStorage() {
        const dataToSave = {
            user: this.state.user,
            cart: this.state.cart,
            subscription: this.state.subscription
        };
        
        try {
            localStorage.setItem('sorroBrewState', JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Failed to save state to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('sorroBrewState');
            if (saved) {
                const parsedState = JSON.parse(saved);
                
                // Merge saved state with initial state
                this.state = {
                    ...this.state,
                    ...parsedState
                };
            }
        } catch (error) {
            console.error('Failed to load state from storage:', error);
        }
    }

    // Utility methods
    calculateSubtotal(items = this.state.cart.items) {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    calculateTax(subtotal, taxRate = 0.08) {
        return subtotal * taxRate;
    }

    calculateShipping(subtotal) {
        return subtotal >= 50 ? 0 : 5.99;
    }

    calculateTotal() {
        const subtotal = this.calculateSubtotal();
        const tax = this.calculateTax(subtotal);
        const shipping = this.calculateShipping(subtotal);
        return subtotal + tax + shipping;
    }

    // Export state for debugging
    exportState() {
        return JSON.stringify(this.state, null, 2);
    }
}

// Global state instance
export const sorroBrewState = new SorroBrewState();

// Export for global access
window.sorroBrewState = sorroBrewState;
