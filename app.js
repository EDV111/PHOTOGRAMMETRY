let camera, scene, renderer;
let model;

init();
animate();

function init() {
  const container = document.getElementById('model-container');

  camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 0.1, 1000 );
  camera.position.set( 0, 0, 2 );

  scene = new THREE.Scene();

  const light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  light.position.set( 0, 20, 0 );
  scene.add( light );

  const ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);

  const grid = new THREE.GridHelper(10, 10, 0xffffff, 0xffffff);
  scene.add(grid);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  container.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  if (model) {
    model.rotation.y += 0.005;
  }
  renderer.render( scene, camera );
}

function loadModel() {
  const file = document.getElementById('file-input').files[0];
  const reader = new FileReader();
  reader.addEventListener( 'load', ( event ) => {
    const contents = event.target.result;
    const loader = new THREE.GLTFLoader();
    loader.parse(contents, '', ( gltf ) => {
      const newModel = gltf.scene;
      scene.add(newModel);
      newModel.position.set(0, 0, 0);
      newModel.scale.set(0.5, 0.5, 0.5);
      model = newModel;
    });
  });
  reader.readAsArrayBuffer( file );
}

