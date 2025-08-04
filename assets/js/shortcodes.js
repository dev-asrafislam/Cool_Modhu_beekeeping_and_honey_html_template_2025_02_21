/**
  * isMobile
  * flatSpacer
  * Parallax
  * flatSlider
  * flatTabs
  * popupGallery
  * popupVideo
  * searchIcon
  * flatTabs
  * viewShop
  * ratingShop
  * btnQuantity
*/

;(function($) {

    "use strict";

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var flatSpacer = function() {
        $(window).on('load resize', function(){
            var mode = 'desktop';
            if(matchMedia('only screen and (max-width: 991px)').matches) 
                mode = 'mobile';
            if(matchMedia('only screen and (max-width: 767px)').matches)
                mode = 'smobile';
            $('.themesflat-spacer').each( function(){
                if( mode === 'desktop'){
                    $(this).attr('style','height:' + $(this).data('desktop') + 'px')
                }else if( mode == 'mobile') {
                    $(this).attr('style','height:' + $(this).data('mobile') + 'px')
                }else {
                    $(this).attr('style','height:' + $(this).data('smobile') + 'px')
                }
            });
        });
    };

    var parallax = function() {
        if ( $().parallax && isMobile.any() == null ) {
            $('.parallax1').parallax("50%", 0.2);
            $('.parallax2').parallax("50%", 0.4);  
            $('.parallax3').parallax("50%", 0.5);            
        }
    };

    var flatSlider = function() {
        if ( $().owlCarousel ) {
            $('.themesflat-slider').each(function(){
                var
                $this = $(this),
                nav = $this.data("nav"),
                dots = $this.data("dots"),
                auto = $this.data("auto"),
                item = $this.data("item"),
                item2 = $this.data("item2"),
                item3 = $this.data("item3"),
                margin = Number($this.data("margin"));

                $this.find('.owl-carousel').owlCarousel({
                    margin: margin,
                    nav: nav,
                    navText: ["<div class='navPre'></div>","<div class='navNext'></div>"],
                    dots: dots,
                    autoplay: true,
                    loop:true,
                    autoplayTimeout: 5000,
                    autoplaySpeed: 1500,
                    // animateOut: 'slideOutUp',
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var flatTabs =  function() {
        $('.themesflat-tabs').each(function(){
            var 
            list ="",
            title = $(this).find('.item-tab-title'),
            titleWrap = $(this).children('.tab-title') ;

            title.each(function() {
                list = list + "<li>" + $(this).html() + "</li>";
            }).appendTo(titleWrap);

            $(this).find('.tab-title li').filter(':first').addClass('active');
            $(this).find('.tab-content-wrap').children().hide().filter(':first').show();

            $(this).find('.tab-title li').on('click', function(e) {
                var
                idx = $(this).index(),
                content = $(this).closest('.themesflat-tabs').find('.tab-content-wrap').children().eq(idx);

                $(this).addClass('active').siblings().removeClass('active');
                content.fadeIn('slow').siblings().hide();

                e.preventDefault();
            });
        });
    };
  
    var popupGallery = function () {
        if ($().magnificPopup) {
        $(".popup-gallery").magnificPopup({
            type: "image",
            tLoading: "Loading image #%curr%...",
            removalDelay: 600,
            mainClass: "my-mfp-slide-bottom",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [ 0, 1 ]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });
        }
    } 
    var popupVideo = function () {
        if ($().magnificPopup) {
            $('.popup-youtube').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
    }
   var viewShop = function () {
        $('.list').on("click",function(event) {
            event.preventDefault();
            $('.list').addClass('active');
            $('.grid').removeClass('active');
            $('.items').addClass('col-lg-12 col-md-12 list-items');
        });    
        $('.grid').on("click",function(event) {
            event.preventDefault();
            $('.grid').addClass('active');
            $('.list').removeClass('active');
            $('.items').removeClass('col-lg-12 col-md-12 list-items');
        });
   }
   var ratingShop = function () {  
        $(".star").on('click', function(){
        $(".selected").each(function(){
            $(this).removeClass('selected');
        });
        $(this).addClass('selected');
        });
    
    }
    var btnQuantity = function () {
        $('.minus-btn').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest('div').find('input');
            var value = parseInt($input.val());
        
            if (value > 1) {
                value = value - 1;
            } 
        
        $input.val(value);
        
        });
        
        $('.plus-btn').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest('div').find('input');
            var value = parseInt($input.val());
        
            if (value > 0) {
                value = value + 1;
            } 
        
            $input.val(value);
        });
   }

    // Dom Ready
    $(function() {
        flatSpacer();
        flatTabs();
        popupGallery();
        popupVideo();
        viewShop();
        ratingShop();
        btnQuantity();
        $( window ).on('load resize',function() {
            parallax();
            flatSlider();
        });
    });
    
})(jQuery);
