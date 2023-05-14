// Initialize variables
let container;
let camera;
let scene;
let renderer;
let model;
let loadingBar;

init();

function init() {
  // Create a container for the canvas
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  // Create a loading bar
  loadingBar = new LoadingBar(container);

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    100
  );
  camera.position.set(-5, 3, 10);

  // Create a scene
  scene = new THREE.Scene();

  // Create a renderer and add it to the container
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Load the GLB file
  const loader = new THREE.GLTFLoader();
  loader.load(
    "ae1b9eb5e516c46b760028eb98bd7df979687af77ce8fb0117d06f6125ed0f12.glb",
    (gltf) => {
      // Hide the loading bar
      loadingBar.hide();

      // Add the model to the scene
      model = gltf.scene;
      scene.add(model);

      // Position the model in the center of the scene
      const bbox = new THREE.Box3().setFromObject(model);
      const center = bbox.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Render the scene
      renderer.render(scene, camera);
    },
    (progress) => {
      // Update the loading bar
      loadingBar.setProgress(progress.loaded / progress.total);
    },
    (error) => {
      console.error(error);
    }
  );

  // Create a resize listener
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  // Update the camera aspect ratio and renderer size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

