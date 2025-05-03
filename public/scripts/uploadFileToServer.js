document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');

  uploadButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    
    if (!file) {
      alert("Оберіть, будь ласка, файл");
      
      return;
    }

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        headers: {
          'file-name': encodeURIComponent(file.name),
        },
        body: file,
      });

      const message = await response.text();

      if (response.ok) {
        alert(message);

        location.reload(); 
      } else {
        alert(message); 
      }
    } catch (error) {
      alert("Помилка при завантаженні файлу");
    }
  });
});

