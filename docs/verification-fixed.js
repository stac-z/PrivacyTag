// Verification Code System - PrivacyTag™ LLC
// This file handles verification code generation, storage, and display

// Show verification code
function showVerificationCode() {
    console.log('Show verification code clicked');
    // Access global currentUsername from script.js
    const username = window.currentUsername || localStorage.getItem('username') || 'Guest';
    const verificationData = localStorage.getItem(`verification_${username}`);
    const codeDisplay = document.getElementById('verification-code');
    const showBtn = document.getElementById('show-verification-btn');
    
    console.log('Username:', username);
    console.log('Verification data:', verificationData);
    console.log('Code display element:', codeDisplay);
    console.log('Show button element:', showBtn);
    
    if (verificationData && codeDisplay && showBtn) {
        try {
            const data = JSON.parse(verificationData);
            codeDisplay.textContent = data.verificationCode || 'No code available';
            codeDisplay.classList.remove('hidden');
            showBtn.textContent = 'Hide Verification Code';
            showBtn.onclick = hideVerificationCode;
            console.log('Verification code displayed:', data.verificationCode);
        } catch (e) {
            console.error('Error parsing verification data:', e);
            codeDisplay.textContent = 'Error loading code';
            codeDisplay.classList.remove('hidden');
        }
    } else {
        console.log('Missing elements or data');
        if (codeDisplay) {
            codeDisplay.textContent = 'No verification code available yet. Click the aura to generate one.';
            codeDisplay.classList.remove('hidden');
        }
    }
}

// Hide verification code
function hideVerificationCode() {
    console.log('Hide verification code clicked');
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
    console.log('Setting up verification button');
    const showBtn = document.getElementById('show-verification-btn');
    console.log('Verification button element:', showBtn);
    
    if (showBtn) {
        showBtn.addEventListener('click', showVerificationCode);
        console.log('Verification button event listener added');
    } else {
        console.log('Verification button not found');
    }
}
