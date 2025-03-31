// Text size adjustment and smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    // Text size adjustment
    window.adjustTextSize = (change) => {
        const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (currentSize + change) + 'px';
        localStorage.setItem('textSize', document.body.style.fontSize);
    };

    // Restore text size
    const savedSize = localStorage.getItem('textSize');
    if (savedSize) document.body.style.fontSize = savedSize;

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.target.classList.toggle('active', entry.isIntersecting));
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
});