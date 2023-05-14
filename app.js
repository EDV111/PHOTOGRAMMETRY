// Get the file input element
const fileInput = document.getElementById('file-input');

// Get the progress bar element
const progressBar = document.getElementById('progress-bar');

// Get the start process button
const startButton = document.getElementById('start-button');

// Get the canvas element
const canvas = document.getElementById('canvas');

// Get the container element
const container = document.getElementById('container');

// Create a new scene
const scene = new THREE.Scene();

// Create a new camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a new renderer
const renderer = new THREE.WebGLRenderer({ canvas });

// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the container
container.appendChild(renderer.domElement);

// Create a new light
const light = new THREE.AmbientLight(0xffffff);

// Add the light to the scene
scene.add(light);

// Set the position of the camera
camera.position.z = 5;

// Create a new loader
const loader = new THREE.GLTFLoader();

// Create a new variable for the loaded object
let object;

// Add an event listener to the file input element
fileInput.addEventListener('change', event => {
  // Get the file
  const file = event.target.files[0];

  // Create a new reader
  const reader = new FileReader();

  // Set the onload function for the reader
  reader.onload = event => {
    // Get the result
    const result = event.target.result;

    // Load the GLTF object
    loader.load(
      result,
      gltf => {
        // Get the scene from the loaded object
        object = gltf.scene;

        // Add the object to the scene
        scene.add(object);

        // Hide the file input element
        fileInput.style.display = 'none';

        // Hide the start button
        startButton.style.display = 'none';

        // Show the canvas element
        canvas.style.display = 'block';
      },
      // Add a function to track the loading progress
      xhr => {
        const progress = xhr.loaded / xhr.total;
        progressBar.style.width = progress * 100 + '%';
      },
      // Add an error function
      error => {
        console.error(error);
      }
    );
  };

  // Read the file
  reader.readAsDataURL(file);
});

// Add an event listener to the start button
startButton.addEventListener('click', () => {
  // Check if the object is loaded
  if (object) {
    // Add the object to the scene
    scene.add(object);

    // Hide the file input element
    fileInput.style.display = 'none';

    // Hide the start button
    startButton.style.display = 'none';

    // Show the canvas element
    canvas.style.display = 'block';
  }
});
