document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const dayMarker = document.querySelector('.day-marker');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        const marker = document.createElement('div');
        marker.classList.add('marker-animation');
        dayMarker.appendChild(marker);
      } else {
        const markers = dayMarker.querySelectorAll('.marker-animation');
        markers.forEach(function(marker) {
          dayMarker.removeChild(marker);
        });
      }
    });
  });
});
