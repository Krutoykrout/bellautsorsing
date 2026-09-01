$(document).ready(function () {
    $(".header__menu a").on("click", function (e) {
        e.preventDefault()
        $('#overflow').removeClass('active')
        $('.popup_block').removeClass('active')
        if($('.burger_block').hasClass('active')) {
            $('.header__block').removeClass('z10')
            $('.header__inner').removeClass('z11')
            $('.burger_block').removeClass('active')
            $('.burger__dropdown').hide().show().slideToggle(150);
        }
        let href = $(this).attr("href");
        console.log(href)
        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 370,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });

        return false;
    });
    function scrollShow() {
        var vh = $(this).height();
        var sct = $(window).scrollTop();
        $(".section-title-js").each(function (index) {
            var title = $(".section-title-js");
            var of = title.eq(index).offset().top;
            var bh = title.parents("section").height();
            if (sct > of - vh && sct < of + bh) {
                if (sct > of - vh / 1.15) {
                    title.eq(index).closest(".animate-block").addClass('scroll-here');
                }
            }
        });
    }
    $(window).bind('scroll', scrollShow);
    function onloadShow() {
        var vh = $(this).height();
        var sct = $(window).scrollTop();
        $(".animate-block").each(function (index) {
            var of = $(this).offset().top;
            if (sct > of - vh / 1.15) {
                $(this).addClass('scroll-here');
            }
        });
        $('.animate-block.scroll-here').prevAll('.animate-block').addClass('scroll-here');
    }
    setTimeout(onloadShow, 300);

    $(".phone__input").mask("+7(999) 999-9999");
     //form submit
    $('form').on('submit', function (e) {
        e.preventDefault()
        if($(this).find('input[name="name_user"]').val() == '' || $(this).find('input[name="phone_user"]').val() == ''){
            if($(this).find('input[name="name_user"]').val() == ''){
                $(this).find('input[name="name_user"]').closest('.input').addClass('error')
            }
            if($(this).find('input[name="phone_user"]').val() == ''){
                $(this).find('input[name="phone_user"]').closest('.input').addClass('error')
            }
        }else{
            $.ajax({
                type: "POST",
                url: "/form-submit.php",
                data: $(this).serialize(),
                dataType: "html",
                success: function (response) {
                    console.log(response[0])
                    if(parseInt(response) === 0 || parseInt(response) === 2){
                        alert('Вы не согласились с условиями обработки персональных данных')
                    }
                    if(parseInt(response) === 1){
                        if($('#overflow').hasClass('active')){
                            $('.popup_block').removeClass('active')
                            $('#success_popup').addClass('active')
                        }else{
                            $('#success_popup').addClass('active')
                            $('#overflow').addClass('active')
                        }
                    }
                },
            });
        }
    })
    $('.input input').on('click', function (){
        $(this).closest('.input').removeClass('error')
    })
    if($(window).width() > 1200){
        $('.services__dropdown').on('click', function () {
            $this = $(this)
            $('.services__dropdown').each(function (){
                $(this).removeClass('active')
            })
            $this.addClass('active')
            $('.services__dropdown__element').each(function (){
                if($(this).attr('data-services') == $this.attr('data-services')){
                    $(this).addClass('active')
                }else{
                    $(this).removeClass('active')
                }
            })
        })
    }else{
        $('.services__dropdown__element').each(function (){
           let btn = $(this).find('.c__btn')
            $(this).append(btn)
        })
        $('.services__dropdown').each(function () {
            $this = $(this)
            $this.removeClass('active')
            $('.services__dropdown__element').each(function (){
                if($(this).attr('data-services') == $this.attr('data-services')){
                    $(this).removeClass('active')
                    $this.append($(this))
                }
            })
        })
        $('.services__dropdown').on('click', function () {
            $(this).toggleClass('opened')
            $(this).find('.services__dropdown__element').slideToggle(300)
        })
    }

    $('.burger_block').on('click', function () {
        if($(this).hasClass('active')){
            $('.burger__dropdown').hide().show().slideToggle(150);
        }else{
            $('.burger__dropdown').show().hide().slideToggle(150);
        }
        $('.header__block').toggleClass('z10')
        $('.header__inner').toggleClass('z11')
        $(this).toggleClass('active')
        $('#overflow').toggleClass('active')
    })
    $('.c_popup').on('click', function () {
        let popup = $(this).attr('popup')
        $('#' + popup).addClass('active')
        $('#overflow').addClass('active')
    })
    $('.hide_popup').on('click', function () {
        $('.popup_block').removeClass('active')
        $('#overflow').removeClass('active')
    })
    $(document).click(function (e) {
        const overflow = $('#overflow');
        if (overflow.is(e.target)) {
            if($('.burger_block').hasClass('active')){
                $('.header__block').removeClass('z10')
                $('.header__inner').removeClass('z11')
                $('.burger_block').removeClass('active')
                $('.burger__dropdown').hide().show().slideToggle(150);
            }
            $('.popup_block').removeClass('active')
            $('#overflow').removeClass('active')
        }
    });
    $('.block_href').on('click', function () {
        let href = $(this).attr('с_href')
        $('.burger_block').removeClass('active')
        $('.popup_block').removeClass('active')
        $('#overflow').removeClass('active')
        $('.burger__dropdown').hide().show().slideToggle(150);
        $('html, body').animate({scrollTop: $(href).offset().top}, "slow");
    });
})