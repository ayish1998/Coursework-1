//dashboard toggle
function toggleFormVisibility() {
    var form = document.getElementById('event-form');
    if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
  }