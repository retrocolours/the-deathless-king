// Ensures DOM and GSAP are ready before starting
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

  // Stores the initial text for typewriter effect and clears the element
  const textContent = textElement.textContent;
  textElement.textContent = "";

  // Make elements invisible initially
  gsap.set([titleElement, villainImage, textElement, formElement], {
    opacity: 0,
  });

  gsap.set(titleElement, {
    opacity: 0,
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
        // Update progress bar and percentage
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
      onComplete: () => typeText(textContent, formFadeIn, 60),
    });
  }

  function typeText(text, callback, speed = 60) {
    let index = 0;

    function typeCharacter() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index); // Append each character
        index++;
        setTimeout(typeCharacter, speed);
      } else if (callback) {
        setTimeout(callback, 500); // Delay before showing the form
      }
    }

    typeCharacter();
  }

  function formFadeIn() {
    gsap.to(formElement, {
      opacity: 1,
      duration: 1.5,
      ease: "power3.inOut",
    });
  }

  loadGame();
});

// Start Game button click handler
document
  .getElementById("start-game-button")
  .addEventListener("click", function () {
    const playerName = document.getElementById("player-name").value;
    if (playerName) {
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("gameStarted", "false"); // Reset game start flag
      window.location.href = "game.html"; // Navigate to game.html
    } else {
      alert("Please enter your name!"); // Validate input
    }
  });

localStorage.setItem("newGameStart", "true");

// if (!localStorage.getItem("gameInProgress")) {
//   localStorage.setItem("newGameStart", "true");
// }

// Additional click listener for the Start Game button to ensure navigation to game.html
// document.getElementById("start-game-button").addEventListener("click", function() {
//   window.location.href = "game.html";
// });
