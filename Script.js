// Random Animation Test Code
const element = document.querySelector('.checkmark');

// Define a random animation function
function randomAnimation() {
  // Add a class to trigger the animation
  element.classList.add('random-animation');

  // Remove the animation class after a delay
  setTimeout(() => {
    element.classList.remove('random-animation');
  }, 2000); // Adjust the duration of the animation as needed
}

// Trigger the random animation on click
element.addEventListener('click', randomAnimation);
