const postForm = document.getElementById('post-form');

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(postForm);
  const response = await fetch('/submit', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    // Handle success, e.g., display a success message
  } else {
    // Handle error, e.g., display an error message
  }
});
