// DOM elements
const inputElement = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const viewPortContainer = document.getElementById("viewPortContainer");

// GLTF scene
let scene;

// Load GLTF file on file input change
inputElement.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  loadGLTF(file);
});

// Load GLTF function
function loadGLTF(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function () {
    const arrayBuffer = reader.result;
    const loader = new THREE.GLTFLoader();
    // Show progress bar
    progressBar.style.display = "block";
    loader.load(
      URL.createObjectURL(new Blob([arrayBuffer])),
      (gltf) => {
        scene = gltf.scene;
        viewPortContainer.appendChild(scene);
        // Hide progress bar
        progressBar.style.display = "none";
      },
      (xhr) => {
        // Update progress bar
        const progress = (xhr.loaded / xhr.total) * 100;
        progressBar.style.width = `${progress}%`;
      },
      (error) => {
        console.error("Error loading GLTF file:", error);
      }
    );
  };
}
