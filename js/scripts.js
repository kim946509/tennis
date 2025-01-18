/* Template: Tivo - SaaS App HTML Landing Page Template
   Author: Inovatik
   Created: Sep 2019
   Description: Custom JS file
*/


(function ($) {
    "use strict";

    /* Preloader */
    $(window).on('load', function () {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });


    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function () {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function (event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });


    /* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    /* Text Slider - Swiper */
    var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });


    /* Newsletter Form */
    $("#newsletterForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {
        // initiate variables with form content
        var email = $("#nemail").val();
        var terms = $("#nterms").val();
        $.ajax({
            type: "POST",
            url: "php/newsletterform-process.php",
            data: "email=" + email + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    nformSuccess();
                } else {
                    nformError();
                    nsubmitMSG(false, text);
                }
            }
        });
    }

    function nformSuccess() {
        $("#newsletterForm")[0].reset();
        nsubmitMSG(true, "Subscribed!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function nformError() {
        $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function nsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });

    // Custom code
    $(document).ready(function () {
        // "Read More / Read Less" 버튼 클릭 이벤트
        $(".more-info").on("click", function () {
            const parentContainer = $(this).closest(".text-container"); // 버튼과 관련된 컨테이너만 선택
            const descWrapper = parentContainer.find(".desc-wrapper");
            const desc = parentContainer.find(".desc");

            // 최소 높이 (2줄의 높이)
            const descMinHeight = parseFloat(getComputedStyle(descWrapper[0]).lineHeight) * 2;

            if ($(this).hasClass("expand")) {
                // 축소
                descWrapper.css({
                    "max-height": `${descMinHeight}px`,
                    "overflow": "hidden",
                });
                $(this).removeClass("expand").find(".more").show();
                $(this).find(".less").hide();
            } else {
                // 확장
                descWrapper.css({
                    "max-height": `${desc.height()}px`,
                    "overflow": "visible",
                });
                $(this).addClass("expand").find(".more").hide();
                $(this).find(".less").show();
            }
        });

        // 초기 상태 설정
        $(".desc-wrapper").each(function () {
            const descWrapper = $(this);
            const desc = descWrapper.find(".desc");
            const moreInfoButton = descWrapper.siblings(".more-info");

            // 최소 높이 (2줄의 높이)
            const descMinHeight = parseFloat(getComputedStyle(this).lineHeight) * 2;

            // 초기 상태
            descWrapper.css("max-height", `${descMinHeight}px`);

            // 긴 텍스트일 경우 "Read More" 버튼 표시
            if (desc.height() > descMinHeight) {
                moreInfoButton.show();
            }
        });
    });

    $(document).ready(function () {
        $("a.page-scroll").on("click", function (event) {
            event.preventDefault();
            const target = $(this.getAttribute("href"));
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - $(".navbar").outerHeight(),
                    },
                    800,
                    "easeInOutExpo"
                );
            }
        });
    });


})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.gform');
    const submitButton = document.getElementById('submitButton');

    // 폼 유효성 검사 함수
    function validateForm() {
        // 폼의 모든 입력 요소가 유효한지 검사
        submitButton.disabled = !form.checkValidity();
    }

    // 폼 제출 이벤트 처리
    function handleSubmit(event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        // 서버로 데이터 전송
        const formData = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    showThankYouMessage(); // 감사 메시지 표시
                } else {
                    alert('There was an issue with the submission. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    }

    // 감사 메시지 표시 함수
    function showThankYouMessage() {
        form.style.display = 'none'; // 폼 숨기기
        document.querySelector('.thankyou_message').style.display = 'block'; // 감사 메시지 표시
    }

    // 입력 필드와 체크박스의 상태를 감시
    form.addEventListener('input', validateForm);
    form.addEventListener('change', validateForm);
    form.addEventListener('submit', handleSubmit);

    // 초기 상태 확인
    validateForm();
});
