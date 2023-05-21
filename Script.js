document.addEventListener('DOMContentLoaded', function() {
  const workoutPlan = [
    {
      day: 'Monday',
      workout: 'Strength Training',
      duration: '60 minutes'
    },
    {
      day: 'Tuesday',
      workout: 'Cardio',
      duration: '30 minutes'
    },
    // Add more workout plan objects here
  ];

  const programBody = document.getElementById('program-body');

  workoutPlan.forEach(function(workout) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${workout.day}</td>
      <td>${workout.workout}</td>
      <td>${workout.duration}</td>
    `;
    programBody.appendChild(row);
  });
});
