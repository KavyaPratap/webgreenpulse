document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (!carouselWrapper) return;

    let currentSlide = 0;
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-item');
    const slideWidth = 250;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        document.querySelectorAll('.dot').forEach((dot, i) => 
            dot.classList.toggle('active', i === currentSlide)
        );
    }

    // Initialize carousel
    document.querySelectorAll('.meet-team-btn').forEach(button => {
        button.addEventListener('click', () => {
            const teamSection = document.getElementById('team-carousel');
            teamSection.style.display = teamSection.style.display === 'none' ? 'block' : 'none';
            teamSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Navigation
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-rotate
    let interval = setInterval(() => showSlide(currentSlide + 1), 7000);
    carouselWrapper.addEventListener('mouseenter', () => clearInterval(interval));
    carouselWrapper.addEventListener('mouseleave', () => {
        interval = setInterval(() => showSlide(currentSlide + 1), 7000);
    });
});