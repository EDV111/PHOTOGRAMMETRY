const inputElement = document.getElementById("fileInput");
const loadingElement = document.getElementById("loading");
const progressBarElement = document.getElementById("progressBar");
const canvasElement = document.getElementById("canvas");
const gltfLoader = new THREE.GLTFLoader();
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });

function handleLoadProgress(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    progressBarElement.style.width = `${percentComplete}%`;
  }
}

function handleLoadError(error) {
  console.error(`Error loading model: ${error}`);
}

function handleLoadFinish(gltf) {
  loadingElement.style.display = "none";
  const object = gltf.scene;
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const distance = Math.max(size.x, size.y, size.z) * 1.5;
  object.position.x += (object.position.x - center.x) * -1;
  object.position.y += (object.position.y - center.y) * -1;
  object.position.z += (object.position.z - center.z) * -1;
  camera.position.copy(center);
  camera.position.z += distance;
  camera.lookAt(center);
  scene.add(object);
}

function handleInputChange(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  loadingElement.style.display = "block";
  const url = URL.createObjectURL(file);
  gltfLoader.load(url, handleLoadFinish, handleLoadProgress, handleLoadError);
}

inputElement.addEventListener("change", handleInputChange);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
camera.add(pointLight);
scene.add(camera);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

