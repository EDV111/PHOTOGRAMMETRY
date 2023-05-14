$(document).ready(function () {
  // Display 3D Model
  function displayModel(file) {
    var iframe = $('#model-display')[0];
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html><html><head></head><body></body></html>');
    iframeDoc.close();

    var loader = new THREE.GLTFLoader();
    var camera, scene, renderer;
    var model;

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x4e4e4e);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0, 0, 3);

      var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      scene.add(ambientLight);

      var pointLight = new THREE.PointLight(0xffffff, 0.8);
      camera.add(pointLight);
      scene.add(camera);

      var material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      loader.load(file, function (gltf) {
        model = gltf.scene;
        model.traverse(function (child) {
          if (child.isMesh) {
            child.material = material;
          }
        });
        scene.add(model);
      });

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth - 50, window.innerHeight - 50);
      renderer.render(scene, camera);
      iframeDoc.body.appendChild(renderer.domElement);
    }

    function animate() {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }

    init();
    animate();
  }

  // Upload file
  $('#upload-form').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    // Show loading bar
    $('#loading-bar').addClass('progress');

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
          $('#loading-bar .progress-bar').css('width', progress + '%');
        };
        return xhr;
      },
      success: function (data) {
        // Hide loading bar
        $('#loading-bar').removeClass('progress');
        $('#loading-bar .progress-bar').css('width', '0%');

        // Display 3D model
        var fileURL = '/uploads/' + data.filename;
        displayModel(fileURL);
      },
      error: function () {
        alert('Error uploading file!');
      },
    });
  });
});


