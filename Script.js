document.addEventListener('DOMContentLoaded', function() {
  // Select all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  // Select the day marker element
  const dayMarker = document.querySelector('.day-marker');

  // Add change event listener to each checkbox
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        // Create a marker element for the completed day
        const marker = document.createElement('div');
        marker.classList.add('marker-animation');
        
        // Append the marker to the day marker element
        dayMarker.appendChild(marker);
      } else {
        // Remove all markers for the unchecked day
        const markers = dayMarker.querySelectorAll('.marker-animation');
        markers.forEach(function(marker) {
          marker.parentNode.removeChild(marker);
        });
      }
    });
  });

  // Array of motivational quotes
  const quotes = [
    "The only way you gain mental toughness is to do things you're not happy doing.",
    "If you can see yourself doing something, you can do it. If you can't see yourself doing it, usually you can't achieve it.",
    "There's a lot of people out there who are so afraid to dream, they've forgotten how to dream.",
    "The most important conversations you can ever have are the ones you have with yourself.",
    "Embrace what you are capable of, instead of clinging to what you used to be able to do."
  ];

  // Select the quote slider container
  const quoteContainer = document.querySelector('.slider');

  // Create a slide for each quote and append it to the quote container
  quotes.forEach(function(quote) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.textContent = quote;
    quoteContainer.appendChild(slide);
  });
});
