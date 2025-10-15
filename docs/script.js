// Coming Soon Page - PrivacyTag™ LLC
// Floating stars and space effects

document.addEventListener('DOMContentLoaded', () => {
    console.log("PrivacyTag™ LLC - Coming Soon page loaded");
    
    // Create floating stars
    createFloatingStars();
    
    // Add hover effects
    addHoverEffects();
});

// Create floating stars effect
function createFloatingStars() {
    const starsContainer = document.querySelector('.stars');
    
    // Create multiple layers of stars
    for (let layer = 0; layer < 3; layer++) {
        const starLayer = document.createElement('div');
        starLayer.className = `star-layer-${layer}`;
        starLayer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        
        // Create stars for this layer
        const starCount = layer === 0 ? 30 : layer === 1 ? 20 : 15;
        const starSize = layer === 0 ? '1px' : layer === 1 ? '2px' : '3px';
        const animationDuration = layer === 0 ? '4s' : layer === 1 ? '6s' : '8s';
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: ${starSize};
                height: ${starSize};
                background: #66FFFF;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: twinkle ${animationDuration} infinite;
                animation-delay: ${Math.random() * 4}s;
                opacity: ${0.3 + Math.random() * 0.7};
                box-shadow: 0 0 6px #66FFFF;
            `;
            starLayer.appendChild(star);
        }
        
        starsContainer.appendChild(starLayer);
    }
}

// Add hover effects
function addHoverEffects() {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
            link.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });
}

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1.2); 
        }
    }
`;
document.head.appendChild(style);