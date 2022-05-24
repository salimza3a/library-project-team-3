//TASK: write a function and this checking <form> after write DataBase(firebase)


$('#contactUsBtn').on('click', processForm);

let contactUsBranch = database.ref("/contact_us")
function processForm(e){
    e.preventDefault();
    let fullName = $("#fullname").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let phone = $("#phone").val()


    contactUsBranch.push().set({fullName,email,address,phone})
    
     fullName = $("#fullname").val("");
     email = $("#email").val("");
     address = $("#address").val("");
     phone = $("#phone").val("")
}