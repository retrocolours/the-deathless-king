// Select the description element
const textElement = document.querySelector('.game-description');
// Get the initial text content from the element
const textContent = textElement.textContent;

// Clear the existing text before starting the animation
textElement.textContent = '';

let index = 0;

// Function to type text
function typeText() {
    if (index < textContent.length) {
        textElement.textContent += textContent.charAt(index);
        index++;
        setTimeout(typeText, 50); // Adjust typing speed here
    }
}

// Start typing animation when the page loads
window.onload = typeText;
