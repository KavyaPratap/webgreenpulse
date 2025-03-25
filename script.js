function adjustTextSize(change) {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + change) + 'px';
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


window.addEventListener('scroll', () => {
    const mobileNav = document.querySelector('.mobile-nav');
    if (window.scrollY > 100) {
        mobileNav.style.bottom = '0';
    } else {
        mobileNav.style.bottom = '-60px';
    }
});


const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 5%';
            navbar.style.boxShadow = '0 2px 15px rgba(218,165,32,0.2)';
        } else {
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 2px 15px rgba(218,165,32,0.1)';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (typewriterElement) {
        const originalText = typewriterElement.textContent;
        typewriterElement.textContent = ''; 
        typewriterElement.style.borderRight = 'none'; 
        typewriterElement.style.whiteSpace = 'normal'; 
        typewriterElement.style.overflow = 'visible'; 
        
        // Mobile adjustments
        const speed = window.innerWidth <= 768 ? 80 : 100;
        const startDelay = window.innerWidth <= 768 ? 300 : 500;
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                typewriterElement.style.borderRight = '.15em solid var(--gold1)';
                typewriterElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                typewriterElement.style.borderRight = '.15em solid var(--gold1)';
                typewriterElement.style.animation = 'blink-caret .75s step-end infinite';
            }
        }

        setTimeout(typeWriter, startDelay);
    }
});
