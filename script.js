document.addEventListener('DOMContentLoaded', function() {
    // スライダー関連の初期化
    initSliders();
    
    // ナビゲーションのスムーススクロール
    initSmoothScroll();
    
    // ページ読み込み時のアニメーション
    animateOnLoad();
});

// 各スライダーを初期化する関数
function initSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach((slider, sliderIndex) => {
        slider.dataset.index = "0";
        slider.dataset.id = `slider-${sliderIndex}`;
        
        const photoContainer = slider.querySelector('.photo-container');
        const photos = photoContainer.querySelectorAll('.photo');
        
        // 各写真にデータ属性を追加
        photos.forEach((photo, photoIndex) => {
            photo.dataset.index = photoIndex;
            photo.dataset.sliderId = `slider-${sliderIndex}`;
        });
        
        // 左右の矢印にスライダーIDを追加
        const leftArrow = slider.querySelector('.arrow.left');
        const rightArrow = slider.querySelector('.arrow.right');
        
        if (leftArrow) {
            leftArrow.onclick = function() { previousSlide(slider); };
        }
        
        if (rightArrow) {
            rightArrow.onclick = function() { nextSlide(slider); };
        }
    });
}

// 前のスライドに移動
function previousSlide(slider) {
    const photos = slider.querySelectorAll('.photo');
    const photoContainer = slider.querySelector('.photo-container');
    let currentIndex = parseInt(slider.dataset.index);
    
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    slider.dataset.index = currentIndex;
    
    photoContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// 次のスライドに移動
function nextSlide(slider) {
    const photos = slider.querySelectorAll('.photo');
    const photoContainer = slider.querySelector('.photo-container');
    let currentIndex = parseInt(slider.dataset.index);
    
    currentIndex = (currentIndex + 1) % photos.length;
    slider.dataset.index = currentIndex;
    
    photoContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// スムーススクロール
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ページ読み込み時のアニメーション
function animateOnLoad() {
    // ヘッダーのフェードイン
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // セクションの順次フェードイン
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 400 + (index * 200));
    });
}