const progressBar = document.querySelector('.progress-bar');

const modelViewer = document.querySelector('model-viewer');

function showProgress() {
  progressBar.style.display = 'block';
}

function hideProgress() {
  progressBar.style.display = 'none';
}

function updateProgress(event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    progressBar.style.width = `${percentComplete}%`;
  }
}

function importModel() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.glb';
  fileInput.onchange = () => {
    showProgress();
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      modelViewer.src = event.target.result;
      hideProgress();
    };
    reader.onprogress = updateProgress;
    reader.readAsDataURL(file);
  };
  fileInput.click();
}

document.querySelector('.import-button').addEventListener('click', importModel);
