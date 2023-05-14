// Get the import button element
const importBtn = document.getElementById('import');

// Add a change event listener to the file input element
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  
  // Check if the file is a glb file
  if (file.type !== 'model/gltf-binary') {
    alert('Invalid file type. Please select a .glb file.');
    return;
  }
  
  // Create a URL for the file and load it into the scene
  const fileURL = URL.createObjectURL(file);
  const loader = new THREE.GLTFLoader();
  loader.load(
    fileURL,
    (gltf) => {
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
    }
  );
});

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();


