// Coming Soon Page - PrivacyTag™ LLC

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize aura counter (this will also load saved stars)
    initializeAuraCounter();
    
    // Create privacy particles effect
    createPrivacyParticles();
    
    // Add magnetic hover effects
    addMagneticEffects();
    
    // Add privacy aura interactions
    addPrivacyAuraInteractions();
    
    // Add username modal event listeners
    setupUsernameModal();
    
    // Add verification button setup
    setupVerificationButton();
    
    // Comment system removed - now adding stars instead
    // Note: Stars reset each visit but aura points persist
});

// Create privacy particles effect
function createPrivacyParticles() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // Create floating privacy particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 0, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: privacyFloat ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: 1;
        `;
        starsContainer.appendChild(particle);
    }
}

// Add magnetic hover effects
function addMagneticEffects() {
    const privacyCore = document.querySelector('.privacy-core');
    if (!privacyCore) return;
    
    document.addEventListener('mousemove', (e) => {
        const coreRect = privacyCore.getBoundingClientRect();
        const coreX = coreRect.left + coreRect.width / 2;
        const coreY = coreRect.top + coreRect.height / 2;
        
        const distance = Math.sqrt(Math.pow(e.clientX - coreX, 2) + Math.pow(e.clientY - coreY, 2));
        const maxDistance = 150;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(e.clientY - coreY, e.clientX - coreX);
            const moveX = Math.cos(angle) * force * 10;
            const moveY = Math.sin(angle) * force * 10;
            
            privacyCore.style.transform = `translate(${moveX}px, ${moveY}px)`;
            privacyCore.style.transition = 'transform 0.1s ease';
        } else {
            privacyCore.style.transform = 'translate(0, 0)';
        }
    });
}

// Add privacy aura interactions
function addPrivacyAuraInteractions() {
    const container = document.querySelector('.privacy-aura-container');
    const privacyAura = document.querySelector('.privacy-aura');
    
    if (!container || !privacyAura) return;
    
    // Add click to the container
    container.addEventListener('click', (e) => {
        console.log('Privacy aura container clicked!');
        e.preventDefault();
        e.stopPropagation();
        addStarToBackground();
    });
    
    // Also add click to the individual aura elements
    privacyAura.addEventListener('click', (e) => {
        console.log('Privacy core clicked!');
        e.preventDefault();
        e.stopPropagation();
        addStarToBackground();
    });
    
    // Add hover glow effect
    container.addEventListener('mouseenter', () => {
        container.style.filter = 'drop-shadow(0 0 30px rgba(0, 255, 0, 0.8))';
        container.style.transition = 'all 0.3s ease';
    });
    
    container.addEventListener('mouseleave', () => {
        container.style.filter = 'none';
    });
}

// Add custom privacy animations
const style = document.createElement('style');
style.textContent = `
    @keyframes privacyFloat {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.8;
        }
        50% { 
            transform: translateY(-10px) translateX(-15px) rotate(180deg);
            opacity: 0.4;
        }
        75% { 
            transform: translateY(-30px) translateX(5px) rotate(270deg);
            opacity: 0.7;
        }
    }
    
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

// Show verification code
function showVerificationCode() {
    const verificationData = localStorage.getItem(`verification_${currentUsername}`);
    const codeDisplay = document.getElementById('verification-code');
    const showBtn = document.getElementById('show-verification-btn');
    
    if (verificationData && codeDisplay && showBtn) {
        const data = JSON.parse(verificationData);
        codeDisplay.textContent = data.verificationCode;
        codeDisplay.classList.remove('hidden');
        showBtn.textContent = 'Hide Verification Code';
        showBtn.onclick = hideVerificationCode;
    }
}

// Hide verification code
function hideVerificationCode() {
    const codeDisplay = document.getElementById('verification-code');
    const showBtn = document.getElementById('show-verification-btn');
    
    if (codeDisplay && showBtn) {
        codeDisplay.classList.add('hidden');
        showBtn.textContent = 'Show Verification Code';
        showBtn.onclick = showVerificationCode;
    }
}

// Setup verification button
function setupVerificationButton() {
    const showBtn = document.getElementById('show-verification-btn');
    if (showBtn) {
        showBtn.addEventListener('click', showVerificationCode);
    }
}

// Setup username modal event listeners
function setupUsernameModal() {
    const saveBtn = document.getElementById('save-username-btn');
    const input = document.getElementById('username-input');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveUsername);
    }
    
    if (input) {
        // Allow Enter key to save username
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveUsername();
            }
        });
        
        // Enable/disable save button based on input
        input.addEventListener('input', () => {
            const username = input.value.trim();
            if (saveBtn) {
                saveBtn.disabled = username.length < 2;
            }
        });
    }
}

// Shooting stars are temporary - no need to track count
let auraPoints = 0;
let currentUsername = 'Guest';
let savedStars = [];

// Load saved stars from localStorage
function loadSavedStars() {
    const savedStarsData = localStorage.getItem(`stars_${currentUsername}`);
    if (savedStarsData) {
        savedStars = JSON.parse(savedStarsData);
        console.log(`Loaded ${savedStars.length} saved stars for ${currentUsername}`);
        
        // Recreate all saved stars
        savedStars.forEach(starData => {
            createStarFromData(starData);
        });
    } else {
        savedStars = [];
        console.log('No saved stars found, starting fresh');
    }
}

// Save stars to localStorage
function saveStars() {
    localStorage.setItem(`stars_${currentUsername}`, JSON.stringify(savedStars));
    console.log(`Saved ${savedStars.length} stars for ${currentUsername}`);
}

// Create a star from saved data
function createStarFromData(starData) {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const star = document.createElement('div');
    star.style.cssText = `
        position: absolute;
        width: ${starData.size}px;
        height: ${starData.size}px;
        background: rgba(255, 255, 255, ${starData.opacity});
        border-radius: 50%;
        left: ${starData.x}%;
        top: ${starData.y}%;
        box-shadow: 
            0 0 ${starData.size * 2}px rgba(255, 255, 255, ${starData.opacity * 0.8}),
            0 0 ${starData.size * 4}px rgba(255, 255, 255, ${starData.opacity * 0.4});
        z-index: 2;
        pointer-events: none;
        animation: twinkle 3s ease-in-out infinite alternate;
    `;
    
    starsContainer.appendChild(star);
}

// Initialize aura counter
function initializeAuraCounter() {
    // Load saved username from localStorage
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        currentUsername = savedUsername;
        updateUsernameDisplay();
        hideUsernameModal();
        
        // Load saved aura points for this username
        const savedPoints = localStorage.getItem(`auraPoints_${currentUsername}`);
        if (savedPoints) {
            auraPoints = parseInt(savedPoints);
        }
        
        // Stars reset each visit - don't load saved stars
        savedStars = [];
        console.log(`Aura points loaded: ${auraPoints}, stars reset for new session`);
    } else {
        showUsernameModal();
        // Default to 0 points for new users
        auraPoints = 0;
        savedStars = [];
    }
    
    updateAuraDisplay();
}

// Show username modal
function showUsernameModal() {
    const modal = document.getElementById('username-modal');
    if (modal) {
        modal.classList.remove('hidden');
        const input = document.getElementById('username-input');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }
}

// Hide username modal
function hideUsernameModal() {
    const modal = document.getElementById('username-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Update username display
function updateUsernameDisplay() {
    const display = document.getElementById('username-display');
    if (display) {
        display.textContent = currentUsername;
    }
}

// Save username
function saveUsername() {
    const input = document.getElementById('username-input');
    const username = input.value.trim();
    
    if (username && username.length >= 2) {
        currentUsername = username;
        localStorage.setItem('username', currentUsername);
        updateUsernameDisplay();
        hideUsernameModal();
        console.log(`Username saved: ${currentUsername}`);
    } else {
        alert('Please enter a username with at least 2 characters');
    }
}

// Update the aura points display
function updateAuraDisplay() {
    const counter = document.getElementById('aura-count');
    if (counter) {
        counter.textContent = auraPoints;
        
        // Add a pulse effect when points increase
        counter.style.transform = 'scale(1.2)';
        counter.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 300);
    }
}

// Generate verification code for winner
function generateVerificationCode(username) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `PRIVACY2024-${username.toUpperCase()}-${timestamp}-${random}`;
}

// Store verification data
function storeVerificationData(username, score) {
    const verificationData = {
        username: username,
        score: score,
        timestamp: new Date().toISOString(),
        verificationCode: generateVerificationCode(username),
        deviceInfo: {
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language
        }
    };
    
    localStorage.setItem(`verification_${username}`, JSON.stringify(verificationData));
    console.log('Verification data stored:', verificationData);
    return verificationData.verificationCode;
}

// Add aura points
function addAuraPoint() {
    auraPoints++;
    // Save points with username as key
    localStorage.setItem(`auraPoints_${currentUsername}`, auraPoints.toString());
    
    // Store verification data for potential winner
    storeVerificationData(currentUsername, auraPoints);
    
    updateAuraDisplay();
    console.log(`${currentUsername} Aura Points: ${auraPoints}`);
}

function addStarToBackground() {
    console.log('addStarToBackground called!');
    
    const starsContainer = document.querySelector('.stars');
    console.log('Stars container found:', starsContainer);
    
    if (!starsContainer) {
        console.error('Stars container not found!');
        return;
    }
    
    // Create a temporary star that only lasts for this session
    const star = document.createElement('div');
    
    // Random position anywhere on screen
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size (1-4px)
    const size = Math.random() * 3 + 1;
    
    // Random brightness (0.3-1.0)
    const opacity = Math.random() * 0.7 + 0.3;
    
    // Create star data object for this session only (not saved)
    const starData = {
        x: x,
        y: y,
        size: size,
        opacity: opacity,
        timestamp: Date.now()
    };
    
    // Add to session stars array (not saved to localStorage)
    savedStars.push(starData);
    
    star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        box-shadow: 
            0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.8}),
            0 0 ${size * 4}px rgba(255, 255, 255, ${opacity * 0.4});
        z-index: 2;
        pointer-events: none;
        animation: twinkle 3s ease-in-out infinite alternate;
    `;
    
    starsContainer.appendChild(star);
    
    // Add aura point (this IS saved)
    addAuraPoint();
    
    console.log(`Added session star at ${x.toFixed(1)}%, ${y.toFixed(1)}% (size: ${size.toFixed(1)}px, opacity: ${opacity.toFixed(2)})`);
    console.log(`Session stars: ${savedStars.length}, Total aura points: ${auraPoints}`);
}
