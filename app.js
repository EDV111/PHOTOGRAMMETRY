// Initialize variables
var scene, camera, renderer;
var mesh;

// Set up file input element
var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', loadSTL);

// Create a new scene and set background color
scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Create a new camera and set position
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a new renderer and set size
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer element to DOM
document.body.appendChild(renderer.domElement);

// Create a new orbit controls object
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a new directional light and add to scene
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

// Load STL file
function loadSTL(event) {
  var file = event.target.files[0];
  var loader = new THREE.STLLoader();
  
  loader.load(URL.createObjectURL(file), function(geometry) {
    // Create a new material and mesh from the geometry
    var material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
    mesh = new THREE.Mesh(geometry, material);
    
    // Add mesh to scene
    scene.add(mesh);
  });
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate mesh
  if (mesh) {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }
  
  // Update controls and render scene
  controls.update();
  renderer.render(scene, camera);
}

animate();

