// Form Validation System for Sorro Brew
class SorroBrewForms {
    constructor() {
        this.init();
    }

    init() {
        this.validateContactForm();
        this.validateNewsletterForm();
        this.validateOrderForm();
        this.addInputAnimations();
    }

    validateContactForm() {
        const contactForm = document.querySelector('form[action*="contact"]');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('input[name="name"]')?.value || '',
                email: contactForm.querySelector('input[name="email"]')?.value || '',
                message: contactForm.querySelector('textarea[name="message"]')?.value || '',
                phone: contactForm.querySelector('input[name="phone"]')?.value || ''
            };

            const errors = this.validateContactData(formData);
            
            if (errors.length > 0) {
                this.showErrors(contactForm, errors);
                return;
            }

            this.showSuccess(contactForm, 'Thank you for your message! We\'ll respond within 24 hours.');
            contactForm.reset();
            
            // In production, this would send to a server
            console.log('Contact form submitted:', formData);
        });
    }

    validateNewsletterForm() {
        const newsletterForms = document.querySelectorAll('form[action*="newsletter"]');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = form.querySelector('input[type="email"]')?.value || '';
                const errors = this.validateEmail(email);
                
                if (errors.length > 0) {
                    this.showErrors(form, errors);
                    return;
                }

                this.showSuccess(form, 'Welcome to the Sorro Brew family! Check your email for a special offer.');
                form.reset();
                
                console.log('Newsletter signup:', email);
            });
        });
    }

    validateOrderForm() {
        const orderForm = document.querySelector('form[action*="order"]');
        if (!orderForm) return;

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                product: orderForm.querySelector('select[name="product"]')?.value || '',
                quantity: orderForm.querySelector('input[name="quantity"]')?.value || '1',
                name: orderForm.querySelector('input[name="name"]')?.value || '',
                email: orderForm.querySelector('input[name="email"]')?.value || '',
                address: orderForm.querySelector('textarea[name="address"]')?.value || '',
                phone: orderForm.querySelector('input[name="phone"]')?.value || ''
            };

            const errors = this.validateOrderData(formData);
            
            if (errors.length > 0) {
                this.showErrors(orderForm, errors);
                return;
            }

            this.showSuccess(orderForm, 'Order placed successfully! You\'ll receive a confirmation email shortly.');
            
            // Add to cart if needed
            if (window.navigation) {
                window.navigation.addToCart({
                    name: formData.product,
                    quantity: parseInt(formData.quantity),
                    price: 24.99 // Mock price
                });
            }
            
            orderForm.reset();
            console.log('Order submitted:', formData);
        });
    }

    validateContactData(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        if (!data.message || data.message.length < 10) {
            errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
        }
        
        if (data.phone && !this.isValidPhone(data.phone)) {
            errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
        }
        
        return errors;
    }

    validateEmail(email) {
        const errors = [];
        
        if (!email || !this.isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        return errors;
    }

    validateOrderData(data) {
        const errors = [];
        
        if (!data.product) {
            errors.push({ field: 'product', message: 'Please select a product' });
        }
        
        if (!data.name || data.name.length < 2) {
            errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        if (!data.address || data.address.length < 10) {
            errors.push({ field: 'address', message: 'Please enter a complete delivery address' });
        }
        
        if (data.phone && !this.isValidPhone(data.phone)) {
            errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
        }
        
        return errors;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    showErrors(form, errors) {
        // Remove existing errors
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        form.querySelectorAll('.border-red-500').forEach(el => {
            el.classList.remove('border-red-500');
            el.classList.add('border-[#e6e5b9]');
        });

        errors.forEach(error => {
            const field = form.querySelector(`[name="${error.field}"]`);
            if (field) {
                field.classList.remove('border-[#e6e5b9]');
                field.classList.add('border-red-500');
                
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message text-red-500 text-sm mt-1 font-["Be_Vietnam_Pro"]';
                errorDiv.textContent = error.message;
                
                field.parentNode.appendChild(errorDiv);
            }
        });

        // Scroll to first error
        const firstError = form.querySelector('.border-red-500');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    showSuccess(form, message) {
        // Remove existing messages
        form.querySelectorAll('.success-message').forEach(el => el.remove());
        form.querySelectorAll('.error-message').forEach(el => el.remove());

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 font-["Be_Vietnam_Pro"]';
        successDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-green-600">check_circle</span>
                <span>${message}</span>
            </div>
        `;

        form.parentNode.insertBefore(successDiv, form);
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    addInputAnimations() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('scale-[1.02]');
                input.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('scale-[1.02]');
            });

            // Add character counter for textareas
            if (input.tagName === 'TEXTAREA') {
                const counter = document.createElement('div');
                counter.className = 'text-right text-sm text-[#504442] mt-1 font-["Be_Vietnam_Pro"]';
                counter.textContent = '0 characters';
                
                input.parentNode.appendChild(counter);
                
                input.addEventListener('input', () => {
                    const length = input.value.length;
                    counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
                    
                    if (length > 500) {
                        counter.classList.add('text-red-500');
                    } else {
                        counter.classList.remove('text-red-500');
                    }
                });
            }

            // Add real-time validation
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value || '';
        const fieldName = field.name || '';
        let isValid = true;

        // Remove previous error styling
        field.classList.remove('border-red-500');
        field.classList.add('border-[#e6e5b9]');
        
        // Remove previous error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        switch (field.type) {
            case 'email':
                isValid = this.isValidEmail(value);
                break;
            case 'tel':
                isValid = !value || this.isValidPhone(value);
                break;
            default:
                if (fieldName.includes('email')) {
                    isValid = this.isValidEmail(value);
                } else if (fieldName.includes('phone')) {
                    isValid = !value || this.isValidPhone(value);
                } else {
                    isValid = value.length >= 2;
                }
        }

        if (!isValid && value) {
            field.classList.remove('border-[#e6e5b9]');
            field.classList.add('border-red-500');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error text-red-500 text-sm mt-1 font-["Be_Vietnam_Pro"]';
            errorDiv.textContent = 'Please check this field';
            
            field.parentNode.appendChild(errorDiv);
        }
    }
}

// Initialize form validation
const forms = new SorroBrewForms();

// Export for global access
window.SorroBrewForms = SorroBrewForms;
