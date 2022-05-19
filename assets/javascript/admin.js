$(document).ready(function(){

    //1. check local storage if user already logged.
//2. otherwise fetch userName&password and compare.

//for testing.

/* { */

//login checking

const testUsername= "admin";
const testPassword = 'team3';
const failBox = $('#fails-box');

function checkLocal(){
    let isHave = localStorage.getItem('isLogged');
    
    if(isHave !== null){
        document.title = 'Welcome to Admin Page'
        $('.admin-login-area').addClass('hide');
        directLogin();
    }
}
checkLocal();

function checkLoginInformations(e){
    e.preventDefault();
    let username = $('#userName').val();
    let password = $('#password').val();

    if(username !== testUsername){
        failBox.addClass('alert-danger');
        failBox.text('Username wrong!');
        failBox.fadeIn(400);
        setTimeout(() => failBox.fadeOut(900), 1300);
    }
    if(password !== testPassword){
        failBox.addClass('alert-danger');
        failBox.text('Password wrong!');
        failBox.fadeIn(400);    
        setTimeout(() => failBox.fadeOut(900), 1300);
    }
    if(password !== testPassword && username !== testUsername){
        failBox.addClass('alert-danger');
        failBox.text('Username and Password wrong!');
        failBox.fadeIn(400);
        setTimeout(() => failBox.fadeOut(900), 1300);
    }else{
        localStorage.setItem('isLogged',true);
    }
}

$('#login-btn').on('click', checkLoginInformations);

function login(){
    $('.admin-login-area').html('').fadeIn(100);
    $('.admin-login-area').fadeOut(400);
    $('.admin-area').fadeIn(400);
}

function directLogin(){
    $('.admin-area').fadeIn(400);
}

$('#userName').on('input', function() {
    if(charLimit(this.value)){
        failBox.addClass('alert-danger');
        failBox.text('Username length greater than 10');
        failBox.fadeIn(400);
        this.value = '';
        setTimeout(() => failBox.fadeOut(900), 1300);
    }
});

$('#password').on('input', function() {
    if(charLimit(this.value)){
        failBox.addClass('alert-danger');
        failBox.text('Password length greater than 10');
        failBox.fadeIn(400);
        this.value = '';
        setTimeout(() => failBox.fadeOut(900), 1300);
    }
});

function charLimit(count){
    if(count.length >= 10){
        return true;
    }
}

/* } */ 

//end login checking.


//admin panel

});