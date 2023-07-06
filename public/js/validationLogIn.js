const showPass = document.querySelector('.show-pass'),
    pW = document.querySelector('#pW');

function clear() {
    document.getElementById('signup').reset();
}

/* Reveals and hides password by clicking on the eye icon */
showPass.addEventListener('click', () => {
    if (pW.type === 'password') {
        pW.type = 'text';
        showPass.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        pW.type = 'password';
        showPass.classList.replace('fa-eye', 'fa-eye-slash');
    }
});