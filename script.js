// Ensures DOM and GSAP are ready before starting
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingProgressBar = document.querySelector(
    ".loading-screen__progress"
  );
  const loadingPercentageEl = document.querySelector(
    ".loading-screen__percentage"
  );

  //These are the elements I want to load
  const titleElement = document.querySelector(".title");
  const villainImage = document.querySelector(".about__image");
  const textElement = document.querySelector(".about__description");
  const formElement = document.querySelector(".form");

  //This stores the initial content of textElememtn (p) in textContent for later use, then clears textElement to prepare it for a typewriter effect.
  const textContent = textElement.textContent;
  textElement.textContent = "";

  // Initializes an index variable for use in the typewriter effect that will display textContent one character at a time.
  let index = 0;

  //Makes these elemtns invisible at the start.
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
    //loading progress percentage, starts at 0

    const loadingInterval = setInterval(() => {
      if (currentValue >= 100) {
        clearInterval(loadingInterval);
        gsap.to(loadingPercentageEl, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            loadingScreen.style.display = "none"; // stops displaying the loading bar
            titleFadeInOut(); //title appears
          },
        });
      } else {
        let randomIncrease = Math.floor(Math.random() * 10) + 1;
        currentValue += randomIncrease;
        if (currentValue > 100) currentValue = 100;
        // Generates a random increase in loading percentage (1–10%) for a dynamic loading experience. Ensures currentValue does not exceed 100.
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
  //text loads and then proceeds to typing
  function textFadeIn() {
    gsap.to(textElement, {
      opacity: 1,
      duration: 1,
      onComplete: () => typeText(),
    });
  }

  //Displays textContent one character at a time, with a 50-millisecond delay between each character for a typewriter effect. Once complete, it calls formFadeIn() to load the form.
  function typeText() {
    if (index < textContent.length) {
      textElement.textContent += textContent.charAt(index);
      index++;
      setTimeout(typeText, 50);
    } else {
      formFadeIn();
    }
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
