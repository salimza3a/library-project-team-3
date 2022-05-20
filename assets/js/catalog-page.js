
// All Books
$(document).ready(function () {
    $('.books').slick({ 
      infinite: true,
      speed: 500,
     
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      
      prevArrow: $(".prevBtn"),
      nextArrow: $(".nextBtn"),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            infinite: true,
           
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }]
      });

      // BestSeller books
      $('.all-bestseller-books').slick({ 
        infinite: true,
        speed: 500,
        nav: false,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 4,
        
        prevArrow: $(".prevBtn-two"),
        nextArrow: $(".nextBtn-two"),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              infinite: true,
             
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }]
        });

        // Release books

        $('.all-release-books').slick({ 
          infinite: true,
          speed: 500,
          nav: false,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 4,
          
          prevArrow: $(".prevBtn-three"),
          nextArrow: $(".nextBtn-three"),
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                infinite: true,
               
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }]
          });

})



