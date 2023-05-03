async function processImages() {
  const link = document.getElementById("input-link").value;
  if (!link) {
    alert("Please enter a valid Google Drive folder link.");
    return;
  }

  const url = `https://api.openaerialmap.org/unstable/processing?url=${link}`;
  const response = await fetch(url);
  const json = await response.json();
  const jobId = json.id;

  const intervalId = setInterval(async () => {
    const jobUrl = `https://api.openaerialmap.org/unstable/processing/${jobId}`;
   
