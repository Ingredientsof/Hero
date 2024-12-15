const swiper = new Swiper('.swiper', {
    // 옵션 파라미터 루프.
    loop: true,
  
    // 페이지네이션
    pagination: {
      el: '.swiper-pagination',
    },

    // 자동넘김
    autoplay: {
      delay: 2500, // 5초마다 자동으로 슬라이드
      disableOnInteraction: false,
  },

  speed: 500,
});

//슬라이드 위 호버시 멈춤
const swiperContainer = document.querySelector('.swiper');

swiperContainer.addEventListener('mouseenter', () => {
    swiper.autoplay.stop(); //마우스 올릴때
});

swiperContainer.addEventListener('mouseleave', () => {
    swiper.autoplay.start(); // 마우스가 나갈때
});

//스크롤미치겠음 이새키죽여야지.
const sellKit = document.querySelector('.sellKit');

function changeBackgroundColor() {
    const sellKitRect = sellKit.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // sellKit의 top이 화면에 들어오면
    if (sellKitRect.top <= windowHeight && sellKitRect.bottom >= 0) {
        const totalHeight = sellKitRect.height;
        const scrollPosition = windowHeight - sellKitRect.top; // 현재 스크롤 위치

        // 비율 계산 (0 ~ 1 범위)
        let ratio = Math.min(1, Math.max(0, scrollPosition / totalHeight));

        // 배경색 계산 (비율에 따라)
        let red = Math.round(255 * ratio); // 화이트로 변하도록
        let green = Math.round(255 * ratio);
        let blue = Math.round(255 * ratio);

        // 배경색 적용
        document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (sellKitRect.bottom < 0) {
        // sellKit 섹션이 화면 위로 사라지면 블랙으로
        document.body.style.backgroundColor = `rgb(0, 0, 0)`;
    } else {
        // 기본 색으로 (블랙으로 돌아가기)
        document.body.style.backgroundColor = `rgb(0, 0, 0)`;
    }
}

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', changeBackgroundColor);
