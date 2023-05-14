// global variables
let camera, scene, renderer, controls, mesh;
let animationId;

init();
animate();

function init() {
  // create camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;

  // create scene
  scene = new THREE.Scene();

  // create light
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 0, 10);
  scene.add(light);

  // create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // create controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false;

  // load the default model
  loadModel("models/teapot.obj");

  // listen for window resize
  window.addEventListener("resize", onWindowResize);
}

function animate() {
  animationId = requestAnimationFrame(animate);

  // render the scene
  renderer.render(scene, camera);
}

function loadModel(modelPath) {
  // cancel the current animation
  cancelAnimationFrame(animationId);

  // remove any existing mesh
  if (mesh) {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }

  // load the new model
  const loader = new THREE.OBJLoader();
  loader.load(
    modelPath,
    function (object) {
      // set the new mesh
      mesh = object;
      mesh.position.set(0, 0, 0);
      scene.add(mesh);

      // center the model in the view
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      mesh.position.sub(center);

      // set the camera position and target
      const distance = box.getSize(new THREE.Vector3()).length();
      const direction = controls.target
        .clone()
        .sub(camera.position)
        .normalize();
      camera.position.copy(direction.multiplyScalar(distance * 1.5)).add(center);
      controls.target.copy(center);

      // start the animation
      animate();
    },
    function (xhr) {
      // display the loading progress
      const percentLoaded = (xhr.loaded / xhr.total) * 100;
      console.log("Model " + modelPath + " " + Math.round(percentLoaded, 2) + "% loaded");
      updateLoadingBar(percentLoaded);
    },
    function (error) {
      console.error(error);
    }
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateLoadingBar(percent) {
  const loadingBar = document.getElementById("loading-bar");
  loadingBar.style.width = percent + "%";
}

