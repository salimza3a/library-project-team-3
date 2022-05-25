//TASK: write a function and this checking <form> after write DataBase(firebase)


$('#contactUsBtn').on('click', processForm);

let contactUsBranch = database.ref("/contact_us")
function processForm(e){
    e.preventDefault();
    let fullName = $("#fullname").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let phone = $("#phone").val()

    if(fullName.trim() == "" || email.trim() == "" || address.trim() == "" ||  phone.trim() == "") {
        $(".contact-failbox").addClass("alert-danger")
        $(".contact-failbox").html("<h4>Error </h4>  <p>Please check all information again </p>")
        $(".contact-failbox").fadeIn(500)
        $(".contact-failbox").fadeOut(1500)
        return 

    } else {
        contactUsBranch.push().set({fullName,email,address,phone})
        fullName = $("#fullname").val("");
        email = $("#email").val("");
        address = $("#address").val("");
        phone = $("#phone").val("")
   
   
    }
    

    
    
    
     
     

}