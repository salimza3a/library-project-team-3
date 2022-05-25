// connect Db and fetch dates




// Please separete these line codes below 
// Please look at them when these codes work the image width happens like a default


let bookContent = $("#content");
let bookImage = $("#image img")

aboutStoreBranch.once("value", function (snap) {
    let bookData = snap.val()
    console.log("param",bookData)

    bookContent.html(bookData.bookDescription)
    bookImage.attr("src", bookData.bookImageUrl)

})