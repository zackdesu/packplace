const checkbox = document.querySelector('#showPassword');
const password = document.querySelector('#password')
    
    
    checkbox.addEventListener('click', function() {
        if(this.checked){
            password.type = "text"
        } else{
            password.type = "password"
        }
    })