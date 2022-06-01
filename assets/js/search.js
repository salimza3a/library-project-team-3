//results


let books;
let booksBranch = database.ref('/books');

booksBranch.on("value", function (snap) {
    books = Object.values(snap.val());
});

$(document).ready(function () {


    $('#results').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: `<button>PREVIOUS</button>`,
        nextArrow: `<button>NEXT</button>`,
        speed: 300,
        autoplay: true,
    });



    $('#search-book-name-btn').on('click', searchBook);

    function searchBook(event) {
        event.preventDefault();
        let bookTitle = $('#book-name').val();

        if (bookTitle === '') {
            $('#book-name').attr('placeholder', 'Empty!');
            $('#book-name').css('border', '2px solid #FF0000');
            setTimeout(() => {
                $('#book-name').css('border', '2px solid #ccc');
                $('#book-name').attr('placeholder', 'Book Name')
            }, 1800);
            return;
        } else if (books === undefined) {
            return;
        }

        let results = [];

        for (let book of books) {
            if (book.name.toLowerCase().indexOf(bookTitle.toLowerCase()) !== -1) {
                results.push(book);
                continue;
            }
        }

        if (results.length === 1) {
            $('#results').html(results.map(book =>
                ` 
            <div id="result">
                <div id="result-image">
                    <img src="${book.image}" alt="Founded Result Image">
                </div>

                <div id="result-details">
                    <h3 id="book-title">
                        ${book.name}
                    </h3>
                    <h4 id="book-author">
                        ${book.author}
                    </h4>
                    <div id="book-desc">
                        ${book.description}
                    </div>
                </div>
            </div> 
            `));
            return;
        } else if (results.length === 0) {
            $('#results').html(`
                <div class="book-not-found">
                    <p>The book "${bookTitle}" not found in our store.</p>
                    <div id="close" onclick="$('.book-not-found').hide(300);">&times;</div>
                </div>
            `);
            return;
        } else {
            $('#results').html(results.map(book =>
                ` 
                <div id="result" class="aslider">
                    <div id="result-image">
                        <img src="${book.image}" alt="Founded Result Image">
                    </div>

                    <div id="result-details">
                        <h3 id="book-title">
                            ${book.name}
                        </h3>
                        <h4 id="book-author">
                            ${book.author}
                        </h4>
                        <div id="book-desc">
                            ${book.description}
                        </div>
                    </div>
                </div> 
            `));
            return;
        }
    }
});

// prevArrow: `<button type="button" class="slick-prev"><img src="./assets/images/icons/next.svg"/></button>`,
// nextArrow: `<button type="button" class="slick-next"><img src="./assets/images/icons/previous.svg"/></button>`,
// speed: 300,
// autoplay: true,