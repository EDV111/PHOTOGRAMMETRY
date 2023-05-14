// Define variables for the three.js environment
let camera, scene, renderer, model;

// Define a function to load a GLTF model
function loadModel(file) {
  // Create a new loader for GLTF models
  const loader = new THREE.GLTFLoader();

  // Load the GLTF model
  loader.load(
    file,
    (gltf) => {
      // Set the loaded model to a variable
      model = gltf.scene;

      // Add the model to the scene
      scene.add(model);

      // Set the camera position to view the model
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const size = box.getSize(new THREE.Vector3());
      const distance = Math.max(size.x, size.y, size.z) * 2;
      camera.position.copy(center);
      camera.position.x += distance;
      camera.position.y += distance;
      camera.position.z += distance;
      camera.lookAt(center);

      // Render the scene
      renderer.render(scene, camera);
    },
    (xhr) => {
      // Display a loading progress bar
      const loadingBar = document.getElementById("loading-bar");
      loadingBar.style.width = (xhr.loaded / xhr.total) * 100 + "%";
    },
    (error) => {
      console.log(error);
    }
  );
}

// Define a function to set up the three.js environment
function init() {
  // Create a new camera and set its position
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a new scene
  scene = new THREE.Scene();

  // Create a new renderer and set its size
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add the renderer to the HTML document
  const viewport = document.getElementById("viewport");
  viewport.appendChild(renderer.domElement);

  // Create a new ambient light and add it to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Create a new directional light and add it to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  // Call the animate function to render the scene
  animate();
}

// Define a function to render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Call the init function to set up the three.js environment
init();

// Add an event listener to the file input
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", (event) => {
  const file = URL.createObjectURL(event.target.files[0]);
  loadModel(file);
});

