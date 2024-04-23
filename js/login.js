/**
 *  This function opens the sign up menu and hides the log in menu, by adding and removing the class "display-none"
 */
function openSignUpMenu() {
    document.getElementById('login-feld').classList.add('display-none');
    document.getElementById('login-signup-box-footer').classList.add('display-none');
    document.getElementById('login-signup-box-header').classList.add('display-none');
    document.getElementById('signup-feld').classList.remove('display-none');
}


/**
 *  This function opens the log in menu and hides the sign up menu, by adding and removing the class "display-none"
 */
function openLogInMenu() {
    document.getElementById('login-feld').classList.remove('display-none');
    document.getElementById('login-signup-box-footer').classList.remove('display-none');
    document.getElementById('login-signup-box-header').classList.remove('display-none');
    document.getElementById('signup-feld').classList.add('display-none');
}

function login() {

}

function signup() {

}


function changePasswordIcon(idIcon) {
    let passwordInputIcon = document.getElementById(idIcon);
    if (passwordInputIcon.src.endsWith('lock.svg')) {
        passwordInputIcon.src = `./../assets/img/visibility-off.svg`;
        passwordInputIcon.style.cursor = 'pointer';
    }
}

function resetPasswordIcon(idIcon, idInput) {
    let input = document.getElementById(idInput).value;
    if (input.length == 0) {
        let passwordInputIcon = document.getElementById(idIcon);
        passwordInputIcon.src = `./../assets/img/lock.svg`;
        passwordInputIcon.style.cursor = 'default';
    }
}

function test() {
    console.log('test succes')
}

function changePasswordVisibility(idIcon, idInput) {
    let passwordInputIcon = document.getElementById(idIcon);
    let input = document.getElementById(idInput);
    if (input.value.length > 0) {
        if (passwordInputIcon.src.endsWith('visibility-off.svg')) {
            passwordInputIcon.src = `./../assets/img/visibility-on.svg`;
            input.type = 'text'
            passwordInputIcon.style.cursor = 'pointer';
        } else {
            passwordInputIcon.src = `./../assets/img/visibility-off.svg`;
            input.type = 'password'
            passwordInputIcon.style.cursor = 'pointer';
        }
    }
}