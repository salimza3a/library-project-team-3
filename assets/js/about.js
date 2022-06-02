$(document).ready(function () {
    let aboutBranch = database.ref('/about_store');
    let aboutStoreInfo;
    aboutBranch.on("value", function (snap) {
        aboutStoreInfo = snap.val();
    });
    setTimeout(printDOM, 1300);
    
    function printDOM() {
        console.log(aboutStoreInfo);
        $('#about-container').html(
            `
            <div id="about-title">
                ${aboutStoreInfo.bookTitle}
            </div>
                <div id="about-boxes">
        
            <div id="content">
              <div id="about-title-mobile">
              ${aboutStoreInfo.bookTitle}
              </div>
                ${aboutStoreInfo.bookDescription}
            </div>
            <div id="image">
                <img src="${aboutStoreInfo.bookImageUrl}" alt="About Image">
            </div>
        </div>        
        
        `
        );
    }
});

