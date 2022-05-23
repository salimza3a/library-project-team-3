$('.books').slick({
  prevArrow: `<button type="button" class="slick-prev"><img src="./assets/images/icons/next.svg"/></button>`,
  nextArrow: `<button type="button" class="slick-next"><img src="./assets/images/icons/previous.svg"/></button>`,
  dots: false,
  speed: 500,
  autoplay: true,
  slidesToShow: 5,
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
});


//fetch data from FireBase