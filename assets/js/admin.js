$(document).ready(function () {
    //  =========================
    //   LOGIN PROCESSING CODES.
    // ==========================

    const testUsername = "admin";
    const testPassword = 'team3';
    const failBox = $('#fails-box');

    function checkLocal() {
        let isHave = localStorage.getItem('isLogged');

        if (isHave !== null) {
            document.title = 'Welcome to Admin Page | Library Book Store';
            directLogin();
            return;
        }
        $('.admin-login-area').attr('id', 'admin-panel-show');
    }
    checkLocal();

    $('#login-btn').on('click', checkLoginInformations);

    function checkLoginInformations(e) {
        e.preventDefault();
        let username = $('#userName').val();
        let password = $('#password').val();

        if (username !== testUsername) {
            //username&password wrong
            if (password !== testPassword) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            } else {
                //only username wrong
                failBox.addClass('alert-danger');
                failBox.text('Username wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            }
        } else if (password !== testPassword) {
            //password & username wrong.
            if (username !== testUsername) {
                failBox.addClass('alert-danger');
                failBox.text('Username & Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800)
                return;
            } else {
                //only password wrong.
                failBox.addClass('alert-danger');
                failBox.text('Password wrong!');
                failBox.fadeIn(400);
                failBox.fadeOut(1800);
                return;
            }
        }
        localStorage.setItem('isLogged', true);
        login();
    }

    function login() {
        $('.admin-login-area').attr('id', 'admin-login-hide');
        $('.admin-area').removeClass('hide');
        $('.admin-area').addClass('show');
    }

    function directLogin() {
        $('.admin-area').removeClass('hide');
        $('.admin-area').addClass('show');
    }

    $('#userName').on('input', function () {
        if (charLimit(this.value)) {
            failBox.addClass('alert-danger');
            failBox.text('Username length greater than 15');
            failBox.fadeIn(400);
            this.value = '';
            failBox.fadeOut(1800);
        }
    });

    $('#password').on('input', function () {
        if (charLimit(this.value)) {
            failBox.addClass('alert-danger');
            failBox.text('Password length greater than 15');
            failBox.fadeIn(400);
            this.value = '';
            failBox.fadeOut(1800);
        }
    });

    function charLimit(count) {
        if (count.length >= 15) {
            return true;
        }
    }
    //logout and isLogged deleted from Local Storage & reload page.
    $('#admin-logout').on('click', function () {
        let prompt = confirm('Really Logout?');
        if (prompt) {
            localStorage.removeItem('isLogged');
            window.location.reload();
        }
    });

    //  ================================
    //   LOGIN PROCESSING FULLY COMPLETE.
    // ==================================    



    // Google BOOKS API
    $('#searchBookBtn').on('click', searchBook);

    function searchBook() {
        let bookName = $('#searchThisBookName').val();
        if (bookName === '') {
            $('#searchThisBookName').val('Please fill here!');
            return;
        }

        let query = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;
        let data = [];
        let booksContainerDiv = $('.founded-books');
        let idx = 0;

        function incrementIdx() {
            idx++;
            return '';
        }

        $.ajax({
            type: 'GET',
            url: query
        }).done(res => {
            data = Object.values(res.items);
            let searchData = [];
            for (let book of data) {
                searchData.push([
                    book.volumeInfo.authors === undefined ? '<span class="not-found-author">Müəllif tapılmadı<span>' : book.volumeInfo.authors, book.volumeInfo.title
                ]);
            }

            booksContainerDiv.html(searchData.map(items =>
                `
                <button id="founded-item" class="book-item" data-json="${encodeURIComponent(JSON.stringify(data[idx]))}">
                    <span><i class="fa fa-history" aria-hidden="true"></i></span> 
                    ${items.map(item => item).join(' - ')}
                 </button>
                ${incrementIdx()}
                `
            ));
        });
    }

    $(document).on('click', '.book-item', function () {
        let jsonData = JSON.parse(decodeURIComponent($(this).data("json")));
        console.log(jsonData);

        $("#bookName").val(
            jsonData.volumeInfo.title === undefined ? 'Title not found!' : jsonData.volumeInfo.title
        );
        $('#authorName').val(
            jsonData.volumeInfo.authors === undefined ? 'Author not found!' : jsonData.volumeInfo.authors
        );

        $('#imageUrl').val(
            jsonData.volumeInfo.imageLinks.thumbnail === undefined ? 'Book image not found!' : jsonData.volumeInfo.imageLinks.thumbnail
        );

        $('#publicationYear').val(
            jsonData.volumeInfo.publishedDate.substring(0, 4) === undefined ? 'Book published year not found!' : jsonData.volumeInfo.publishedDate
        );
        $('#searchDescription').val(
            jsonData.volumeInfo.description === undefined ? 'Description not found!' : jsonData.volumeInfo.description
        )
    })

});