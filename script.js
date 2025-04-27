document.addEventListener('DOMContentLoaded', () => {

    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let intervalId;
    const intervalTime = 5000; 

    
    if (slides.length > 0 && indicators.length > 0) {
        
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
           
            clearInterval(intervalId); 
            intervalId = setInterval(nextSlide, intervalTime);
        }

      
        showSlide(currentIndex);
        startCarousel();

        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }
    


  
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const siteHeader = document.getElementById('site-header');

    if (menuToggle && siteHeader) {
        menuToggle.addEventListener('click', () => {
            siteHeader.classList.toggle('mobile-nav-open');
            const isExpanded = siteHeader.classList.contains('mobile-nav-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    } 
  

}); 

const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

const videoContainers = document.querySelectorAll('.video-container');

if (videoContainers.length > 0) {
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.play-button');
        
        if (video && playButton) {
            container.addEventListener('click', () => {
                if (video.paused) {
                    document.querySelectorAll('.video-container video').forEach(v => {
                        if (v !== video && !v.paused) {
                            v.pause();
                            v.parentElement.querySelector('.play-button').style.display = 'flex';
                        }
                    });
                    
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });
            
            video.addEventListener('ended', () => {
                playButton.style.display = 'flex';
            });
            
            video.addEventListener('pause', () => {
                 
                 if (!video.ended) {
                    playButton.style.display = 'flex';
                 }
            });

             video.addEventListener('play', () => {
                 
                 playButton.style.display = 'none';
             });
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.video-container')) {
            document.querySelectorAll('.video-container video').forEach(video => {
                if (!video.paused) {
                    video.pause();
                   
                }
            });
        }
    });
}
