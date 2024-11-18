// Ensure DOM and GSAP are ready before starting
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingProgressBar = document.querySelector(
    ".loading-screen__progress"
  );
  const loadingPercentageEl = document.querySelector(
    ".loading-screen__percentage"
  );

  // Elements to load
  const titleElement = document.querySelector(".title");
  const villainImage = document.querySelector(".about__image");
  const textElement = document.querySelector(".about__description");
  const formElement = document.querySelector(".form");

  // Get the initial text for the typewriter effect and clear it
  const textContent = textElement.textContent.trim();
  textElement.textContent = "";

  // Make elements invisible initially
  gsap.set([titleElement, villainImage, textElement, formElement], {
    opacity: 0,
  });

  // Center title for a dramatic effect
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
    gsap.to(textElement, {
      opacity: 1,
      duration: 1,
      onComplete: () => typeWriterEffect(textContent, formFadeIn, 50), // Typing speed: 50ms per character
    });
  }

  function typeWriterEffect(text, callback, speed = 50) {
    let index = 0;

    // Use a buffered approach
    function typeCharacter() {
      if (index < text.length) {
        textElement.textContent += text[index]; // Append a single character
        index++;
        setTimeout(typeCharacter, speed); // Delay before adding the next character
      } else if (callback) {
        callback(); // Trigger callback when typing is done
      }
    }

    typeCharacter(); // Start typing
  }

  function formFadeIn() {
    gsap.to(formElement, {
      opacity: 1,
      duration: 1.5,
      ease: "power3.inOut",
    });
  }

  // Initialize the loading sequence
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
