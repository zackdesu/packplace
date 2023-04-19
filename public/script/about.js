const confirmationInput = document.getElementById('confirmationName');
const username = document.getElementById('name');
const deleteButton = document.getElementById('deleteButton');
    
    confirmationInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });

    confirmationInput.addEventListener('input', function() {
      if (confirmationInput.value === username.value) {
        deleteButton.classList.remove('disabled');
      } else {
        deleteButton.classList.add('disabled');
      }
    });
    