// Select the canvas element
const canvas = document.querySelector('canvas');

// Initialize the scene
const scene = new THREE.Scene();

// Initialize the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// Initialize the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a new instance of GLTFLoader
const loader = new THREE.GLTFLoader();

// Load the model
function loadModel(file) {
  loader.load(
    file,
    function (gltf) {
      // Add the model to the scene
      scene.add(gltf.scene);
    },
    function (xhr) {
      // Display the loading progress
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
      // Display an error message
      console.error('Failed to load model', error);
    }
  );
}

// Handle the file upload
const fileUpload = document.getElementById('file-upload');
fileUpload.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const contents = event.target.result;
    loadModel(contents);
  };
  reader.readAsDataURL(file);
});

// Initialize the controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Initialize the clock
const clock = new THREE.Clock();

// Create a new instance of AnimationMixer
let mixer;
loader.load('animations/model.gltf', function (gltf) {
  // Load the animations
  mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
  scene.add(gltf.scene);
});

// Render the scene
function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
  renderer.render(scene, camera);
}

render();


