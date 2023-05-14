const container = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function addLights() {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

function addBoxToScene(material) {
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function addGridHelper() {
  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);
}

function render(time) {
  time *= 0.001;  // convert time to seconds

  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

function init() {
  addLights();
  addGridHelper();
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  addBoxToScene(material);

  requestAnimationFrame(render);
}

init();

// Upload file
$('#file-input').on('change', function () {
  var file = this.files[0];

  var formData = new FormData();
  formData.append('file', file);

  // Display progress bar
  $('#loading-bar').css('display', 'block');

  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    xhr: function () {
      var xhr = $.ajaxSettings.xhr();
      xhr.upload.onprogress = function (e) {
        var progress = (e.loaded / e.total) * 100;
        $('#loading-bar .progress').css('width', progress + '%');
      };
      return xhr;
    },
    success: function (response) {
      // Hide progress bar
      $('#loading-bar').css('display', 'none');

      // Load model into scene
      const loader = new THREE.GLTFLoader();
      loader.load(response.filepath, function (gltf) {
        scene.add(gltf.scene);
      });
    },
    error: function (err) {
      console.log(err);
    }
  });
});

