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
            document.title = 'Welcome to Admin Page | Library Book Store';
            directLogin();
            return;
        }
        $('.admin-login-area').attr('id', 'admin-panel-show');
    }
    checkLocal();

    $('#login-btn').on('click', checkLoginInformations);

    function checkLoginInformations(e) {
        e.preventDefault();
        let username = $('#userName').val();
        let password = $('#password').val();

        if (username !== testUsername) {
            //username&password wrong
            if (password !== testPassword) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            } else {
                //only username wrong
                failBox.addClass('alert-danger');
                failBox.text('Username wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            }
        } else if (password !== testPassword) {
            //password & username wrong.
            if (username !== testUsername) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800)
                return;
            } else {
                //only password wrong.
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

    function login() {
        $('.admin-login-area').attr('id', 'admin-login-hide');
        $('.admin-area').removeClass('hide');
        $('.admin-area').addClass('show');
    }

    function directLogin() {
        $('.admin-area').removeClass('hide');
        $('.admin-area').addClass('show');
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
    //logout and isLogged deleted from Local Storage & reload page.
    $('#admin-logout').on('click', function () {
        let prompt = confirm('Really Logout?');
        if (prompt) {
            localStorage.removeItem('isLogged');
            window.location.reload();
        }
    });

    //  ================================
    //   LOGIN PROCESSING FULLY COMPLETE.
    // ==================================

    //=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    // ===================================
    // MAIN CODES HERE, BOOK API + FIREBASE
    //====================================

    //_+_+_+_+_+_+_
    //query
    //Salim connect this API: https://www.googleapis.com/books/v1/volumes?q=flowers, and try to using on admin.html

    //_+_+_+_+_+_+_
});