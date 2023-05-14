const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

let scene;

const createScene = () => {
  scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  return scene;
};

scene = createScene();

const importButton = document.getElementById("importButton");
const fileInput = document.getElementById("fileInput");

fileInput.onchange = (event) => {
  const files = event.target.files;
  const fileToLoad = files[0];

  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const data = event.target.result;

    BABYLON.SceneLoader.Load("", fileToLoad.name, engine, (scene) => {
      scene.createDefaultCameraOrLight(true, true, true);
      scene.activeCamera.alpha += Math.PI;
      scene.activeCamera.beta += Math.PI;

      scene.activeCamera.attachControl(canvas, true);

      engine.runRenderLoop(() => {
        scene.render();
      });
    });
  };

  fileReader.readAsArrayBuffer(fileToLoad);
};

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});

