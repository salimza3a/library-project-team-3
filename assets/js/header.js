$('#join-submit-btn').on('click', processForm);
let failBox = $('#fail-box');

function processForm(event) {
    event.preventDefault();

    let name = $('#join-us-personal-name').val();
    let email = $('#join-us-personal-email').val();

    if (!name) {
        failBox.text('Name is empty!');
        failBox.fadeIn(600);
        failBox.fadeOut(2500);
        failBox.addClass('alert-danger');
        return;
    }
    if (!email) {
        failBox.text('Email is empty!');
        failBox.fadeIn(600);
        failBox.fadeOut(2500);
        failBox.addClass('alert-danger');
        return;
    }
    if (!name && !email) {
        failBox.text('Email & Name are empty!');
        failBox.fadeIn(600);
        failBox.fadeOut(2500);
        failBox.addClass('alert-danger');
        return;
    }
    if (name.length >= 20) {
        failBox.text('The Name greater than 20 character!');
        failBox.fadeIn(600);
        failBox.fadeOut(2500);
        failBox.addClass('alert-danger');
        return;
    }
    if (email.length >= 35) {
        failBox.text('The Email greater than 35 Character');
        failBox.fadeIn(600);
        failBox.fadeOut(2500);
        failBox.addClass('alert-danger');
        return;
    }
    if (email.indexOf('@') === -1) {
        failBox.text('Invalid Email! Example: Jeff@gmail.com');
        failBox.fadeIn(500);
        failBox.fadeOut(3000);
        failBox.addClass('alert-danger');
        return;
    }
    writeFirebase(name, email);
  

}


function writeFirebase(name, email) {
   
    //...wrirte DB

    failBox.removeClass('alert-danger');
    failBox.addClass('alert-primary');
    failBox.text('Thanks! Your informations successfully saved');
    failBox.fadeIn(500);
    failBox.fadeOut(3000);
    setTimeout(() => $('.modal').click(), 2800); //close join-us modal
    return;
}

$('#hamburger-btn').on('click', () => {
    $('.mobile-view').show(500).css('display', 'flex');
});

$('#close-mobile-view').on('click', () => {
    $('.mobile-view').hide(500)
});

$(function () {
    let currentLink = `header nav a[href="./${location.pathname.split("/")[1]}"]`;
    $(currentLink).addClass('current');
});