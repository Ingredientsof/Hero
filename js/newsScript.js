const swiper = new Swiper('.swiper', {
    // 옵션 파라미터 루프.
    loop: true,
  
    // 페이지네이션
    pagination: {
      el: '.swiper-pagination',
    },

    // 자동넘김
    autoplay: {
      delay: 4000,
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

// 페이지가 로드된 후 1초 후에 블러 처리된 이미지를 보이게 함
window.onload = function() {
    setTimeout(function() {
        document.getElementById('blurred').style.opacity = 1; // 블러 처리된 이미지 보이기
    }, 1000); // 1초 후에 블러 이미지 나타남
};