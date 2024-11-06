// // Select elements
// const textElement = document.querySelector(".game-description");
// const titleElement = document.querySelector(".home-screen__title");
// const villainImage = document.querySelector(".villain-image"); // Villain image
// const formElement = document.querySelector(".home-screen__form"); // "Introduce Yourself" form
// const otherElements = document.querySelectorAll(
//   ".home-screen__form .hero-option"
// ); // Individual elements in the form
// const textContent = textElement.textContent;

// // Clear the existing text content
// textElement.textContent = "";

// // Initial setup for title position and size
// gsap.set(titleElement, {
//   opacity: 0,
//   fontSize: "4em", // Larger font size
//   xPercent: -50, // Center horizontally
//   yPercent: -50, // Center vertically
//   position: "fixed", // Position fixed for centering
//   left: "50%",
//   top: "50%",
//   transform: "translate(-50%, -50%)", // Ensures perfect centering
// });

// // Set other elements to be initially hidden
// gsap.set(textElement, { opacity: 0 });
// gsap.set(villainImage, { opacity: 0 });
// gsap.set(formElement, { opacity: 0 }); // Initially hide the entire form
// otherElements.forEach((el) => gsap.set(el, { opacity: 0 })); // Initially hide each form option

// let index = 0;

// // Function to type text
// function typeText() {
//   if (index < textContent.length) {
//     textElement.textContent += textContent.charAt(index);
//     index++;
//     setTimeout(typeText, 50); // Adjust typing speed here
//   } else {
//     // Fade in the form once typing completes
//     gsap.to(formElement, {
//       opacity: 1,
//       duration: 1.5,
//       ease: "power3.inOut",
//       onComplete: () => fadeInElements(), // Fade in each form option sequentially
//     });
//   }
// }

// // Function to fade in each additional element in the form after the form itself appears
// function fadeInElements() {
//   otherElements.forEach((el, index) => {
//     fadeInElement(el, index * 1000); // Delay each element by 1 second
//   });
// }

// // Function to fade in an element
// function fadeInElement(element, delay) {
//   setTimeout(() => {
//     gsap.to(element, {
//       opacity: 1,
//       duration: 1.5,
//       ease: "power3.inOut",
//     });
//   }, delay);
// }

// // Function to control the title fade-in, linger, and fade-out sequence
// function titleFadeInOut() {
//   gsap.to(titleElement, {
//     opacity: 1,
//     duration: 3,
//     ease: "power3.inOut",
//     onComplete: () => {
//       // Hold title for a moment
//       gsap.to(titleElement, {
//         delay: 2, // Linger for 2 seconds
//         opacity: 0,
//         duration: 2,
//         ease: "power3.inOut",
//         onComplete: () => {
//           // Fade in villain image after title fades out
//           gsap.to(villainImage, {
//             opacity: 1,
//             duration: 2.5, // Slower fade-in for the image
//             ease: "power3.inOut",
//             onComplete: () => {
//               // Fade in and start typing text after villain image appears
//               gsap.to(textElement, {
//                 opacity: 1,
//                 duration: 1,
//                 onComplete: () => typeText(),
//               });
//             },
//           });
//         },
//       });
//     },
//   });
// }

// // Start the title animation when the page loads
// window.onload = titleFadeInOut;
