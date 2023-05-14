const canvas = document.querySelector("#canvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
const loader = document.querySelector("#loader-wrapper");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function createScene(model) {
  showLoader();

  const assetsManager = new BABYLON.AssetsManager(scene);
  const meshTask = assetsManager.addMeshTask("model task", "", "./", model);
  meshTask.onSuccess = (task) => {
    hideLoader();

    const modelMesh = task.loadedMeshes[0];
    modelMesh.position = BABYLON.Vector3.Zero();

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      2,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: false,
    });

    const modelMaterial = new BABYLON.StandardMaterial("model material", scene);
    modelMesh.material = modelMaterial;

    engine.runRenderLoop(() => {
      scene.render();
    });
  };

  assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
    const loadingStatus =
      (totalCount - remainingCount) / totalCount * 100;
    console.log(`${loadingStatus}% of assets loaded`);

    const loaderBar = document.querySelector("#loader");
    loaderBar.style.width = `${loadingStatus}%`;
  };

  assetsManager.load();
}

const modelFile = document.querySelector("#modelFile");
modelFile.addEventListener("change", () => {
  const file = modelFile.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const model = JSON.parse(reader.result);
    createScene(model);
  };
});

window.addEventListener("resize", () => {
  engine.resize();
});

