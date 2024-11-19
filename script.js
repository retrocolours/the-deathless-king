document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingProgressBar = document.querySelector(
    ".loading-screen__progress"
  );
  const loadingPercentageEl = document.querySelector(
    ".loading-screen__percentage"
  );

  const titleElement = document.querySelector(".title");
  const villainImage = document.querySelector(".about__image");
  const paragraphs = document.querySelectorAll(".about__container p");
  const formElement = document.querySelector(".form");

  // Hide elements initially
  gsap.set([titleElement, villainImage, paragraphs, formElement], {
    opacity: 0,
  });

  // Center title for dramatic effect
  gsap.set(titleElement, {
    fontSize: "4em",
    xPercent: -50,
    yPercent: -50,
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  });

  function loadGame() {
    let currentValue = 0;
    const loadingInterval = setInterval(() => {
      if (currentValue >= 100) {
        clearInterval(loadingInterval);
        gsap.to(loadingPercentageEl, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            loadingScreen.style.display = "none";
            titleFadeInOut();
          },
        });
      } else {
        let randomIncrease = Math.floor(Math.random() * 10) + 1;
        currentValue += randomIncrease;
        if (currentValue > 100) currentValue = 100;

        loadingPercentageEl.textContent = `${currentValue}%`;
        gsap.to(loadingProgressBar, {
          width: `${currentValue}%`,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    }, 200);
  }

  function titleFadeInOut() {
    gsap.to(titleElement, {
      opacity: 1,
      duration: 3,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.to(titleElement, {
          delay: 2,
          opacity: 0,
          duration: 2,
          ease: "power3.inOut",
          onComplete: () => villainImageFadeIn(),
        });
      },
    });
  }

  function villainImageFadeIn() {
    gsap.to(villainImage, {
      opacity: 1,
      duration: 2.5,
      ease: "power3.inOut",
      onComplete: () => textFadeIn(),
    });
  }

  function textFadeIn() {
    // Array of custom delays for each paragraph
    const delays = [0, 3, 7.5, 17, 20]; // Specify the delay for each paragraph in seconds
    const duration = 3; // Set a constant duration for all paragraphs
  
    paragraphs.forEach((paragraph, index) => {
      gsap.to(paragraph, {
        opacity: 1,
        duration: duration, // All paragraphs fade in over the same duration
        delay: delays[index] || 0, // Use the custom delay or default to 0 seconds if not specified
        ease: "power3.inOut",
      });
    });
  
    // Trigger form fade-in after the last paragraph
    const totalDelay = delays[delays.length - 1] + duration; // Last paragraph's delay + duration
    gsap.to(formElement, {
      opacity: 1,
      delay: totalDelay,
      duration: 1.5,
      ease: "power3.inOut",
    });
  }
  
  

  loadGame();
});

// Start Game button functionality
document
  .getElementById("start-game-button")
  .addEventListener("click", function () {
    const playerName = document.getElementById("player-name").value;
    if (playerName) {
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("gameStarted", "false");
      window.location.href = "game.html"; // Navigate to game screen
    } else {
      alert("Please enter your name!");
    }
  });

localStorage.setItem("newGameStart", "true");
