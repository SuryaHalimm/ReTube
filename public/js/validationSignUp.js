const showPassword = document.querySelector('.show-password'),
    createPw = document.querySelector('#createPw'),
    confirmPw = document.querySelector('#confirmPw'),
    name = document.querySelector('.name'),
    userName = document.querySelector('.username'),
    message = document.querySelector('#errorPw');

function clear() {
    document.getElementById('signup').reset();
}

/* Password Validation */
confirmPw.addEventListener('input', () => {
    if (confirmPw.value != createPw.value) {
        message.textContent = "Passwords don't match!";
        message.style.color = 'ff4d4d';
        document
            .querySelector('#signupbutton')
            .setAttribute('disabled', true);
    } else {
        message.textContent = '';
        document.querySelector('#signupbutton').removeAttribute('disabled');
    }
});

createPw.addEventListener('input', () => {
    if (confirmPw.value != createPw.value) {
        message.textContent = "Passwords don't match!";
        message.style.color = 'ff4d4d';
        document
            .querySelector('#signupbutton')
            .setAttribute('disabled', true);
    } else {
        message.textContent = '';
        document.querySelector('#signupbutton').removeAttribute('disabled');
    }
});
showPassword.addEventListener('click', () => {
    if (createPw.type === 'password' && confirmPw.type === 'password') {
        createPw.type = 'text';
        confirmPw.type = 'text';
        showPassword.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        createPw.type = 'password';
        confirmPw.type = 'password';
        showPassword.classList.replace('fa-eye', 'fa-eye-slash');
    }
});