// Loading Screen Elements
const loadingScreen = document.getElementById("loading-screen");
const loadingProgressBar = document.querySelector(".loading-screen__progress");
const loadingPercentageEl = document.querySelector(".loading-screen__percentage");

// Game Container
const gameContainer = document.getElementById('game-container');
const textBox = document.querySelector('.game-container__text-box');
const choiceButtons = document.querySelector('.game-container__choice-buttons');

let currentState = {};

// Start Game Initialization
function startGame() {
    currentState = {
        scene: 'start',
    };
    updateScene();
}

// Update the scene based on the current state
function updateScene() {
    switch (currentState.scene) {
        case 'start':
            textBox.innerHTML = "You awaken in a dark room.\nWhat will you do?";
            renderChoices([
                { text: "Explore the room", nextScene: 'explore' },
                { text: "Stay still", nextScene: 'stay' },
            ]);
            break;

        case 'explore':
            textBox.innerHTML = "You find a door. Do you open it?";
            renderChoices([
                { text: "Open the door", nextScene: 'door' },
                { text: "Go back", nextScene: 'start' },
            ]);
            break;

        case 'stay':
            textBox.innerHTML = "You hear strange noises. What will you do?";
            renderChoices([
                { text: "Investigate", nextScene: 'investigate' },
                { text: "Wait longer", nextScene: 'wait' },
            ]);
            break;

        // Add more cases as necessary for different scenes...
    }
}

// Render the choices dynamically
function renderChoices(choices) {
    choiceButtons.innerHTML = ''; // Clear previous choices
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('game-container__choice-button');
        button.innerText = choice.text;
        button.onclick = () => {
            currentState.scene = choice.nextScene;
            updateScene();
        };
        choiceButtons.appendChild(button);
    });
}

// GSAP Loading Animation
function loadGame() {
  let currentValue = 0;

  const loadingInterval = setInterval(() => {
    if (currentValue >= 100) {
      clearInterval(loadingInterval);
      gsap.to(loadingPercentageEl, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          loadingScreen.style.display = "none"; // Hide loading screen
          gameContainer.style.display = "block"; // Show game content
          gsap.fromTo(
            gameContainer,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
          );
          startGame(); // Start the game after loading is done
        },
      });
    } else {
      // Randomly increase the loading percentage
      let randomIncrease = Math.floor(Math.random() * 10) + 1; // Random value between 1 and 10
      currentValue += randomIncrease;
      if (currentValue > 100) currentValue = 100;

      loadingPercentageEl.textContent = `${currentValue}%`;
      gsap.to(loadingProgressBar, {
        width: `${currentValue}%`,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, 200); // Update every 200 ms
}

// Start loading animation
window.onload = loadGame;
