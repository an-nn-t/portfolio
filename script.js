let currentIndex = 0;

function updateSlide() {
    const photoContainer = document.querySelector('.photo-container');
    const photos = document.querySelectorAll('.photo');
    const totalPhotos = photos.length;

    photoContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
}

function nextSlide() {
    const photos = document.querySelectorAll('.photo');
    currentIndex = (currentIndex + 1) % photos.length;
    updateSlide();
}

function previousSlide() {
    const photos = document.querySelectorAll('.photo');
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateSlide();
}