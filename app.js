let gltfLoader = new THREE.GLTFLoader();

let fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.addEventListener('load', (event) => {
    let gltfData = event.target.result;

    gltfLoader.parse(gltfData, '', (gltf) => {
      let model = gltf.scene;
      let bbox = new THREE.Box3().setFromObject(model);
      let center = bbox.getCenter(new THREE.Vector3());
      let size = bbox.getSize(new THREE.Vector3());
      let distance = Math.max(size.x, size.y, size.z);
      let fov = 45;
      let aspect = window.innerWidth / window.innerHeight;
      let near = 0.1;
      let far = distance * 100;
      let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(center.x, center.y, distance * 2.5);

      let controls = new THREE.OrbitControls(camera, document.getElementById('viewport'));
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = distance;
      controls.maxDistance = distance * 10;
      controls.maxPolarAngle = Math.PI / 2;

      let ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(-1, 1, 1).normalize();

      let scene = new THREE.Scene();
      scene.add(model);
      scene.add(ambientLight);
      scene.add(directionalLight);

      let renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('viewport').appendChild(renderer.domElement);

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
      }

      animate();
    });
  });

  reader.readAsArrayBuffer(file);
});


