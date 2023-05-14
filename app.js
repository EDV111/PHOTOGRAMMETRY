let viewer;
let loadingBar = document.getElementById('loading-bar');

function initViewer() {
  viewer = new Communicator.WebViewer({
    containerId: 'viewer',
    endpointUri: '/d2p',
    model: {
      filename: 'ae1b9eb5e516c46b760028eb98bd7df979687af77ce8fb0117d06f6125ed0f12.glb'
    },
    progressBar: {
      enabled: true,
      container: loadingBar
    }
  });
}

function startProcess() {
  const fileInput = document.getElementById('glb-input');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const bytes = new Uint8Array(reader.result);
      viewer.model.load({
        data: bytes,
        format: 'glb'
      });
    };
  }
}

window.onload = () => {
  const importButton = document.getElementById('import-button');
  importButton.onclick = () => {
    const fileInput = document.getElementById('glb-input');
    fileInput.click();
  };
  const fileInput = document.getElementById('glb-input');
  fileInput.onchange = () => {
    startProcess();
  };

  initViewer();
};
