// Universal Interactive Elements Fix for Sorro Brew
class InteractiveElementsFix {
    constructor() {
        this.init();
    }

    init() {
        this.fixAllButtons();
        this.fixAllLinks();
        this.fixAllForms();
        this.fixNavigation();
        this.addMissingEventListeners();
    }

    fixAllButtons() {
        // Fix buttons without click handlers
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            const text = button.textContent.trim().toLowerCase();
            
            // Remove existing listeners to avoid duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add appropriate click handlers
            if (text.includes('shop now') || text.includes('order')) {
                newButton.addEventListener('click', () => this.handleShopNow());
            } else if (text.includes('explore')) {
                newButton.addEventListener('click', () => this.handleExplore());
            } else if (text.includes('contact') || text.includes('submit')) {
                newButton.addEventListener('click', () => this.handleContactSubmit(newButton));
            } else if (text.includes('add to cart') || text.includes('add to order')) {
                newButton.addEventListener('click', () => this.handleAddToCart(newButton));
            }
        });
    }

    fixAllLinks() {
        // Fix links with href="#" 
        const links = document.querySelectorAll('a[href="#"]');
        links.forEach(link => {
            const text = link.textContent.trim().toLowerCase();
            
            // Remove existing listeners
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add proper navigation
            if (text.includes('our farmers')) {
                newLink.href = '../the_maicillo_journey_farmer_stories_ethical_sourcing/code.html';
            } else if (text.includes('brewing guide')) {
                newLink.href = '../sorro_brew_cafe_menu_order/code.html';
            } else if (text.includes('shop all')) {
                newLink.href = '../sorro_brew_cafe_menu_order/code.html';
            } else if (text.includes('heritage')) {
                newLink.href = '../our_story_the_sorro_brew_journey/code.html';
            } else if (text.includes('home')) {
                newLink.href = '../../index.html';
            }
        });
    }

    fixAllForms() {
        // Fix forms without validation
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Remove existing listeners
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);
            
            newForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(newForm);
            });
        });
    }

    fixNavigation() {
        // Ensure navigation script is loaded on all pages
        if (!window.navigation) {
            this.loadNavigationScript();
        }
        
        // Fix mobile menu toggle
        const mobileButtons = document.querySelectorAll('.material-symbols-outlined');
        mobileButtons.forEach(button => {
            if (button.textContent.includes('menu')) {
                button.addEventListener('click', () => this.toggleMobileMenu());
            }
        });
    }

    addMissingEventListeners() {
        // Add global error handling
        window.addEventListener('error', (e) => {
            console.error('Global error caught:', e.error);
            this.showNotification('An error occurred. Please try again.', 'error');
        });

        // Add loading state management
        window.addEventListener('beforeunload', () => {
            this.showLoadingState();
        });

        window.addEventListener('load', () => {
            this.hideLoadingState();
        });
    }

    handleShopNow() {
        // Navigate to shop or add to cart
        if (window.sorroBrewState) {
            window.location.href = '../shop.html';
        } else {
            window.location.href = 'shop.html';
        }
    }

    handleExplore() {
        // Navigate to story/journey pages
        if (window.sorroBrewState) {
            window.location.href = '../our_story_the_sorro_brew_journey/code.html';
        } else {
            window.location.href = 'our_story_the_sorro_brew_journey/code.html';
        }
    }

    handleContactSubmit(button) {
        const form = button.closest('form');
        if (!form) return;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                this.showFieldError(field, 'This field is required');
            } else {
                this.clearFieldError(field);
            }
        });
        
        if (!isValid) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailField = form.querySelector('input[type="email"], input[name="email"]');
        if (emailField && !this.isValidEmail(emailField.value)) {
            this.showFieldError(emailField, 'Please enter a valid email address');
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        this.showLoadingState();
        setTimeout(() => {
            this.hideLoadingState();
            this.showNotification('Message sent successfully! We\'ll respond within 24 hours.', 'success');
            form.reset();
        }, 1500);
    }

    handleAddToCart(button) {
        // Find product information
        const productCard = button.closest('.earth-modern-card, [class*="product"]');
        if (!productCard) {
            this.showNotification('Product information not found', 'error');
            return;
        }
        
        const productName = productCard.querySelector('h1, h2, h3, .font-bold')?.textContent || 'Sorro Brew Product';
        const priceText = productCard.querySelector('[class*="price"], [class*="\\$"]')?.textContent || '$24.99';
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        
        if (window.sorroBrewState) {
            window.sorroBrewState.addToCart({
                id: Date.now().toString(),
                name: productName,
                price: price
            });
        } else {
            // Fallback cart functionality
            let cart = JSON.parse(localStorage.getItem('sorroBrewCart') || '[]');
            cart.push({
                id: Date.now().toString(),
                name: productName,
                price: price
            });
            localStorage.setItem('sorroBrewCart', JSON.stringify(cart));
        }
        
        this.showNotification(`${productName} added to cart!`, 'success');
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    loadNavigationScript() {
        const script = document.createElement('script');
        script.src = '../navigation.js';
        script.onload = () => {
            console.log('Navigation script loaded successfully');
        };
        script.onerror = () => {
            console.error('Failed to load navigation script');
        };
        document.head.appendChild(script);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('border-red-500');
        field.classList.remove('border-[#e6e5b9]');
        
        let errorDiv = field.parentNode.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error text-red-500 text-sm mt-1';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        } else {
            errorDiv.textContent = message;
        }
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-[#e6e5b9]');
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showLoadingState() {
        const loading = document.getElementById('global-loading');
        if (!loading) {
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'global-loading';
            loadingDiv.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
            loadingDiv.innerHTML = `
                <div class="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p class="text-gray-600">Processing...</p>
                </div>
            `;
            document.body.appendChild(loadingDiv);
        }
    }

    hideLoadingState() {
        const loading = document.getElementById('global-loading');
        if (loading) {
            loading.remove();
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Auto-initialize on all pages
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveElementsFix();
});

// Export for global access
window.InteractiveElementsFix = InteractiveElementsFix;
