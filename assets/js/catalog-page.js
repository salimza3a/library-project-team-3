//fetch data from FireBase
$(document).ready(function () {
  let categoriesBranch = database.ref('/categories');
  let booksBranch = database.ref('/books');

  categoriesBranch.on('value', function (categories) {
    let arr_category = Object.values(categories.val());
    $('#categories').html(arr_category.map(item => `<button class="category-btn" value="${item.catalog_name}">${item.catalog_name}</button>`));
  });




  booksBranch.on('value', function (books) {

    let arr_book = Object.values(books.val());
    $('.books').html('');

    $('.books').html(arr_book.map(item => `
  <div class="book">
  <div class="new-badge ${item.isNew === true ? 'isNew' : 'isOld'}">
      New
   </div>
    <div class="book-image">
      <img src="${item.image}" width="134px" height="190px" id="thumbnail" alt="Book preview"/>
    </div>
    <div class="book-name">
        ${item.name}
    </div>
    <div class="book-author">
        ${item.author}
    </div>
    <button type="button" class="read-more-btn" data-json="${encodeURIComponent(JSON.stringify(item))}">
        READ MORE
    </button>
  </div>
`));

    $(document).on('click', '.category-btn', function () {
      let categoryName = this.value;
      let filteredBooks = arr_book.filter(item => item.category == categoryName);
      console.log(filteredBooks);
      $('.books').html(filteredBooks.map(item => `
  <div class="book">
  <div class="new-badge ${item.isNew === true ? 'isNew' : 'isOld'}">
      New
   </div>
    <div class="book-image">
      <img src="${item.image}" width="134px" height="190px" id="thumbnail" alt="Book preview"/>
    </div>
    <div class="book-name">
        ${item.name}
    </div>
    <div class="book-author">
        ${item.author}
    </div>
    <button type="button" class="read-more-btn" data-json="${encodeURIComponent(JSON.stringify(item))}">
        READ MORE
    </button>
  </div>
  `))
    });


    $('.books').slick({
      prevArrow: `<button type="button" class="slick-prev"><img src="./assets/images/icons/next.svg"/></button>`,
      nextArrow: `<button type="button" class="slick-next"><img src="./assets/images/icons/previous.svg"/></button>`,
      dots: false,
      speed: 300,
      autoplay: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
          }
        }
      ]
    })
  });

  let jsonData;
  $(document).on('click', '.read-more-btn', function () {

    jsonData = JSON.parse(decodeURIComponent($(this).data("json")));
    $('.books').css('opacity', '0');
    $('.footer-main-area').addClass('container');
    $('.book-details').css('display', 'flex');
    $('.book-details').html(
      `
      <div class="items-area">
      <button id="close-details">
          &lt; back
      </button>
      <div id="publication-year">
          ${jsonData.publication_year}
      </div>
      <div id="book-title">
          ${jsonData.name}
      </div>
      <div id="added-time">
          ${jsonData.added_time}
      </div>
      <div id="author">
        ${jsonData.author}
      </div>
      <div id="description">
          ${jsonData.description}
      </div>
      <div class="comments" data-comment-id="2">
          <form action="#" class="send-comment-area">
              <input type="text" id="comment" required placeholder="Write a public comment">
              <button type="submit" id="send-comment">
                  <img src="./assets/images/icons/comment.svg" alt="comment">
              </button>
          </form>
          <div class="comments">
              <div class="comment">
                  <div class="comment-header">
                      <div class="comment-author">
                          Anonymous
                      </div>
                      <div class="comment-date">
                          13:32 today
                      </div>
                  </div>
                  <div class="comment-content">
                      Good Book
                  </div>

              </div>
              ${fetchComments()}
          </div>
      </div>
  </div>
  <div class="detail-image-area">
      <img src="${jsonData.image}"
          id="detail-img" alt="Image">
  </div>`
    )
  });
  $(document).on('click', '#close-details', function () {
    $('.footer-main-area').removeClass('container');
    $('.book-details').css('display', 'none');
    $('.books').css('opacity', '1');
  });

  function fetchComments() {
    return '' //...
  }


});