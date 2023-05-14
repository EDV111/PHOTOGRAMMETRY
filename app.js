// Variables
let scene, camera, renderer, model;

// Initialization
init();

// Functions
function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a light
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  // Load the model
  const loader = new THREE.GLTFLoader();
  loader.load(
    // Resource URL
    'ae1b9eb5e516c46b760028eb98bd7df979687af77ce8fb0117d06f6125ed0f12.glb',
    // onLoad callback
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      animate();
    },
    // onProgress callback
    function (xhr) {
      const loadingPercent = (xhr.loaded / xhr.total) * 100;
      console.log(`Model loaded: ${loadingPercent}%`);
    },
    // onError callback
    function (error) {
      console.error('Error loading model:', error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

