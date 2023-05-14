const canvas = document.querySelector('canvas');
const progressBar = document.querySelector('.progress-bar');
const importButton = document.querySelector('#import-button');

let scene, camera, renderer, model;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setClearColor("#000000");
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  loader.load(
    'ae1b9eb5e516c46b760028eb98bd7df979687af77ce8fb0117d06f6125ed0f12.glb',
    function(gltf) {
      model = gltf.scene;
      scene.add(model);
      progressBar.style.display = 'none';
    },
    function(xhr) {
      const progress = (xhr.loaded / xhr.total) * 100;
      progressBar.style.width = `${progress}%`;
    },
    function(error) {
      console.log('An error happened');
      console.log(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

importButton.addEventListener('click', () => {
  init();
  animate();
});

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


