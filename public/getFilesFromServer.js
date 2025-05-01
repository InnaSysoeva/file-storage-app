document.addEventListener('DOMContentLoaded', () => {
    fetch('/files')
      .then(response => response.json())
      .then(files => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
  
        files.forEach(file => {
          const li = document.createElement('li');
  
          const span = document.createElement('span');
          span.textContent = file;
  
          const button = document.createElement('a');
          button.textContent = 'Завантажити';
          button.href = `/uploads/${file}`;
          button.className = 'downloadButton';
          button.download = file;
  
          li.appendChild(span);
          li.appendChild(button);
          fileList.appendChild(li);
        });
      })
      .catch(error => {
        alert('Помилка під час спроби отримати файли');
      });
});  