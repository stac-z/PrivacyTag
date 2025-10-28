// Show verification code
function showVerificationCode() {
    console.log('Show verification code clicked');
    const verificationData = localStorage.getItem(`verification_${currentUsername}`);
    const codeDisplay = document.getElementById('verification-code');
    const showBtn = document.getElementById('show-verification-btn');
    
    console.log('Verification data:', verificationData);
    console.log('Code display element:', codeDisplay);
    console.log('Show button element:', showBtn);
    
    if (verificationData && codeDisplay && showBtn) {
        const data = JSON.parse(verificationData);
        codeDisplay.textContent = data.verificationCode;
        codeDisplay.classList.remove('hidden');
        showBtn.textContent = 'Hide Verification Code';
        showBtn.onclick = hideVerificationCode;
        console.log('Verification code displayed:', data.verificationCode);
    } else {
        console.log('Missing elements or data');
    }
}

let currentUsername = "defaultUser"; // Replace with dynamic value
function showVerificationCode() {
    console.log('Show verification code clicked');
    const verificationData = localStorage.getItem(`verification_${currentUsername}`);
    const codeDisplay = document.getElementById('verification-code');
    const showBtn = document.getElementById('show-verification-btn');
    if (verificationData && codeDisplay && showBtn) {
        const data = JSON.parse(verificationData);
        codeDisplay.textContent = data.verificationCode || 'No code available';
        codeDisplay.classList.remove('hidden');
        showBtn.textContent = 'Hide Verification Code';
        showBtn.onclick = hideVerificationCode;
        console.log('Verification code displayed:', data.verificationCode);
    } else {
        console.log('Missing elements or data');
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
