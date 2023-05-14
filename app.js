// Wait for the DOM to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Get the necessary elements from the HTML document
  const importButton = document.getElementById('import-button');
  const glbInput = document.getElementById('glb-input');
  const loadingBar = document.getElementById('loading-bar');
  const processingBar = document.getElementById('processing-bar');
  const viewerContainer = document.getElementById('viewer-container');

  // When the import button is clicked, trigger the file input dialog
  importButton.addEventListener('click', () => {
    glbInput.click();
  });

  // When a file is selected, process it and display the result in the viewer container
  glbInput.addEventListener('change', async (event) => {
    // Get the selected file
    const glbFile = event.target.files[0];

    // Display the loading bar
    loadingBar.style.display = 'block';

    // Create a new instance of the GLTFLoader
    const loader = new THREE.GLTFLoader();

    // Load the GLB file
    loader.load(URL.createObjectURL(glbFile), (gltf) => {
      // Hide the loading bar
      loadingBar.style.display = 'none';

      // Display the processing bar
      processingBar.style.display = 'block';

      // Position the camera so that the model is visible
      const camera = new THREE.PerspectiveCamera(45, viewerContainer.offsetWidth / viewerContainer.offsetHeight, 1, 1000);
      camera.position.set(0, 0, 5);

      // Set up the renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(viewerContainer.offsetWidth, viewerContainer.offsetHeight);
      viewerContainer.appendChild(renderer.domElement);

      // Set up the scene
      const scene = new THREE.Scene();
      scene.add(gltf.scene);
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

      // Animate the model
      const animate = () => {
        requestAnimationFrame(animate);

        gltf.scene.rotation.y += 0.01;

        renderer.render(scene, camera);
      };
      animate();

      // Hide the processing bar when the model has finished loading
      processingBar.style.display = 'none';
    }, (xhr) => {
      // Update the progress bar while the model is loading
      processingBar.value = xhr.loaded / xhr.total;
    }, (error) => {
      // Display an error message if the model fails to load
      console.error(error);
      alert('Failed to load GLB file. Please check the console for more information.');
      loadingBar.style.display = 'none';
    });
  });
});


