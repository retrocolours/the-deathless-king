
// Text Typing Animation
const textElement = document.querySelector('.game-description');
const textContent = "Welcome to The Epic Adventure! Embark on a thrilling journey where every choice matters. Choose your hero wisely, overcome challenges, and face the ultimate villain. Your destiny awaits. Are you ready?";
let index = 0;

// Function to type text
function typeText() {
    if (index < textContent.length) {
        textElement.textContent += textContent.charAt(index);
        index++;
        setTimeout(typeText, 50); // Adjust typing speed here (lower is faster)
    }
};

// Start typing animation when the page loads
window.onload = typeText;

