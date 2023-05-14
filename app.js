// Initialize Cesium Viewer
var viewer = new Cesium.Viewer('cesiumContainer', {
  animation: false,
  timeline: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  navigationHelpButton: false,
  fullscreenButton: false,
  vrButton: false,
  selectionIndicator: false,
  infoBox: false,
  shouldAnimate: true,
  skyBox: false,
  skyAtmosphere: false,
  contextOptions: {
    webgl: {
      alpha: false
    }
  }
});

// Add a blue box to the scene
var entity = viewer.entities.add({
  name: 'Blue box',
  position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  box: {
    dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    material: Cesium.Color.BLUE.withAlpha(0.5),
    outline: true,
    outlineColor: Cesium.Color.BLACK
  }
});

// Hide loading bar and show viewport container when model is ready
viewer.scene.globe.tileLoadProgressEvent.addEventListener(function () {
  if (viewer.scene.globe.tilesLoaded === true) {
    $('#loading-bar-container').hide();
    $('#viewport-container').show();
  }
});

// Handle file upload
$('#upload-btn').on('change', function () {
  var file = this.files[0];
  var formData = new FormData();
  formData.append('file', file);

  // Show loading bar container
  $('#loading-bar-container').show();

  // Upload file
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
        $('#loading-bar').css('width', progress + '%');
      };
      return xhr;
    },
    success: function (result) {
      console.log(result);

      // Load model
      var tileset = new Cesium.Cesium3DTileset({
        url: result.url
      });

      viewer.scene.primitives.add(tileset);

      // Zoom to model
      viewer.zoomTo(tileset);
    }
  });
});


