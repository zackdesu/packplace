try{
    const checkbox = document.querySelector('#showPassword');
    const password = document.querySelector('#password')
    
    
    checkbox.addEventListener('click', function() {
        if(this.checked){
            password.type = "text"
        } else{
            password.type = "password"
        }
    })
} catch(err){ console.log (err) }

try {
    const confirmationInput = document.getElementById('confirmationName');
    const name = document.getElementById('name');
    const deleteButton = document.getElementById('deleteButton');
    
    confirmationInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') { // kode tombol Enter adalah 13
          event.preventDefault(); // mencegah event "keydown" bawaan
        }
      });
    console.log(confirmationInput, name, deleteButton)

    confirmationInput.addEventListener('input', function() {
      if (confirmationInput.value === name.value) {
        deleteButton.classList.remove('disabled');
      } else {
        deleteButton.classList.add('disabled');
      }
    });
    
} catch (err) {
    console.log(err)
}