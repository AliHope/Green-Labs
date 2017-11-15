$( document ).ready(function() {
    var counter = 1;
    var $servicesDescription__subtitle = $('.services-description__subtitle'),
        $servicesDdescription__text1 = $('.services-description__text1'),
        $servicesDescription__text2 = $('.services-description__text2'),
        $servicesPics1 = $('.services-pics1'),
        $servicesPics2 = $('.services-pics2'),
        $servicesPics3 = $('.services-pics3'),
        $servicesPics4 = $('.services-pics4');

    $('.header-slider').slick({
        autoplay: true,
        arrows: false,
        centerMode: true,
        dots: true,
        centerPadding: '0px',
        swipeToSlide:false,
        infinite: true
    });

    function switchez() {
        switch (counter) {
            case 1:
                $('#slide1').removeClass('activeNow');
                $('#slide2').addClass('activeNow');
                $('#slide3').removeClass('activeNow');
                $('#slide4').removeClass('activeNow');
                counter++;
                break;
            case 2:
                $('#slide1').removeClass('activeNow');
                $('#slide2').removeClass('activeNow');
                $('#slide3').addClass('activeNow');
                $('#slide4').removeClass('activeNow');
                counter++;
                break;
            case 3:
                $('#slide1').removeClass('activeNow');
                $('#slide2').removeClass('activeNow');
                $('#slide3').removeClass('activeNow');
                $('#slide4').addClass('activeNow');
                counter++;
                break;
            case 4:
                $('#slide1').addClass('activeNow');
                $('#slide2').removeClass('activeNow');
                $('#slide3').removeClass('activeNow');
                $('#slide4').removeClass('activeNow');
                counter = 1;
                break;
        }
    }

    setInterval(switchez, 2000);

    $('.reasons-to-visit-slider').slick({
        autoplay: true,
        arrows: false,
        centerMode: false,
        dots: false,
        centerPadding: '0px',
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    autoplay: true,
                    arrows: true,
                    centerMode: true,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    autoplay: true,
                    arrows: true,
                    centerMode: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.prices-slider').slick({
        autoplay: true,
        arrows: true,
        centerMode: true,
        dots: true,
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    autoplay: true,
                    arrows: true,
                    centerMode: true,
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 868,
                settings: {
                    autoplay: true,
                    arrows: false,
                    centerMode: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.header-top-panel__burger').click(function () {
        $('.header-top-panel__burger').toggleClass('active');
        $('.header-top-panel__menu-mobile').toggleClass('active');
        $('.mobile-menu__overflow').toggleClass('visible');
        $('body').toggleClass('active')

    });

    $servicesPics1.click(function() {
        $servicesDescription__subtitle.text('');
        $servicesDdescription__text1.text('');
        $servicesDescription__text2.text('');

        $servicesDescription__subtitle.text('Соляная пещера');
        $servicesDdescription__text1.text('Соляные пещеры - уникальный метод профилактики и лечения заболеваний, ' +
            'основанный на использовании искусственного микроклимата, близкого по параметрам к условиям подземных соляных спелеолечебниц.');
        $servicesDescription__text2.text('Процедуры в пещере способствуют профилактике аллергий, бронхолёгочных и дерматологических заболеваний. ' +
            'Оказывают противовоспалительное воздействие на организм. Пребывание в галокамере расслабляет нервную систему, снимает стресс и улучшает сон.');
    });

    $servicesPics2.click(function() {
        $servicesDescription__subtitle.text('');
        $servicesDdescription__text1.text('');
        $servicesDescription__text2.text('');

        $servicesDescription__subtitle.text('Комната ароматерапии');
        $servicesDdescription__text1.text('Ароматопрофилактика является одним из путей укрепления здоровья ' +
            'и повышения иммунитета.');
        $servicesDescription__text2.text('Для профилактики и лечения заболеваний органов дыхания ароматические' +
            'масла являются незаменимым средством. Это объясняется тем, что во время сеансов ароматерапии' +
            'происходит не только воздействие на обонятельные рецепторы слизистой оболочки носа, но и' +
            'активное воздействие ароматических молекул на слизистые оболочки дыхательных путей - носа,' +
            'трахеи, бронхов. Это позволяет эффективно лечить кашель, бронхит, пневмонию, астму, туберкулез,' +
            'простудные заболевания, исключить развитие осложнений после гриппа, ОРЗ, ангины.');
    });

    $servicesPics3.click(function() {
        $servicesDescription__subtitle.text('');
        $servicesDdescription__text1.text('');
        $servicesDescription__text2.text('');

        $servicesDescription__subtitle.text('Массаж');
        $servicesDdescription__text1.text('Сеанс массажа – это не только приятный процесс, но и во всех' +
        'отношениях полезный.');
        $servicesDescription__text2.text('Польза массажа воистину многогранна и комплексна. Массаж благоприятно ' +
            'воздействует на кожу, подкожножировой слой, мышцы, суставы, связки и сухожилия, а также на  кровеносную, ' +
            'лимфатическую, нервную и дыхательную систему. Именно поэтому многие после массажа чувствуют себя как-будто ' +
            'заново родились. Конечно, массаж бывает разный, и массаж спины сильно отличается от массажа лица, но ' +
            'результат всегда один – польза.');
    });

    $servicesPics4.click(function() {
        $servicesDescription__subtitle.text('');
        $servicesDdescription__text1.text('');
        $servicesDescription__text2.text('');

        $servicesDescription__subtitle.text('Фито-бар');
        $servicesDdescription__text1.text('В здоровом теле — здоровый дух, как гласит народная мудрость.');
        $servicesDescription__text2.text('А свежевыжатые напитки, как известно, это настоящая кладезь ' +
        'витаминов. Именно поэтому фитобар Польза предлагает вам впитать в себя силу даров природы в ' +
        'своих стенах. Овощные и фруктовые соки в дополнение к другим вкусным напиткам и закускам помогут ' +
        'вам поддерживать себя в форме.');
    });

    var viewport = $(window).width();
    var widthSlide = 0;

    if(viewport < 768){
        widthSlide = 150
    } else {
        widthSlide = 210
    }

    $('.containerSlider').carousel({
        num: 3,
        maxWidth: widthSlide,
        maxHeight: widthSlide,
        autoPlay: false,
        showTime: 1000,
        animationTime: 300,
        scale: 0.7,
        distance: 60
    });

    $('.services-slider').slick({
        autoplay: true,
        arrows: true,
        centerMode: true,
        dots: true,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('#desktop-menu__about').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#about-the-cave").offset().top}, 500);
    });


    $('#desktop-menu__services').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#services").offset().top}, 1000);
    });


    $('#desktop-menu__price').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#prices").offset().top}, 1000);
    });


    $('#desktop-menu__reviews').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#review").offset().top}, 1000);
    });


    $('#desktop-menu__contacts').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#contacts").offset().top}, 1000);
    });

    $('#mobile-menu__about').click(function (e) {
        e.preventDefault();
        $('.header-top-panel__burger').removeClass('active');
        $('.header-top-panel__menu-mobile').removeClass('active');
        $('.mobile-menu__overflow').removeClass('visible');
        $('body').removeClass('active')
        $("html,body").animate({scrollTop: $("#about-the-cave").offset().top}, 500);
    });


    $('#mobile-menu__services').click(function (e) {
        e.preventDefault();
        $('.header-top-panel__burger').removeClass('active');
        $('.header-top-panel__menu-mobile').removeClass('active');
        $('.mobile-menu__overflow').removeClass('visible');
        $('body').removeClass('active')
        $("html,body").animate({scrollTop: $("#services").offset().top}, 1000);
    });


    $('#mobile-menu__price').click(function (e) {
        e.preventDefault();
        $('.header-top-panel__burger').removeClass('active');
        $('.header-top-panel__menu-mobile').removeClass('active');
        $('.mobile-menu__overflow').removeClass('visible');
        $('body').removeClass('active')
        $("html,body").animate({scrollTop: $("#prices").offset().top}, 1000);
    });


    $('#mobile-menu__reviews').click(function (e) {
        e.preventDefault();
        $('.header-top-panel__burger').removeClass('active');
        $('.header-top-panel__menu-mobile').removeClass('active');
        $('.mobile-menu__overflow').removeClass('visible');
        $('body').removeClass('active')
        $("html,body").animate({scrollTop: $("#review").offset().top}, 1000);
    });


    $('#mobile-menu__contacts').click(function (e) {
        e.preventDefault();
        $('.header-top-panel__burger').removeClass('active');
        $('.header-top-panel__menu-mobile').removeClass('active');
        $('.mobile-menu__overflow').removeClass('visible');
        $('body').removeClass('active')
        $("html,body").animate({scrollTop: $("#contacts").offset().top}, 1000);
    });

    $('#header-more-button').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#contacts").offset().top}, 1000);
    });

    $('#desktop-about-the-cave-button').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#prices").offset().top}, 1000);
    });

    $('#mobile-about-the-cave-button').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#prices").offset().top}, 1000);
    });

    $('.services-description-cost').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#contacts").offset().top}, 1000);
    });

    $('.writeVisit').click(function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: $("#contacts").offset().top}, 1000);
    });

});