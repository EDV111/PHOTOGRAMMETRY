const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

// Create a scene
const createScene = function() {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.setPosition(new BABYLON.Vector3(0, 5, -10));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  return scene;
}

const scene = createScene();

// Resize the engine on window resize
window.addEventListener('resize', function() {
  engine.resize();
});

// Handle file input change event
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  // Load the GLB file
  const reader = new FileReader();
  reader.addEventListener('load', function(event) {
    const arrayBuffer = event.target.result;
    BABYLON.SceneLoader.ImportMesh('', '', arrayBuffer, scene, function(meshes) {
      // Remove the previous mesh (if any)
      scene.meshes.forEach(function(mesh) {
        mesh.dispose();
      });

      // Position the mesh at the center of the scene
      const mesh = meshes[0];
      mesh.position = new BABYLON.Vector3(0, 0, 0);

      // Resize the mesh to fit the viewport
      const boundingBox = mesh.getBoundingInfo().boundingBox;
      const size = boundingBox.maximum.subtract(boundingBox.minimum);
      const maxSize = Math.max(size.x, size.y, size.z);
      const scale = 1 / maxSize;
      mesh.scaling = new BABYLON.Vector3(scale, scale, scale);
    });
  });
  reader.readAsArrayBuffer(file);
});

