const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

// Create scene
const createScene = async () => {
  // Create a basic BJS Scene object
  const scene = new BABYLON.Scene(engine);

  // Create a FreeCamera, and set its position to (x:0, y:5, z:-10)
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  // Target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // Attach the camera to the canvas
  camera.attachControl(canvas, false);

  // Create a basic light, aiming 0,1,0 - meaning, to the sky
  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  // Load 3D model
  const assetUrl = "./models/nerf-gun.babylon";
  const mesh = await BABYLON.SceneLoader.ImportMeshAsync("", assetUrl, "", scene);

  // Position the mesh
  mesh.position = new BABYLON.Vector3(0, 0, 0);

  // Scale the mesh
  const scalingFactor = 0.05;
  mesh.scaling = new BABYLON.Vector3(scalingFactor, scalingFactor, scalingFactor);

  // Render loop
  engine.runRenderLoop(() => {
    scene.render();
  });
};

// Call createScene function
createScene();

// Resize
window.addEventListener("resize", () => {
  engine.resize();
});

