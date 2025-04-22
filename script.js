const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let intervalId;
const intervalTime = 5000; 

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? 1 : 0;
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
    currentIndex = index;
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function goToSlide(index) {
    clearInterval(intervalId); 
    showSlide(index);       
    startCarousel();  
}

function startCarousel() {
    intervalId = setInterval(nextSlide, intervalTime);
}


showSlide(currentIndex);
startCarousel();


indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});