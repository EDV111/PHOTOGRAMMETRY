const fileInput = document.getElementById("file-input");
const viewerContainer = document.getElementById("viewer-container");
const loadingBarUpload = document.getElementById("loading-bar-upload");
const loadingBarProcess = document.getElementById("loading-bar-process");

let gltfObject = null;

function processFile() {
  if (!fileInput.files[0]) {
    return;
  }
  const reader = new FileReader();
  reader.onloadstart = () => {
    loadingBarUpload.innerHTML = "Uploading file...";
  };
  reader.onprogress = (event) => {
    loadingBarUpload.innerHTML = `Uploading file... ${event.loaded} bytes uploaded.`;
  };
  reader.onload = async () => {
    loadingBarUpload.innerHTML = "Upload complete.";
    const arrayBuffer = reader.result;
    const loader = new THREE.GLTFLoader();
    const gltf = await new Promise((resolve) => loader.parse(arrayBuffer, "", resolve));
    gltfObject = gltf.scene.children[0];
    loadingBarProcess.innerHTML = "Processing GLB file...";
    const box = new THREE.Box3().setFromObject(gltfObject);
    const center = new THREE.Vector3();
    box.getCenter(center);
    gltfObject.position.sub(center); // center the object
    gltfObject.rotateX(-Math.PI / 2); // rotate it to face upwards
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    viewerContainer.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(45, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(0, 1, 1).normalize();
    const scene = new THREE.Scene();
    scene.add(gltfObject);
    scene.add(ambientLight);
    scene

