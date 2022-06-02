//TASK: write a function and this checking <form> after write DataBase(firebase)


$('#contactUsBtn').on('click', processForm);

let contactUsBranch = database.ref("/contact_us")

function processForm(e) {
    e.preventDefault();
    let fullName = $("#fullname").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let phone = $("#phone").val()
    let failBox = 2;
    
    

    contactUsBranch.push().set({
        fullName,
        email,
        address,
        phone
    })

    fullName = $("#fullname").val("");
    email = $("#email").val("");
    address = $("#address").val("");
    phone = $("#phone").val("")
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
    if ($('#phone').attr('placeholder') === '040 123 45 67') {//wrong placeholder
        $('#phone').attr('placeholder', '050 525 90 55');//true placeholder
    }
}
setInterval(azPhone, 1);