// connect Db and fetch dates

$("#aboutStoreBtn").on("click", writeDatasToFirebase)
// Please give an alert it  just works when user fill in forms completely
let aboutStoreBranch = database.ref("/about-store")

function writeDatasToFirebase() {
    let bookTitle = $("#bookTitle").val();
    let bookImageUrl = $("#bookImageUrl").val();
    let bookDescription = $("#bookDescription").val();
    console.log(bookTitle, bookImageUrl, bookDescription)
    aboutStoreBranch.set({
        bookTitle,
        bookImageUrl,
        bookDescription
    })
    bookTitle = $("#bookTitle").val("");
    bookImageUrl = $("#bookImageUrl").val("");
    bookDescription = $("#bookDescription").val("");
}


// Please separete these line codes below 
// Please look at them when these codes work the image width happens like a default
// let bookContent = $("#content");
// let bookImage = $("#image img")

// aboutStoreBranch.once("value", function (snap) {
//     let bookData = snap.val()

//     bookContent.html(bookData.bookDescription)
//     bookImage.attr("src", bookData.bookImageUrl)

// })