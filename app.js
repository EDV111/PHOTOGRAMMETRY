// DOM elements
const importBtn = document.querySelector("#import-btn");
const fileInput = document.querySelector("#file-input");
const viewer = document.querySelector("#viewer");

// Loaders
const gltfLoader = new THREE.GLTFLoader();

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  viewer.clientWidth / viewer.clientHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

// Animate background
const backgroundCanvas = document.createElement("canvas");
const backgroundContext = backgroundCanvas.getContext("2d");

backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

const backgroundImg = new Image();
backgroundImg.src = "https://i.imgur.com/7pr8XqT.gif";

backgroundImg.onload = () => {
  const pattern = backgroundContext.createPattern(backgroundImg, "repeat");
  backgroundContext.fillStyle = pattern;
  backgroundContext.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
};

const backgroundTexture = new THREE.CanvasTexture(backgroundCanvas);
backgroundTexture.wrapS = THREE.RepeatWrapping;
backgroundTexture.wrapT = THREE.RepeatWrapping;
backgroundTexture.repeat.set(2, 2);

const backgroundPlaneGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, transparent: true });
const backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundMaterial);
backgroundPlane.rotation.x = -Math.PI / 2;
backgroundPlane.position.y = -1;
scene.add(backgroundPlane);

function animateBackground() {
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerHeight;

  backgroundContext.fillStyle = backgroundMaterial.color.getStyle();
  backgroundContext.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

  backgroundContext.drawImage(backgroundImg, 0, 0, backgroundCanvas.width, backgroundCanvas.height);

  backgroundTexture.needsUpdate = true;
}

// Resize Renderer on window resize
window.addEventListener("resize", () => {
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  camera.aspect = viewer.clientWidth / viewer.clientHeight;
  camera.updateProjectionMatrix();
});

// Load model on file input change
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataURL = reader.result;
      gltfLoader.load(dataURL, (gltf) => {
        scene.add(gltf.scene);
      });
    };
  }
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  animateBackground();
  renderer.render(scene, camera);
  controls.update();
}
animate();

