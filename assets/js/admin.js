$(document).ready(function () {
    //  =========================
    //   LOGIN PROCESSING CODES.
    // ==========================

    const testUsername = "admin";
    const testPassword = 'team3';
    const failBox = $('#fails-box');

    function checkLocal() {
        let isHave = localStorage.getItem('isLogged');

        if (isHave !== null) {
            document.title = 'Welcome to Admin Page'
            directLogin();
            return;
        }
        $('.admin-login-area').removeClass('hide');
        $('.admin-login-area').addClass('show');
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
                failBox.fadeOut(1800);
                return;
            } else {
                failBox.addClass('alert-danger');
                failBox.text('Username wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            }
        } else if (password !== testPassword) {
            if (username !== testUsername) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800)
                return;
            } else {
                failBox.addClass('alert-danger');
                failBox.text('Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            }
        }
        localStorage.setItem('isLogged', true);
        login();
    }

    $('#login-btn').on('click', checkLoginInformations);
    
    function login() {
        $('.admin-login-area').html('');
        $('.admin-login-area').addClass('hide');
        $('.admin-panel').addClass('show');
    }

    function directLogin() {
        $('.admin-login-area').html('');
        $('.admin-login-area').hide(100);
        setTimeout(() =>$('.admin-panel').addClass('show'), 1000);
    }

    $('#userName').on('input', function () {
        if (charLimit(this.value)) {
            failBox.addClass('alert-danger');
            failBox.text('Username length greater than 15');
            failBox.fadeIn(400);
            this.value = '';
            failBox.fadeOut(1800);
        }
    });

    $('#password').on('input', function () {
        if (charLimit(this.value)) {
            failBox.addClass('alert-danger');
            failBox.text('Password length greater than 15');
            failBox.fadeIn(400);
            this.value = '';
            failBox.fadeOut(1800);
        }
    });

    function charLimit(count) {
        if (count.length >= 15) {
            return true;
        }
    }

    //  ================================
    //   LOGIN PROCESSING FULLY COMPLETE.
    // ==================================

    //=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    // ===================================
    // MAIN CODES HERE, BOOK API + FIREBASE
    //====================================
    
    
    //const db = firebase.init(app);
});