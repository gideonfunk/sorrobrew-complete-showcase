// Unified Navigation System for Sorro Brew
function createNavigation() {
    const navHTML = `
    <nav class="fixed top-0 w-full z-50 glass-nav shadow-sm">
    <div class="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
    <div class="text-2xl font-black text-stone-900 tracking-tighter font-headline">
        <a href="../../index.html" class="hover:opacity-80 transition-opacity">Sorro Brew</a>
    </div>
    <div class="hidden md:flex items-center gap-10">
        <a class="font-headline tracking-tight font-bold text-stone-600 hover:text-stone-900 transition-colors" href="../the_maicillo_journey_farmer_stories_ethical_sourcing/code.html">Our Farmers</a>
        <a class="font-headline tracking-tight font-bold text-stone-600 hover:text-stone-900 transition-colors" href="../sorro_brew_cafe_menu_order/code.html">Brewing Guide</a>
        <a class="font-headline tracking-tight font-bold text-yellow-700 border-b-2 border-yellow-600 pb-1" href="../sorro_brew_cafe_menu_order/code.html">Shop All</a>
        <a class="font-headline tracking-tight font-bold text-stone-600 hover:text-stone-900 transition-colors" href="../our_story_the_sorro_brew_journey/code.html">Heritage</a>
    </div>
    <div class="flex items-center gap-6">
        <button class="material-symbols-outlined text-stone-900 hover:opacity-80 transition-opacity" data-icon="shopping_bag" onclick="navigateToPage('../sorro_brew_cafe_menu_order/code.html')">shopping_bag</button>
        <button class="material-symbols-outlined text-stone-900 hover:opacity-80 transition-opacity" data-icon="person" onclick="navigateToPage('../sorro_brew_contact_us_ritual_support/code.html')">person</button>
    </div>
    </div>
    </nav>`;
    
    return navHTML;
}

function navigateToPage(url) {
    window.location.href = url;
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add navigation to pages that don't have it
    const existingNav = document.querySelector('nav');
    if (!existingNav) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = createNavigation();
        const nav = tempDiv.firstElementChild;
        document.body.insertBefore(nav, document.body.firstChild);
        
        // Add padding to main content if it exists
        const main = document.querySelector('main');
        if (main) {
            main.classList.add('pt-20');
        }
    }
    
    // Make all buttons functional
    makeButtonsFunctional();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function makeButtonsFunctional() {
    // Shopping functionality
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const text = button.textContent.trim().toLowerCase();
        
        if (text.includes('shop now') || text.includes('order now')) {
            button.addEventListener('click', function() {
                window.location.href = '../sorro_brew_cafe_menu_order/code.html';
            });
        } else if (text.includes('explore') || text.includes('learn more')) {
            button.addEventListener('click', function() {
                window.location.href = '../our_story_the_sorro_brew_journey/code.html';
            });
        } else if (text.includes('contact') || text.includes('get in touch')) {
            button.addEventListener('click', function() {
                window.location.href = '../sorro_brew_contact_us_ritual_support/code.html';
            });
        } else if (text.includes('faq') || text.includes('questions')) {
            button.addEventListener('click', function() {
                window.location.href = '../sorro_brew_faq_support/code.html';
            });
        }
    });
    
    // Icon button functionality
    const iconButtons = document.querySelectorAll('[data-icon]');
    iconButtons.forEach(button => {
        const icon = button.getAttribute('data-icon');
        button.addEventListener('click', function() {
            switch(icon) {
                case 'shopping_bag':
                    window.location.href = '../sorro_brew_cafe_menu_order/code.html';
                    break;
                case 'person':
                    window.location.href = '../sorro_brew_contact_us_ritual_support/code.html';
                    break;
                case 'search':
                    // Could implement search functionality
                    console.log('Search clicked');
                    break;
                case 'menu':
                    // Could implement mobile menu
                    console.log('Menu clicked');
                    break;
            }
        });
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createNavigation, navigateToPage, makeButtonsFunctional };
}
