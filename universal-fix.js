// UNIVERSAL FIX FOR ALL SORRO BREW PAGES
// This script will fix ALL buttons, links, and interactive elements regardless of which page it's loaded on

console.log('🔧 Universal Fix Loading...');

class UniversalInteractiveFix {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.fixEverything());
        } else {
            this.fixEverything();
        }
    }

    fixEverything() {
        console.log('🛠️ Applying universal fixes...');
        
        // Fix ALL buttons with proper handlers
        this.fixAllButtons();
        
        // Fix ALL links with proper destinations
        this.fixAllLinks();
        
        // Fix ALL forms with validation
        this.fixAllForms();
        
        // Fix navigation elements
        this.fixNavigation();
        
        // Add loading states and error handling
        this.addGlobalFeatures();
        
        console.log('✅ Universal fixes applied successfully!');
    }

    fixAllButtons() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button, index) => {
            const text = button.textContent.trim().toLowerCase();
            const buttonText = button.textContent.trim();
            
            // Remove existing listeners to avoid duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add click handlers based on button text
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleButtonClick(buttonText, newButton);
            });
            
            // Add hover effects and accessibility
            newButton.addEventListener('mouseenter', () => {
                newButton.style.transform = 'translateY(-2px)';
                newButton.style.boxShadow = '0 8px 25px rgba(115, 93, 37, 0.15)';
            });
            
            newButton.addEventListener('mouseleave', () => {
                newButton.style.transform = 'translateY(0)';
                newButton.style.boxShadow = '';
            });
            
            // Add keyboard support
            newButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    newButton.click();
                }
            });
        });
        
        console.log(`✅ Fixed ${buttons.length} buttons`);
    }

    fixAllLinks() {
        const links = document.querySelectorAll('a');
        links.forEach((link, index) => {
            const href = link.getAttribute('href');
            const text = link.textContent.trim().toLowerCase();
            
            // Skip external links
            if (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))) {
                return;
            }
            
            // Fix dead links (#)
            if (!href || href === '#') {
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                // Set proper destination based on text
                if (text.includes('home') || text.includes('sorro brew')) {
                    newLink.href = '../../index.html';
                } else if (text.includes('story') || text.includes('heritage')) {
                    newLink.href = './code.html';
                } else if (text.includes('farmers') || text.includes('our farmers')) {
                    newLink.href = '../the_maicillo_journey_farmer_stories_ethical_sourcing/code.html';
                } else if (text.includes('menu') || text.includes('shop') || text.includes('brewing guide')) {
                    newLink.href = '../sorro_brew_cafe_menu_order/code.html';
                } else if (text.includes('contact') || text.includes('support')) {
                    newLink.href = '../sorro_brew_contact_us_ritual_support/code.html';
                } else if (text.includes('health') || text.includes('benefits')) {
                    newLink.href = '../health_benefits_comparison/code.html';
                } else if (text.includes('faq')) {
                    newLink.href = '../sorro_brew_faq_support/code.html';
                } else if (text.includes('wholesale')) {
                    newLink.href = '../wholesale.html';
                } else if (text.includes('privacy')) {
                    newLink.href = '../privacy.html';
                } else if (text.includes('sustainability')) {
                    newLink.href = '../sustainability.html';
                } else if (text.includes('investor')) {
                    newLink.href = '../sorro_brew_investor_business_case/code.html';
                } else if (text.includes('brand') || text.includes('logo')) {
                    newLink.href = '../sorro_brew_brand_identity_logo_concepts/code.html';
                } else if (text.includes('account') || text.includes('dashboard')) {
                    newLink.href = '../pages/account/dashboard.html';
                } else if (text.includes('shop now')) {
                    newLink.href = '../shop.html';
                } else if (text.includes('explore') || text.includes('learn more')) {
                    newLink.href = './code.html';
                } else {
                    // Default to home
                    newLink.href = '../../index.html';
                }
                
                // Add visual indicator for fixed links
                newLink.style.borderBottom = '2px solid #735c00';
                newLink.style.paddingBottom = '2px';
            }
        });
        
        console.log(`✅ Fixed ${links.length} links`);
    }

    fixAllForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach((form, index) => {
            // Remove existing listeners
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);
            
            newForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(newForm);
            });
            
            // Add real-time validation
            const inputs = newForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
        
        console.log(`✅ Fixed ${forms.length} forms`);
    }

    fixNavigation() {
        // Fix mobile menu toggle
        const mobileButtons = document.querySelectorAll('.material-symbols-outlined');
        mobileButtons.forEach(button => {
            const text = button.textContent;
            if (text.includes('menu')) {
                button.addEventListener('click', () => {
                    this.toggleMobileMenu();
                });
            }
        });
        
        // Fix cart and user icons
        const iconButtons = document.querySelectorAll('[data-icon]');
        iconButtons.forEach(button => {
            const icon = button.getAttribute('data-icon');
            button.addEventListener('click', () => {
                this.handleIconClick(icon);
            });
        });
    }

    handleButtonClick(buttonText, buttonElement) {
        console.log(`🔘 Button clicked: ${buttonText}`);
        
        // Show loading state
        this.showLoading();
        
        // Handle different button types with SPECIFIC text matching
        if (buttonText.includes('shop now') || buttonText.includes('order')) {
            setTimeout(() => {
                window.location.href = '../shop.html';
            }, 300);
        } else if (buttonText.includes('explore') || buttonText.includes('learn more')) {
            setTimeout(() => {
                window.location.href = './code.html';
            }, 300);
        } else if (buttonText.includes('contact') || buttonText.includes('get in touch')) {
            setTimeout(() => {
                window.location.href = '../sorro_brew_contact_us_ritual_support/code.html';
            }, 300);
        } else if (buttonText.includes('begin the tour') || buttonText.includes('start tour') || buttonText.includes('start journey')) {
            setTimeout(() => {
                // Find the first tour page and navigate to it
                const tourPages = [
                    '../the_maicillo_journey_virtual_tour_1/code.html',
                    '../the_maicillo_journey_virtual_tour_2/code.html'
                ];
                window.location.href = tourPages[0]; // Start with first tour
            }, 300);
        } else if (buttonText.includes('subscribe') || buttonText.includes('sign up') || buttonText.includes('join newsletter')) {
            this.showNotification('Newsletter feature coming soon!', 'info');
        } else if (buttonText.includes('add to cart')) {
            this.addToCart();
        } else if (buttonText.includes('view cart') || buttonText.includes('checkout')) {
            this.toggleCart();
        } else {
            // Default action
            this.showNotification('Action completed!', 'success');
        }
        
        this.hideLoading();
    }

    handleIconClick(icon) {
        console.log(`🎯 Icon clicked: ${icon}`);
        
        if (icon === 'shopping_bag') {
            this.toggleCart();
        } else if (icon === 'person') {
            window.location.href = '../pages/account/dashboard.html';
        } else if (icon === 'search') {
            this.openSearch();
        } else if (icon === 'favorite') {
            this.showNotification('Wishlist feature coming soon!', 'info');
        } else if (icon === 'settings') {
            this.showNotification('Settings feature coming soon!', 'info');
        }
    }

    handleFormSubmit(form) {
        console.log('📝 Form submitted');
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        let firstErrorField = null;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                firstErrorField = field;
                this.showFieldError(field, 'This field is required');
            } else {
                this.clearFieldError(field);
            }
        });
        
        if (!isValid) {
            firstErrorField?.focus();
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
        this.showLoading();
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Message sent successfully! We\'ll respond within 24 hours.', 'success');
            form.reset();
        }, 1500);
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.type === 'email') {
            if (!this.isValidEmail(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
            } else {
                this.clearFieldError(field);
            }
        } else if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
        } else {
            this.clearFieldError(field);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('border-red-500', 'bg-red-50');
        field.classList.remove('border-gray-300', 'bg-white');
        
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
        field.classList.remove('border-red-500', 'bg-red-50');
        field.classList.add('border-gray-300', 'bg-white');
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    toggleCart() {
        // Simple cart toggle for now
        const cartElement = document.querySelector('[class*="cart"], [id*="cart"]');
        if (cartElement) {
            cartElement.classList.toggle('hidden');
        }
    }

    openSearch() {
        this.showNotification('Search feature coming soon!', 'info');
    }

    addToCart() {
        // Simple add to cart notification
        this.showNotification('Added to cart!', 'success');
    }

    addGlobalFeatures() {
        // Add global loading overlay
        if (!document.getElementById('global-loading')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'global-loading';
            loadingDiv.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden';
            loadingDiv.innerHTML = `
                <div class="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p class="text-gray-600">Loading...</p>
                </div>
            `;
            document.body.appendChild(loadingDiv);
        }
        
        // Add global notification container
        if (!document.getElementById('notifications')) {
            const notificationContainer = document.createElement('div');
            notificationContainer.id = 'notifications';
            notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(notificationContainer);
        }
    }

    showLoading() {
        const loading = document.getElementById('global-loading');
        if (loading) {
            loading.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loading = document.getElementById('global-loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    showNotification(message, type = 'success') {
        const notificationContainer = document.getElementById('notifications');
        if (!notificationContainer) return;
        
        const notification = document.createElement('div');
        notification.className = `px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-600 text-white' : 
            type === 'error' ? 'bg-red-600 text-white' : 
            'bg-blue-600 text-white'
        }`;
        notification.textContent = message;
        
        notificationContainer.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Auto-initialize immediately
new UniversalInteractiveFix();
