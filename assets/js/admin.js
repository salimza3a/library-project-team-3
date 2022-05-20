//1. check local storage if user already logged+[done]

//2. otherwise get userName&password from input and compare+[done]

//3. get admin password and username from Database-[fail yet]


//login checking


$(document).ready(function () {
    const testUsername = "admin";
    const testPassword = 'team3';
    const failBox = $('#fails-box');

    function checkLocal() {
        let isHave = localStorage.getItem('isLogged');

        if (isHave !== null) {
            document.title = 'Welcome to Admin Page'
            directLogin();
        }
    }
    checkLocal();

    function checkLoginInformations(e) {
        e.preventDefault();
        let username = $('#userName').val();
        let password = $('#password').val();

        if (username !== testUsername) {
            if (password !== testPassword) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                setTimeout(() => failBox.fadeOut(900), 1300);
                return;
            } else {
                failBox.addClass('alert-danger');
                failBox.text('Username wrong!');
                failBox.fadeIn(400);
                setTimeout(() => failBox.fadeOut(900), 1300);
                return;
            }
        } else if (password !== testPassword) {
            if (username !== testUsername) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                setTimeout(() => failBox.fadeOut(900), 1300);
                return;
            } else {
                failBox.addClass('alert-danger');
                failBox.text('Password wrong!');
                failBox.fadeIn(400);
                setTimeout(() => failBox.fadeOut(900), 1300);
                return
            }
        }
        localStorage.setItem('isLogged', true);
        login();
    }

    $('#login-btn').on('click', checkLoginInformations);

    function login() {
        $('.admin-login-area').html('');
        $('.admin-login-area').fadeOut(400);
        $('.admin-panel').fadeIn(400);
    }

    function directLogin() {
        $('.admin-panel').fadeIn(400);
    }

    $('#userName').on('input', function () {
        if (charLimit(this.value)) {
            failBox.addClass('alert-danger');
            failBox.text('Username length greater than 15');
            failBox.fadeIn(400);
            this.value = '';
            setTimeout(() => failBox.fadeOut(900), 1300);
        }
    });

    $('#password').on('input', function () {
        if (charLimit(this.value)) {
            failBox.addClass('alert-danger');
            failBox.text('Password length greater than 15');
            failBox.fadeIn(400);
            this.value = '';
            setTimeout(() => failBox.fadeOut(900), 1300);
        }
    });

    function charLimit(count) {
        if (count.length >= 15) {
            return true;
        }
    }
    
    //admin panel

});