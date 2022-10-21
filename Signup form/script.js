const email = document.querySelector('#email');
const pwd = document.querySelector('#password');
const cpwd = document.querySelector('#cpassword');
const phone = document.querySelector('#phone');
const submit = document.querySelector('#form__submit');


let checkPwd = (e) => {
    if(pwd.value != cpwd.value){
        e.preventDefault();
        pwd.classList.add('error');
        cpwd.classList.add('error');
    }
    else{
        pwd.classList.remove('error');
        cpwd.classList.remove('error');
    }
}

submit.addEventListener('click', checkPwd);