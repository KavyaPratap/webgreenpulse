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

document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('show-more-btn');
    const collapsibleCards = document.querySelectorAll('.feature-card.collapsible');
    
    if (showMoreBtn && collapsibleCards.length > 0) {
        showMoreBtn.addEventListener('click', function() {
            const isExpanded = this.classList.toggle('expanded');
            
            // Toggle visibility
            collapsibleCards.forEach(card => {
                card.classList.toggle('visible');
            });
            
            // Update button text
            this.innerHTML = isExpanded 
                ? 'Show Less <i class="fas fa-chevron-up"></i>' 
                : 'Show More <i class="fas fa-chevron-down"></i>';
        });
    }
});

// About Section Show More
document.querySelectorAll('.about-show-more').forEach(button => {
    button.addEventListener('click', function() {
        const collapsibleText = this.parentElement.querySelector('.collapsible-text');
        const isExpanded = collapsibleText.classList.toggle('visible');
        
        this.classList.toggle('expanded');
        this.innerHTML = isExpanded 
            ? 'Show Less <i class="fas fa-chevron-up"></i>' 
            : 'Show More <i class="fas fa-chevron-down"></i>';
    });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const collaborateBtn = document.getElementById('collaborate-btn');
    const joinUsBtn = document.getElementById('join-us-btn');
    const collaborateModal = document.getElementById('collaborate-modal');
    const joinUsModal = document.getElementById('join-us-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modals
    if (collaborateBtn) {
        collaborateBtn.addEventListener('click', function() {
            collaborateModal.style.display = 'block';
        });
    }
    
    if (joinUsBtn) {
        joinUsBtn.addEventListener('click', function() {
            joinUsModal.style.display = 'block';
        });
    }
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
