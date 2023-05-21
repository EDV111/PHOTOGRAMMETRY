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

  const quotes = [
    "The only way you gain mental toughness is to do things you're not happy doing.",
    "If you can see yourself doing something, you can do it. If you can't see yourself doing it, usually you can't achieve it.",
    "There's a lot of people out there who are so afraid to dream, they've forgotten how to dream.",
    "The most important conversations you can ever have are the ones you have with yourself.",
    "Embrace what you are capable of, instead of clinging to what you used to be able to do.",
    "The biggest disability you can have is a bad mindset.",
    "Motivation is crap. Motivation comes and goes. When you're driven, whatever is in front of you will get destroyed.",
    "Suffering is a test. That's all it is. Suffering is the true test of life.",
    "Life isn't always about doing the things we like to do. It's about doing things we have to do.",
    "When you think you're done, you're only at 40% of your total potential."
  ];

  const quoteContainer = document.querySelector('.slider');
  
  quotes.forEach(function(quote) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.textContent = quote;
    quoteContainer.appendChild(slide);
  });
});
