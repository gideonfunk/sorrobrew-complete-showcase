// Sorro Brew Footer Component
class FooterComponent {
    constructor() {
        this.footerData = {
            ourWorld: {
                title: "Our World",
                links: [
                    { text: "Sustainability", href: "../sustainability.html", icon: "eco" },
                    { text: "Direct Trade", href: "../direct-trade.html", icon: "handshake" },
                    { text: "Wholesale", href: "../wholesale.html", icon: "business" },
                    { text: "Support", href: "../support.html", icon: "support_agent" },
                    { text: "Contact", href: "../sorro_brew_contact_us_ritual_support/code.html", icon: "mail" },
                    { text: "Privacy", href: "../privacy.html", icon: "lock" },
                    { text: "Newsletter", href: "../newsletter.html", icon: "campaign" }
                ]
            },
            newsletter: {
                title: "Your email",
                placeholder: "Join the Sorro Brew family",
                buttonText: "Subscribe",
                successMessage: "Welcome to the ritual! Check your email for a special offer."
            },
            social: {
                instagram: "https://instagram.com/sorrobrew",
                facebook: "https://facebook.com/sorrobrew",
                twitter: "https://twitter.com/sorrobrew"
            },
            copyright: {
                text: "© 2024 Sorro Brew. Salvadoran Heritage Rituals.",
                subtext: "100% Caffeine Free • Local Roasted • Ethically Sourced"
            }
        };
    }

    createFooter() {
        const currentYear = new Date().getFullYear();
        
        return `
            <footer class="w-full py-16 px-8 border-t border-[#d3c3c0]/15 bg-[${this.colors.surfaceContainerLow}]">
                <div class="max-w-screen-2xl mx-auto">
                    <!-- Our World Section -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div class="col-span-2 md:col-span-1">
                            <h3 class="font-['Manrope'] text-lg font-bold text-[${this.colors.primary}] mb-4">${this.footerData.ourWorld.title}</h3>
                            <ul class="space-y-3">
                                ${this.footerData.ourWorld.links.map(link => `
                                    <li>
                                        <a href="${link.href}" class="flex items-center gap-3 text-[${this.colors.onSurfaceVariant}] hover:text-[${this.colors.secondary}] transition-colors p-3 rounded-lg hover:bg-[${this.colors.surfaceContainerLow}]">
                                            <span class="material-symbols-outlined text-[${this.colors.secondary}]">${link.icon}</span>
                                            <span>${link.text}</span>
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <!-- Newsletter Section -->
                        <div class="col-span-2 md:col-span-1">
                            <h3 class="font-['Manrope'] text-lg font-bold text-[${this.colors.primary}] mb-4">${this.footerData.newsletter.title}</h3>
                            <form id="newsletter-form" class="space-y-4">
                                <div class="relative">
                                    <input 
                                        type="email" 
                                        id="newsletter-email"
                                        placeholder="${this.footerData.newsletter.placeholder}"
                                        class="w-full px-4 py-3 bg-[${this.colors.surface}] rounded-lg border border-[${this.colors.outlineVariant}] focus:ring-2 focus:ring-[${this.colors.secondary}] font-['Be_Vietnam_Pro'] text-[${this.colors.onSurface}] placeholder-[${this.colors.onSurfaceVariant}]"
                                        required
                                    >
                                    <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 bg-[${this.colors.secondary}] text-white px-4 py-2 rounded-lg hover:bg-[${this.colors.primary}] transition-colors">
                                        <span class="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <!-- Social & Copyright -->
                    <div class="col-span-2 md:col-span-2 text-center">
                        <div class="flex justify-center gap-6 mb-8">
                            <a href="${this.footerData.social.instagram}" target="_blank" class="w-12 h-12 bg-[${this.colors.surfaceContainerLow}] rounded-full flex items-center justify-center text-[${this.colors.secondary}] hover:bg-[${this.colors.secondary}] hover:text-white transition-all">
                                <span class="material-symbols-outlined">photo_camera</span>
                            </a>
                            <a href="${this.footerData.social.facebook}" target="_blank" class="w-12 h-12 bg-[${this.colors.surfaceContainerLow}] rounded-full flex items-center justify-center text-[${this.colors.secondary}] hover:bg-[${this.colors.secondary}] hover:text-white transition-all">
                                <span class="material-symbols-outlined">public</span>
                            </a>
                            <a href="${this.footerData.social.twitter}" target="_blank" class="w-12 h-12 bg-[${this.colors.surfaceContainerLow}] rounded-full flex items-center justify-center text-[${this.colors.secondary}] hover:bg-[${this.colors.secondary}] hover:text-white transition-all">
                                <span class="material-symbols-outlined">alternate_email</span>
                            </a>
                        </div>
                        
                        <div class="space-y-2">
                            <p class="font-['Manrope'] font-bold text-[${this.colors.primary}]">${this.footerData.copyright.text}</p>
                            <p class="text-sm text-[${this.colors.onSurfaceVariant}]">${this.footerData.copyright.subtext}</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    get colors() {
        return {
            surface: '#fefccf',
            surfaceContainerLow: '#f8f6c9',
            primary: '#271310',
            secondary: '#735c00',
            outlineVariant: '#d3c3c0',
            onSurfaceVariant: '#504442'
        };
    }

    bindEvents() {
        // Newsletter form submission
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(newsletterForm);
            });
        }
    }

    handleNewsletterSubmit(form) {
        const email = document.getElementById('newsletter-email').value;
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        this.showLoadingState();
        setTimeout(() => {
            this.hideLoadingState();
            this.showNotification(this.footerData.newsletter.successMessage, 'success');
            form.reset();
        }, 1500);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    showLoadingState() {
        const loading = document.createElement('div');
        loading.id = 'newsletter-loading';
        loading.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
        loading.innerHTML = `
            <div class="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="text-gray-600">Subscribing...</p>
            </div>
        `;
        document.body.appendChild(loading);
    }

    hideLoadingState() {
        const loading = document.getElementById('newsletter-loading');
        if (loading) {
            loading.remove();
        }
    }

    render() {
        return this.createFooter();
    }
}

// Export for use in pages
window.FooterComponent = FooterComponent;
