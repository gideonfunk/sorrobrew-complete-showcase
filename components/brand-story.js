// Sorro Brew Brand Story Component
class BrandStory {
    constructor() {
        this.storyData = {
            heritage: {
                title: "Heritage Grain",
                subtitle: "Ancestral Ritual Since 1920",
                content: "In the shadow of Santa Ana volcano, Manuel's family perfected the art of maicillo roast. It wasn't just sustenance; it was a rhythmic connection to the land. They called it 'the seed of the sun.'",
                image: "/images/heritage-grain.jpg"
            },
            wisdom: {
                title: "Ancestral Wisdom: Manuel's Legacy",
                content: "Every morning, the aroma of slow-toasted grains filled the air, signaling a day of focus and vitality. We carry this torch forward, using the same slow-roasting techniques passed down through four generations.",
                image: "/images/manuels-legacy.jpg"
            },
            process: {
                title: "Explore the Process",
                content: "Our direct-trade model ensures regenerative practices that give back to the Salvadoran soil as much as they take. Each batch is roasted with care, honoring both the grain and the hands that cultivate it.",
                image: "/images/process.jpg"
            },
            farmers: {
                title: "Our Farmers: The Soul of Sorro",
                content: "We don't just trade; we partner. Our direct-trade model ensures regenerative practices that give back to the Salvadoran soil as much as they take. Each batch is roasted with care, honoring both the grain and the hands that cultivate it.",
                image: "/images/farmers-soul.jpg"
            },
            landscape: {
                title: "Salvadoran Landscape",
                content: "Guardian of the Usulután Highlands, Don Ricardo preserves biodiversity in every harvest, using traditional techniques that nourish the earth while producing premium maicillo.",
                image: "/images/landscape.jpg"
            },
            bridge: {
                title: "The Vancouver Bridge",
                content: "Vancouver is where our tradition meets modern lifestyle. In a city that moves fast, Sorro Brew offers a moment to ground yourself. We've brought the warmth of Salvadoran sun to the Pacific Northwest, creating a bridge between ancestral nourishment and contemporary wellness.",
                image: "/images/vancouver-bridge.jpg"
            }
        };
    }

    createStorySection(storyKey, containerId) {
        const story = this.storyData[storyKey];
        if (!story) return '';

        return `
            <section id="${containerId}" class="py-16 px-8 bg-gradient-to-br from-[${this.colors.surface}] to-[${this.colors.surfaceContainerLow}]">
                <div class="max-w-screen-2xl mx-auto">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div class="order-2 lg:order-1">
                            <div class="space-y-6">
                                <h2 class="font-['Manrope'] text-3xl font-bold text-[${this.colors.primary}] mb-4">${story.title}</h2>
                                <h3 class="font-['Manrope'] text-xl text-[${this.colors.secondary}] mb-4">${story.subtitle}</h3>
                                <p class="text-[${this.colors.onSurfaceVariant}] leading-relaxed text-lg">${story.content}</p>
                            </div>
                        </div>
                        <div class="order-1 lg:order-2">
                            <div class="relative aspect-[4/3] rounded-lg overflow-hidden">
                                <img src="${story.image}" alt="${story.title}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-[rgba(39,19,16,0.4)] to-transparent flex items-center justify-center">
                                    <span class="material-symbols-outlined text-6xl text-white">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    createTimeline() {
        const milestones = [
            { year: "1920", event: "Ancestral Ritual Founded", description: "Manuel's family begins perfecting maicillo roast" },
            { year: "1950", event: "First Generation Expansion", description: "Techniques refined and shared with community" },
            { year: "1975", event: "Sustainability Focus", description: "Regenerative farming practices adopted" },
            { year: "2000", event: "Quality Recognition", description: "Awarded for premium maicillo quality" },
            { year: "2020", event: "Vancouver Launch", description: "Sorro Brew brings Salvadoran ritual to Canada" },
            { year: "2024", event: "Global Expansion", description: "Worldwide distribution begins" }
        ];

        return `
            <section class="py-20 px-8 bg-[${this.colors.surfaceContainer}]">
                <div class="max-w-screen-2xl mx-auto">
                    <h2 class="font-['Manrope'] text-3xl font-bold text-[${this.colors.primary}] mb-12 text-center">Our Journey Through Time</h2>
                    <div class="relative">
                        <div class="absolute left-0 top-0 w-1 h-full bg-[${this.colors.secondary}]"></div>
                        <div class="ml-8 space-y-12">
                            ${milestones.map((milestone, index) => `
                                <div class="flex items-center gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}">
                                    <div class="flex-shrink-0 w-24 h-24 bg-[${this.colors.surfaceContainerLow}] rounded-full flex items-center justify-center font-['Manrope'] font-bold text-[${this.colors.primary}]">
                                        ${milestone.year}
                                    </div>
                                    <div class="flex-grow">
                                        <h3 class="font-['Manrope'] text-xl font-bold text-[${this.colors.primary}] mb-2">${milestone.event}</h3>
                                        <p class="text-[${this.colors.onSurfaceVariant}]">${milestone.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    get colors() {
        return {
            surface: '#fefccf',
            surfaceContainerLow: '#f8f6c9',
            primary: '#271310',
            secondary: '#735c00',
            onSurfaceVariant: '#504442'
        };
    }

    render() {
        return `
            ${this.createStorySection('heritage', 'heritage-section')}
            ${this.createStorySection('wisdom', 'wisdom-section')}
            ${this.createStorySection('process', 'process-section')}
            ${this.createStorySection('farmers', 'farmers-section')}
            ${this.createStorySection('landscape', 'landscape-section')}
            ${this.createStorySection('bridge', 'vancouver-bridge-section')}
            ${this.createTimeline()}
        `;
    }
}

// Export for use in pages
window.BrandStory = BrandStory;
