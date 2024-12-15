$(document).ready(function() {
    // 이미지 줌 기능
    function imageZoom(imgSelector, resultSelector) {
        const img = $(imgSelector);
        const result = $(resultSelector);
        const lens = $("<div/>", { "class": "zoom_lens" });
        lens.insertBefore(img);

        const cx = result.width() / lens.width();
        const cy = result.height() / lens.height();

        result.css({
            "backgroundImage": `url(${img.attr('src')})`, 
            "backgroundSize": `${img.width() * cx}px ${img.height() * cy}px`
        });

        lens.add(img).on('mousemove touchmove', function(e) {
            e.preventDefault();
            const pos = getCursorPos(e, img);

            let x = pos.x - lens.width() / 2;
            let y = pos.y - lens.height() / 2;
            x = Math.max(0, Math.min(x, img.width() - lens.width()));
            y = Math.max(0, Math.min(y, img.height() - lens.height()));

            lens.css({ left: x, top: y });
            result.css('backgroundPosition', `-${x * cx}px -${y * cy}px`);

            // zoom_result 활성화 시 small_cards 숨기기
            result.show();
            $('.small_cards').css('visibility', 'hidden');
        }).on('mouseleave', function() {
            result.hide(); // 마우스가 나가면 zoom_result 숨기기
            $('.small_cards').css('visibility', 'visible'); // small_cards 다시 보이기
        });

        function getCursorPos(e, img) {
            const imgOffset = img.offset();
            let x = e.pageX - imgOffset.left;
            let y = e.pageY - imgOffset.top;

            if (e.type === 'touchmove') {
                x = e.originalEvent.touches[0].pageX - imgOffset.left;
                y = e.originalEvent.touches[0].pageY - imgOffset.top;
            }

            return { x: x - window.pageXOffset, y: y - window.pageYOffset };
        }
    }

    // 수량 조정 및 가격 업데이트 함수
    window.count = function(type) {
        const quantityElement = document.getElementById('quantity');
        const totalQuantityElement = document.getElementById('totalQuantity');
        const priceElement = document.querySelector('.sizeSelec2'); // 가격 요소
        const unitPrice = 39900; // 단가 (39,900원)

        if (!quantityElement || !totalQuantityElement || !priceElement) {
            console.error("Element not found: ", { quantityElement, totalQuantityElement, priceElement });
            return;
        }

        let number = parseInt(quantityElement.innerText) || 0; // 기본값 0으로 설정

        if (type === 'plus') {
            number += 1;
        } else if (type === 'minus') {
            if (number > 0) {
                number -= 1;
            }
        }

        quantityElement.innerText = number;
        totalQuantityElement.innerText = number; // 총 수량 업데이트

        // 가격 업데이트
        const totalPrice = number * unitPrice;
        priceElement.innerText = totalPrice.toLocaleString() + "원"; // 가격을 천 단위로 포맷
    };

    // 이미지 줌 기능 호출
    $(window).on('load', function() {
        imageZoom(".img", ".zoom_result");
    });

    // 스크롤 이벤트 처리
    $(window).scroll(function() {
        const pagePoint = $(this).scrollTop();

        // 네비게이션 고정 처리
        if (pagePoint >= 950) {
            $('.Detail_nav').addClass('fixed');
        } else {
            $('.Detail_nav').removeClass('fixed');
        }

        // 각 섹션에 대한 활성화 처리
        $('.navigater section').each(function(index) {
            if ($(this).offset().top <= pagePoint + 1) {
                $('.Detail_nav ul li a').removeClass("Selected");
                $('.Detail_nav ul li a').eq(index).addClass('Selected');
            }
        });
    });

    // 네비게이션 클릭 이벤트
    $('.Detail_nav a').click(function(e) {
        e.preventDefault(); // 기본 링크 클릭 동작 방지
        const target = $(this).attr('href'); // href 속성 값 가져오기

        // 해당 ID 요소가 존재하는지 확인
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top // 해당 id의 위치로 스크롤 이동
            }, 500); // 500ms 동안 애니메이션
        } else {
            console.warn(`Element with ID ${target} not found.`); // 요소가 없을 때 경고
        }
    });
});
