setTimeout(() => $('.books').slick({
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
}), 1500);


//fetch data from FireBase
let categoriesBranch = database.ref('/categories');
let booksBranch = database.ref('/books');

categoriesBranch.on('value', function (categories) {
  let arr_category = Object.values(categories.val());
  $('#categories').html(arr_category.map(item => `<button class="category-btn" value="${item.catalog_name}">${item.catalog_name}</button>`));
});

booksBranch.on('value', function (books) {
  let arr_book = Object.values(books.val());
  console.log(arr_book[0]);
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
    <button type="button" class="read-more-btn" value="${decodeURIComponent(JSON.stringify(item))}">
        READ MORE
    </button>
  </div>
`));
})


