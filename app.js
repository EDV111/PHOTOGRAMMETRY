let modelViewer = document.querySelector('model-viewer');
let progress = document.querySelector('#progress');
let importButton = document.querySelector('#import-button');
let gltfModel;

function showProgress(event) {
  if (event.lengthComputable) {
    let percentComplete = event.loaded / event.total * 100;
    progress.value = percentComplete;
  } else {
    console.log('Unable to compute progress as total size is unknown');
  }
}

function importGLTF(url) {
  progress.style.display = 'block';
  progress.value = 0;

  // Load the GLTF model
  gltfModel = modelViewer.model = null;
  gltfLoader.load(url, function(gltf) {
    // On load complete
    gltfModel = modelViewer.model = gltf.scene;
    progress.style.display = 'none';
  }, showProgress, function(error) {
    console.error('Failed to load GLTF model', error);
    progress.style.display = 'none';
  });
}

importButton.addEventListener('change', function() {
  let file = importButton.files[0];
  if (file) {
    importGLTF(URL.createObjectURL(file));
  }
});

