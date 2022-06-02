//TASK: write a function and this checking <form> after write DataBase(firebase)


$('#contactUsBtn').on('click', processForm);

let contactUsBranch = database.ref("/contact_us")

function processForm(e) {
    e.preventDefault();
    let fullName = $("#fullname").val().trim();
    let email = $("#email").val().trim();
    let address = $("#address").val().trim();
    let phone = $("#phone").val().trim();

    const INTERVAL = 2300;


    if (!fullName) {
        $('#fullname').css({
            border: '1px solid #ff0000'
        });
        $('#fullname').attr('placeholder', 'Requiered! Write a corrent Full Name');
        setTimeout(() => {
            $('#fullname').css({
                border: '1px solid #ced4da'
            });
            $('#fullname').attr('placeholder', 'Full Name');
        }, INTERVAL);
        return;
    } else if (!email) {
        $('#email').css({
            border: '1px solid #ff0000'
        });
        $('#email').attr('placeholder', 'Requiered! Write a corrent Email');
        setTimeout(() => {
            $('#email').css({
                border: '1px solid #ced4da'
            });
            $('#email').attr('placeholder', 'Email');
        }, INTERVAL);
        return;
    } else if (!address) {
        $('#address').css({
            border: '1px solid #ff0000'
        });
        $('#address').attr('placeholder', 'Requiered! Write a corrent Address');
        setTimeout(() => {
            $('#address').css({
                border: '1px solid #ced4da'
            });
            $('#address').attr('placeholder', 'Address');
        }, INTERVAL);
        return;
    } else if (!phone) {
        $('#phone').css({
            border: '1px solid #ff0000'
        });
        $('#phone').attr('placeholder', 'Requiered! Write a corrent Phone');
        setTimeout(() => {
            $('#phone').css({
                border: '1px solid #ced4da'
            });
            $('#phone').attr('placeholder', 'Phone');
        }, INTERVAL);
        return;
    }

    contactUsBranch.push().set({
        fullName,
        email,
        address,
        phone
    })

    fullName = $("#fullname").val("");
    email = $("#email").val("");
    address = $("#address").val("");
    phone = $("#phone").val("");

    $('#fullname').css({
        border: '1px solid #00ff00'
    });
    $('#fullname').attr('placeholder', 'OK');
    setTimeout(() => {
        $('#fullname').css({
            border: '1px solid #ced4da'
        });
        $('#fullname').attr('placeholder', 'Full Name');
    }, INTERVAL);
    $('#email').css({
        border: '1px solid #00ff00'
    });
    $('#email').attr('placeholder', 'OK');
    setTimeout(() => {
        $('#email').css({
            border: '1px solid #ced4da'
        });
        $('#email').attr('placeholder', 'Email');
    }, INTERVAL);
    $('#address').css({
        border: '1px solid #00ff00'
    });
    $('#address').attr('placeholder', 'OK');
    setTimeout(() => {
        $('#address').css({
            border: '1px solid #ced4da'
        });
        $('#address').attr('placeholder', 'Address');
    }, INTERVAL);
    $('#phone').css({
        border: '1px solid #00ff00'
    });
    $('#phone').attr('placeholder', 'OK');
    setTimeout(() => {
        $('#phone').css({
            border: '1px solid #ced4da'
        });
        $('#phone').attr('placeholder', 'Phone');
    }, INTERVAL);
}


//intl-tel plugin
const input = document.querySelector("#phone");

window.intlTelInput(input, {
    initialCountry: "az",
    nationalMode: true,
    onlyCountries: ['us', 'gb', 'fr', 'ua', 'ir', 'tr', 'az', 'ru'],
    utilsScript: "build/js/utils.js",
});

function azPhone() {
    if ($('#phone').attr('placeholder') === '040 123 45 67') { //wrong placeholder
        $('#phone').attr('placeholder', '050 525 90 55'); //true placeholder
    }
}
setInterval(azPhone, 1);