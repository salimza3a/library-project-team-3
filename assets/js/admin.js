$(document).ready(function () {
  //  =========================
  //   LOGIN PROCESSING CODES.
  // ==========================

  let adminLoginDataBranch = database.ref('/admin');
  let adminUsername;
  let adminPassword;

  adminLoginDataBranch.on('value', function (data) {
    adminUsername = data.val().username;
    adminPassword = data.val().password;
    const failBox = $("#fails-box");

    function checkLocal() {
      let isHave = localStorage.getItem("isLogged");

      if (isHave !== null) {
        document.title = "Welcome to Admin Page | Library Book Store";
        directLogin();
        return;
      }
      $(".admin-login-area").attr("id", "admin-panel-show");
    }
    checkLocal();

    $("#login-btn").on("click", checkLoginInformations);

    function checkLoginInformations(e) {
      e.preventDefault();
      let username = $("#userName").val();
      let password = $("#password").val();

      if (username !== adminUsername) {
        //username&password wrong
        if (password !== adminPassword) {
          failBox.addClass("alert-danger");
          failBox.text("Username & Password wrong!");
          failBox.fadeIn(400);
          failBox.fadeOut(1800);
          return;
        } else {
          //only username wrong
          failBox.addClass("alert-danger");
          failBox.text("Username wrong!");
          failBox.fadeIn(400);
          failBox.fadeOut(1800);
          return;
        }
      } else if (password !== adminPassword) {
        //password & username wrong.
        if (username !== adminUsername) {
          failBox.addClass("alert-danger");
          failBox.text("Username & Password wrong!");
          failBox.fadeIn(400);
          failBox.fadeOut(1800);
          return;
        } else {
          //only password wrong.
          failBox.addClass("alert-danger");
          failBox.text("Password wrong!");
          failBox.fadeIn(400);
          failBox.fadeOut(1800);
          return;
        }
      }
      localStorage.setItem("isLogged", true);
      login();
    }

    function login() {
      $(".admin-login-area").attr("id", "admin-login-hide");
      $(".admin-area").removeClass("hide");
      $(".admin-area").addClass("show");
    }

    function directLogin() {
      $(".admin-area").removeClass("hide");
      $(".admin-area").addClass("show");
    }

    $("#userName").on("input", function () {
      if (charLimit(this.value)) {
        failBox.addClass("alert-danger");
        failBox.text("Username length greater than 15");
        failBox.fadeIn(400);
        this.value = "";
        failBox.fadeOut(1800);
      }
    });

    $("#password").on("input", function () {
      if (charLimit(this.value)) {
        failBox.addClass("alert-danger");
        failBox.text("Password length greater than 15");
        failBox.fadeIn(400);
        this.value = "";
        failBox.fadeOut(1800);
      }
    });

    function charLimit(count) {
      if (count.length >= 15) {
        return true;
      }
    }
    //logout and isLogged deleted from Local Storage & reload page.
    $("#admin-logout").on("click", function () {
      let prompt = confirm("Really Logout?");
      if (prompt) {
        localStorage.removeItem("isLogged");
        window.location.reload();
      }
    });
  });

  //  ================================
  //   LOGIN PROCESSING FULLY COMPLETE.
  // ==================================

  // Google BOOKS API
  $("#searchBookBtn").on("click", searchBook);

  function searchBook() {
    let bookName = $("#searchThisBookName").val();
    if (bookName === "") {
      $("#searchThisBookName").val("Please fill here!");
      return;
    }

    let query = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;
    let data = [];
    let booksContainerDiv = $(".founded-books");
    let idx = 0;

    function incrementIdx() {
      idx++;
      return "";
    }

    $.ajax({
      type: "GET",
      url: query,
    }).done((res) => {
      data = Object.values(res.items);
      let searchData = [];
      for (let book of data) {
        searchData.push([
          book.volumeInfo.authors === undefined ?
          '<span class="not-found-author">Müəllif tapılmadı<span>' :
          book.volumeInfo.authors,
          book.volumeInfo.title,
        ]);
      }

      booksContainerDiv.html(
        searchData.map(
          (items) =>
          `
                <button id="founded-item" class="book-item" data-json="${encodeURIComponent(
                  JSON.stringify(data[idx])
                )}">
                    <span><i class="fa fa-history" aria-hidden="true"></i></span> 
                    ${items.map((item) => item).join(" - ")}
                 </button>
                ${incrementIdx()}
                `
        )
      );
    });
  }

  $(document).on("click", ".book-item", function () {
    let jsonData = JSON.parse(decodeURIComponent($(this).data("json")));
    console.log(jsonData);

    $("#bookName").val(
      jsonData.volumeInfo.title === undefined ?
      "Title not found!" :
      jsonData.volumeInfo.title
    );
    $("#authorName").val(
      jsonData.volumeInfo.authors === undefined ?
      "Author not found!" :
      jsonData.volumeInfo.authors
    );

    $("#imageUrl").val(
      jsonData.volumeInfo.imageLinks.thumbnail === undefined ?
      "Book image not found!" :
      jsonData.volumeInfo.imageLinks.thumbnail
    );

    $("#publicationYear").val(
      jsonData.volumeInfo.publishedDate === undefined ?
      "Book published year not found!" :
      jsonData.volumeInfo.publishedDate.substring(0, 4)
    );
    $("#searchDescription").val(
      jsonData.volumeInfo.description === undefined ?
      "Description not found!" :
      jsonData.volumeInfo.description
    );
  });
  // Join us model part

  joinUsBranch.on("value", function (snap) {
    let data = snap.val();



    Object.values(data).map((item) => {

      renderPage(item)
    });


    // renderPage(obj);

  });
  let index = 0;

  function renderPage(obj) {
    index++;
    let joinUsPartTable = $("#vitalTable tbody");
    let tag = `<tr>
     <th>${index}</th>
     <td>${obj.name}</td>
     <td>${obj.email}</td>
     
     </tr> `
    joinUsPartTable.append(tag);







  }


  // contact us section 
  contactUsBranch.on("value", function (snap) {
    let data = snap.val()
    console.log(data);
    Object.values(data).map(item => renderContactUsSection(item));
  })


  let indexOfContactUs = 0;

  function renderContactUsSection(obj) {
    let contactUsSection = $("#contact-table");
    indexOfContactUs++;
    let tag = `<tr>
     <th>${indexOfContactUs}</th>
     <td>${obj.fullName}</td>
     <td>${obj.address}</td>
     <td>${obj.email}</td>
     <td>${obj.phone}</td>
     
     </tr> `

    contactUsSection.append(tag)
  }




  // About Store Part

  $("#aboutStoreBtn").on("click", writeDatasToFirebase)
  // Please give an alert it  just works when user fill in forms completely
  let aboutStoreBranch = database.ref("/about-store")

  function writeDatasToFirebase() {
    let bookTitle = $("#bookTitle").val();
    let bookImageUrl = $("#bookImageUrl").val();
    let bookDescription = $("#bookDescription").val();
    console.log(bookTitle, bookImageUrl, bookDescription)
    aboutStoreBranch.update({
      bookTitle,
      bookImageUrl,
      bookDescription
    })
    bookTitle = $("#bookTitle").val("");
    bookImageUrl = $("#bookImageUrl").val("");
    bookDescription = $("#bookDescription").val("");
  }







  // Add new Item to catalog and write them to firebase
  $("#addBookCatalogBtn").on("click", addNewCatalogItem);
  let bookFormCatalogBranch = database.ref("/book_catalog");

  function addNewCatalogItem(e) {
    e.preventDefault();

    let newItem = $("#newCatalogItem").val();

    $("#exampleFormControlSelect1").append(`<option value=""> ${newItem} </option>`)

    bookFormCatalogBranch.push().set({
      "catalog-name": newItem
    });

    newItem = $("#newCatalogItem").val("");

  }




  // Book Form Part
  let bookFormBranch = database.ref("/book_form")
  $("#bookFormBtn").on("click", writeAllBookFormDataToFirebase)

  function writeAllBookFormDataToFirebase() {

    let bookFormBookName = $("#bookName").val();
    let bookFormAuthorName = $("#authorName").val();
    let bookFormImageUrl = $("#imageUrl").val();
    let bookFormPublicationYear = $("#publicationYear").val();
    let bookFormNewCheckBox = $("#formCheck");
    let bookFormBookDescription = $("#searchDescription").val()
    let bookFormCatalogSelect = $("#exampleFormControlSelect1").val();


    bookFormBranch.push().set({
      "name": bookFormBookName,
      "author": bookFormAuthorName,
      "image": bookImageUrl,
      "publication year": bookFormPublicationYear,
      "isNew": bookFormNewCheckBox,
      "description": bookDescription,
      "catalog name": bookFormCatalogSelect
    })

    bookFormBookName = $("#bookName").val("");
    bookFormAuthorName = $("#authorName").val("");
    bookFormImageUrl = $("#imageUrl").val("");
    bookFormPublicationYear = $("#publicationYear").val("");
    bookFormNewCheckBox = $("#formCheck");
    bookFormBookDescription = $("#searchDescription").val("")
    bookFormCatalogSelect = $("#exampleFormControlSelect1").val("");
  }


  let bookContent = $("#content");
  let bookImage = $("#image img")

  aboutStoreBranch.once("value", function (snap) {
    let bookData = snap.val();
    bookContent.html(bookData.bookDescription)
    bookImage.attr("src", bookData.bookImageUrl)
  });
});