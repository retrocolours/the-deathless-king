let selectedPlant = null;

const plants = {
  tomato: { growthStage: 0, health: 100, waterLevel: 50 },
  lettuce: { growthStage: 0, health: 100, waterLevel: 50 },
};

const plantNameEl = document.getElementById("plantName");
const growthStageEl = document.getElementById("growthStage");
const healthEl = document.getElementById("health");
const waterLevelEl = document.getElementById("waterLevel");
const waterBtn = document.getElementById("waterBtn");

// Loading Screen Elements
const loadingScreen = document.getElementById("loading-screen");
const loadingBar = document
  .getElementById("loading-bar")
  .querySelector("::after");
const loadingPercentageEl = document.getElementById("loading-percentage");

// Game Container
const gameContainer = document.getElementById("game-container");

function selectPlant(plant) {
  selectedPlant = plant;
  plantNameEl.textContent = plant.charAt(0).toUpperCase() + plant.slice(1);
  updatePlantStatus();
  waterBtn.disabled = false;
}

function updatePlantStatus() {
  if (selectedPlant) {
    const plant = plants[selectedPlant];
    growthStageEl.textContent = `Growth Stage: ${plant.growthStage}`;
    healthEl.textContent = `Health: ${plant.health}`;
    waterLevelEl.textContent = `Water Level: ${plant.waterLevel}`;
  }
}

function waterPlant() {
  if (selectedPlant) {
    const plant = plants[selectedPlant];
    plant.waterLevel += 20;
    if (plant.waterLevel > 100) plant.waterLevel = 100; // Max water level
    growPlant();
    updatePlantStatus();
  }
}

function growPlant() {
  if (selectedPlant) {
    const plant = plants[selectedPlant];
    if (plant.waterLevel > 20) {
      plant.growthStage++;
      plant.waterLevel -= 10; // Reduce water level when growing
    } else {
      plant.health -= 10; // Reduce health if not enough water
    }
  }
}

document
  .getElementById("tomatoBtn")
  .addEventListener("click", () => selectPlant("tomato"));
document
  .getElementById("lettuceBtn")
  .addEventListener("click", () => selectPlant("lettuce"));
waterBtn.addEventListener("click", waterPlant);

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
        },
      });
    } else {
      // Randomly increase the loading percentage
      let randomIncrease = Math.floor(Math.random() * 10) + 1; // Random value between 1 and 10
      currentValue += randomIncrease;
      if (currentValue > 100) currentValue = 100;

      loadingPercentageEl.textContent = `${currentValue}%`;
      gsap.to(loadingBar, {
        width: `${currentValue}%`,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, 200); // Update every 200 ms
}

// Start loading animation
window.onload = loadGame;
