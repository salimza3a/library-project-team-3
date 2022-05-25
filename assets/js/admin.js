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
  $('.founded-books').hide(100);

  function searchBook() {
    $('.founded-books').show(300);
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

    $("#bookName").val(
      jsonData.volumeInfo.title === undefined ?
      '' :
      jsonData.volumeInfo.title
    );
    $("#authorName").val(
      jsonData.volumeInfo.authors === undefined ?
      '' :
      jsonData.volumeInfo.authors
    );

    $("#imageUrl").val(
      jsonData.volumeInfo.imageLinks.thumbnail === undefined ?
      '' :
      jsonData.volumeInfo.imageLinks.thumbnail
    );

    $("#publicationYear").val(
      jsonData.volumeInfo.publishedDate === undefined ?
      '' :
      jsonData.volumeInfo.publishedDate.substring(0, 4)
    );
    $("#searchDescription").val(
      jsonData.volumeInfo.description === undefined ?
      '' :
      jsonData.volumeInfo.description
    );
  });


  // Join us model part

  joinUsBranch.on("value", function (snap) {
    let data = snap.val();
    Object.values(data).map((item) => {
      renderPage(item)
    });
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
  let bookFormCatalogBranch = database.ref("/categories");
  $("#category-added-alert").hide();

  function addNewCatalogItem(e) {
    e.preventDefault();
    let newItem = $("#newCatalogItem").val();
    $("#exampleFormControlSelect1").append(`<option value=""> ${newItem} </option>`);

    bookFormCatalogBranch.push().set({
      "catalog_name": newItem
    });
    newItem = $("#newCatalogItem").val("");
    setTimeout(() => $('.modal').click(), 800);
    $("#category-added-alert").show(200);
  }




  // Book Form Part
  let bookFormBranch = database.ref("/books");

  $("#bookFormBtn").on("click", writeBookDataToDatabase);

  function writeBookDataToDatabase() {

    let addBookName = $("#bookName").val();
    let addBookAuthor = $("#authorName").val();
    let addBookImg = $("#imageUrl").val();
    let addBookPublicationYear = $("#publicationYear").val();
    let addIsNew = $("#formCheck").is(':checked');
    let addBookDescription = $("#searchDescription").val();
    let addBookCategory = $("#categories").val();

    if (addBookName === '') {
      $('#bookName').attr("placeholder", "Empty!");
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }
    if (addBookName === '') {
      $('#bookName').attr("placeholder", "Empty!");
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }
    if (addBookName === '') {
      $('#bookName').attr("placeholder", "Empty!");
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }
    if (addBookName === '') {
      $('#bookName').attr("placeholder", "Empty!");
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }
    if (addBookName === '') {
      $('#bookName').attr("placeholder", "Empty!");
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }
    if (addBookName === '') {
      $('#bookName').attr("placeholder", "Empty!");
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }
    if (addBookName === '') {
      $('#bookName').css('border-color', 'red');
      $('#book-added-alert').removeClass('alert-success');
      $("#book-added-alert").html('Please full fill inputs')
      $('#book-added-alert').addClass('alert-danger');
      $('#book-added-alert').fadeIn(500);
      $('#book-added-alert').fadeOut(500);
      return;
    }


    bookFormBranch.push().set({
      "name": addBookName,
      "author": addBookAuthor,
      "image": addBookImg,
      "publication_year": addBookPublicationYear,
      "isNew": addIsNew,
      "description": addBookDescription,
      "category": addBookCategory
    });
    $('#book-added-alert').html('The book successfully added');
    $('#book-added-alert').removeClass('alert-danger');
    $('#book-added-alert').addClass('alert-success');
    $('#book-added-alert').fadeIn(500);
    $('#book-added-alert').fadeOut(500);

    $("#bookName").val("");
    $("#authorName").val("");
    $("#imageUrl").val("");
    $("#publicationYear").val("");
    $("#formCheck").prop('checked', false);
    $("#searchDescription").val("")
    $("#exampleFormControlSelect1").val("");

    $('.bookForm .form-control input').css('border-color', 'green');

  }


  let bookContent = $("#content");
  let bookImage = $("#image img")

  aboutStoreBranch.once("value", function (snap) {
    let bookData = snap.val();
    bookContent.html(bookData.bookDescription)
    bookImage.attr("src", bookData.bookImageUrl)
  });

  function fetchCategories() {
    let catalogBranch = database.ref('/categories');
    catalogBranch.on('value', function (data) {
      $('#categories').html(Object.values(data.val()).map(item => `<option value="${item.catalog_name}">${item.catalog_name}</option>`));
    })
  }
  fetchCategories();

});