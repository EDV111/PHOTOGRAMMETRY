// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the loading manager and progress bar
const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById("loading-bar");

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  const progress = itemsLoaded / itemsTotal;
  progressBar.style.width = `${progress * 100}%`;
};

// Load the GLB model and add it to the scene
const loader = new THREE.GLTFLoader(loadingManager);
loader.load('model.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  // Position the camera to frame the model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  camera.position.set(center.x, center.y, center.z + size.z);
  camera.lookAt(center);

  // Render the scene
  renderer.render(scene, camera);
});
