const server_url = 'http://localhost:5000'

document.addEventListener('DOMContentLoaded', async function () {
    current_page = window.location.pathname.split("/").pop();

    if (current_page == '' ||
        current_page == 'index.html'
    ) {
        // Managing visibility of specific elements.
        current_user_firstname = localStorage.getItem('current_user_firstname');
        current_user_lastname = localStorage.getItem('current_user_lastname');

        if (current_user_firstname !== null && current_user_lastname !== null) {
            // When logged in
            document.getElementById('logged_in').style.visibility = 'visible';
            document.getElementById('logout_button').style.visibility = 'visible';
            if (current_page != 'index.html'){
                document.getElementById('logged_in_buttons').style.visibility = 'visible';
            }
            
            document.getElementById('logged_in_name').innerHTML = current_user_firstname;
            document.getElementById('logged_in_lastname').innerHTML = current_user_lastname;

            document.getElementById('login_button').style.visibility = 'hidden';
            document.getElementById('register_button').style.visibility = 'hidden';
        } else {
            // When logged out
            document.getElementById('logged_in').style.visibility = 'hidden';
            document.getElementById('logout_button').style.visibility = 'hidden';

            document.getElementById('logged_in_name').innerHTML = '';
            document.getElementById('logged_in_lastname').innerHTML = '';

            document.getElementById('login_button').style.visibility = 'visible';
            document.getElementById('register_button').style.visibility = 'visible';
        }
    }
});


// Check if email has such syntax: smth@smth.smth
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Entering into account
async function log_in() {
    let user_email_text = document.getElementById('user_email_text').value;
    let user_password_text = document.getElementById('user_password_text').value;

    if (user_email_text == '' || user_password_text == '') {
        document.getElementById('register_error_text').innerHTML = 'Заповніть усі поля';
    } else {
        let user_info = {
            user_email: user_email_text,
            user_password: user_password_text,
            type: 'login'
        }

        let full_user_info = await fetch(server_url + '/get_user', {
            method: 'POST',
            body: JSON.stringify(user_info),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
        .then(data => data['data'][0]);

        console.log(full_user_info);

        user_firstname = full_user_info['user_firstname'];
        user_lastname = full_user_info['user_lastname'];

        console.log(user_firstname);
        console.log(user_lastname);

        location.href = 'index.html';

        localStorage.setItem('current_user_firstname', user_firstname);
        localStorage.setItem('current_user_lastname', user_lastname);
    }
}

// Recover password
async function recover_password(){
    let user_firstname_text = document.getElementById('recover_firstname_input').value;
    let user_lastname_text = document.getElementById('recover_lastname_input').value;
    let user_email_text = document.getElementById('recover_email_input').value;
    
    if (user_firstname_text == '' || user_lastname_text == '' || user_email_text == '') {
        document.getElementById('register_error_text').innerHTML = 'Заповніть усі поля';
    } else{
        let user_info = {
            user_firstname: user_firstname_text,
            user_lastname: user_lastname_text,
            user_email: user_email_text,
            type: 'recover'
        }

        let full_user_info = await fetch(server_url + '/get_user', {
            method: 'POST',
            body: JSON.stringify(user_info),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
        .then(data => data['data'][0]);

        if (!full_user_info){
            document.getElementById('register_error_text').innerHTML = 'Користувача не знайдено';
        } else{
            document.getElementById('register_error_text').style.color = 'lime';
            document.getElementById('register_error_text').innerHTML = 'Ваш пароль: "' + full_user_info['user_password'] + '"';
        }
    }
}

// Add new user to database / Register
function add_user() {
    let user_firstname_text = document.getElementById('user_firstname_text').value;
    let user_lastname_text = document.getElementById('user_lastname_text').value;
    let user_email_text = document.getElementById('user_email_text').value;
    let user_password_1_text = document.getElementById('user_password_1_text').value;
    let user_password_2_text = document.getElementById('user_password_2_text').value;

    if (user_firstname_text == '' ||
        user_lastname_text == '' ||
        user_email_text == '' ||
        user_password_1_text == '' ||
        user_password_2_text == ''
    ) {
        document.getElementById('register_error_text').innerHTML = 'Заповніть усі поля';
    } else if (!validateEmail(user_email_text)) {
        document.getElementById('register_error_text').innerHTML = 'Введено не правильну пошту. Формат: text@text.text';
    } else if (user_password_1_text != user_password_2_text) {
        document.getElementById('register_error_text').innerHTML = 'Паролі не співпадають';
    } else if (user_password_1_text.length < 8) {
        document.getElementById('register_error_text').innerHTML = 'Довжина пароля має бути більше 8-ми символів';
    } else {
        let user_info = {
            user_firstname: user_firstname_text,
            user_lastname: user_lastname_text,
            user_email: user_email_text,
            user_password: user_password_1_text
        }

        fetch(server_url + '/add_user', {
            method: 'POST',
            body: JSON.stringify(user_info),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json());

        localStorage.setItem('current_user_firstname', user_firstname_text);
        localStorage.setItem('current_user_lastname', user_lastname_text);

        location.href = 'index.html';
    }
}

// Loggint out
function log_out() {
    localStorage.removeItem('current_user_firstname');
    localStorage.removeItem('current_user_lastname');

    location.href = 'index.html';
}


/* Functions to move to services */
function to_mercedes_benz() {
    location.href = 'mercedes_benz.html';
}

function to_peugeot() {
    location.href = 'peugeot.html';
}

function to_renault() {
    location.href = 'renault.html';
}

function to_opel() {
    location.href = 'opel.html';
}

function to_rolls_royce() {
    location.href = 'rolls_royce.html';
}

function to_cadillac() {
    location.href = 'cadillac.html';
}

function to_ford() {
    location.href = 'ford.html';
}

function to_fiat() {
    location.href = 'fiat.html';
}
