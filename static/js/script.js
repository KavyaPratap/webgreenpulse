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
    
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
// Chatbot functionality
let isChatOpen = false;
let isProcessing = false;
const quickQuestions = [
    "How does E-Sahara prevent loneliness?",
    "Is registration free for seniors?",
    "What types of activities do you offer?",
    "How to join a virtual event?",
    "Can I volunteer remotely?",
    "What devices are supported?",
    "How to update my profile?",
    "Emergency contact information"
];


async function getAIResponse(userMessage) {
    try {
        const response = await fetch('/chat', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        return data.response || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("API error:", error);
        return "Error connecting to AI. Please try again later.";
    }
}

function toggleChat() {
    const chat = document.getElementById('chatbot-container');
    isChatOpen = !isChatOpen;
    chat.classList.toggle('chatbot-hidden');
    if (isChatOpen) showQuickQuestions();
}

function showQuickQuestions() {
    const questionsHTML = quickQuestions.map(q => `
        <button class="quick-question-btn" data-question="${q.replace(/"/g, '&quot;')}">
            ${q}
        </button>
    `).join('');

    const messages = document.getElementById('chat-messages');
    messages.innerHTML = `
        <div class="quick-questions">
            <div class="quick-questions-title">Common Questions:</div>
            <div class="quick-questions-grid">${questionsHTML}</div>
        </div>
    `;

    // Add event listeners for quick questions
    document.querySelectorAll('.quick-question-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.dataset.question;
            handleQuickQuestion(question);
        });
    });
}

function handleQuickQuestion(question) {
    document.querySelector('.quick-questions')?.remove();
    processMessage(question);
}
async function processMessage(message) {
    if (isProcessing) return;
    
    const input = document.getElementById('user-input');
    const messages = document.getElementById('chat-messages');
    
    isProcessing = true;
    input.disabled = true;

    // Add user message
    messages.innerHTML += `<div class="message user-message">${message}</div>`;

    // Add typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing';
    typingIndicator.textContent = '...';
    messages.appendChild(typingIndicator);
    messages.scrollTop = messages.scrollHeight;

    try {
        const aiResponse = await getAIResponse(message);
        typingIndicator.remove();
        
        // Add bot response with typewriter effect
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message bot-message';
        messages.appendChild(responseDiv);
        
        for (let i = 0; i < aiResponse.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 35));
            responseDiv.textContent = aiResponse.substring(0, i + 1);
            messages.scrollTop = messages.scrollHeight;
        }
    } catch (error) {
        typingIndicator.remove();
        messages.innerHTML += `<div class="message bot-message">Error processing request. Please try again.</div>`;
    } finally {
        isProcessing = false;
        input.disabled = false;
        messages.scrollTop = messages.scrollHeight;
    }
}

// Event Listeners (Updated)
document.getElementById('user-input').addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault();
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        if (message) {
            input.value = '';
            await processMessage(message);
        }
    }
});

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (message) {
        input.value = '';
        await processMessage(message);
    }
});

// Rename sendMessage to processMessage for consistency
window.sendMessage = processMessage;
async function sendMessage() {
    if (isProcessing) return;
    
    const input = document.getElementById('user-input');
    const messages = document.getElementById('chat-messages');
    const userText = input.value.trim();
    
    if (!userText) return;
    isProcessing = true;
    input.disabled = true;
    messages.innerHTML += `<div class="message user-message">${userText}</div>`;
    input.value = '';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing';
    typingIndicator.textContent = '...';
    messages.appendChild(typingIndicator);
    messages.scrollTop = messages.scrollHeight;

    try {
        const aiResponse = await getAIResponse(userText);
        typingIndicator.remove();
        const responseDiv = document.createElement('div');
        responseDiv.className = 'message bot-message';
        messages.appendChild(responseDiv);
        for (let i = 0; i < aiResponse.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 35));
            responseDiv.textContent = aiResponse.substring(0, i + 1);
            messages.scrollTop = messages.scrollHeight;
        }
    } catch (error) {
        typingIndicator.remove();
        messages.innerHTML += `<div class="message bot-message">Error processing your request. Please try again.</div>`;
    } finally {
        isProcessing = false;
        input.disabled = false;
        messages.scrollTop = messages.scrollHeight;
    }
}

document.getElementById('user-input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault();
        await sendMessage();
    }
});

//for voice navigation
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new window.SpeechRecognition();
    recognition.continuous = true; 
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let isVoiceActive = false;

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        console.log('Voice command:', transcript);

        if (transcript.includes('end voice navigation')) {
            recognition.stop();
            isVoiceActive = false;
            console.log('Voice navigation deactivated by voice command.');
            return;
        }

    
        if (transcript.includes('home')) {
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        } else if (transcript.includes('about')) {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        } else if (transcript.includes('services') || transcript.includes('features')) {
            document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
        } else if (transcript.includes('contact')) {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        } else if (transcript.includes('question')) {
            document.querySelector('#question').scrollIntoView({ behavior: 'smooth' });
        } else if (transcript.includes('chat')) {
            toggleChat(); 
        } else {
            console.log('Command not recognized:', transcript);
        }
    });

    recognition.addEventListener('end', () => {
     
        if (isVoiceActive) {
            recognition.start();
        }
    });

    document.getElementById('voice-command-btn').addEventListener('click', () => {
        if (!isVoiceActive) {
            isVoiceActive = true;
            recognition.start();
            console.log('Voice navigation activated.');
        } else {
            isVoiceActive = false;
            recognition.stop();
            console.log('Voice navigation deactivated.');
        }
    });
    recognition.addEventListener('start', () => {
        document.getElementById('voice-input-btn').classList.add('listening');
    });

    recognition.addEventListener('end', () => {
        document.getElementById('voice-input-btn').classList.remove('listening');
    });
} else {
    console.log('Speech Recognition API not supported in this browser.');
}
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Team Carousel on "Meet Our Team" button click
    document.querySelectorAll('.meet-team-btn').forEach(button => {
      button.addEventListener('click', function() {
        const teamSection = document.getElementById('team-carousel');
        if (!teamSection) {
          console.error('Team section not found!');
          return;
        }
        if (teamSection.style.display === "none" || teamSection.style.display === "") {
          teamSection.style.display = "block";
          setTimeout(() => { teamSection.style.opacity = 1; }, 10);
          teamSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          teamSection.style.opacity = 0;
          setTimeout(() => { teamSection.style.display = "none"; }, 600);
        }
      });
    });
  
    // Carousel functionality
    let currentSlide = 0;
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-item');
    const descs = document.querySelectorAll('.carousel-description p');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slideWidth = 250; // fixed width
  
    function centerActiveSlide() {
      const offset = currentSlide * slideWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }
  
    function showSlide(index) {
        currentSlide = index;
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
        descs.forEach((desc, i) => {
          desc.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        centerActiveSlide();
      }
      
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    let carouselInterval = setInterval(nextSlide, 7000);
  
    carouselWrapper.addEventListener('mouseenter', function() {
      clearInterval(carouselInterval);
    });
    carouselWrapper.addEventListener('mouseleave', function() {
      carouselInterval = setInterval(nextSlide, 7000);
    });
  
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        showSlide(index);
      });
    });
  
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        showSlide(index);
      });
    });
  
    window.addEventListener('resize', centerActiveSlide);
  
    centerActiveSlide();
    let lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    // If scrolling upward  
    if (currentScrollY < lastScrollY) {
      const teamSection = document.getElementById('team-carousel');
      if (teamSection && (teamSection.style.display === "block" || teamSection.style.display === "")) {
        // Hide the team section if it's open
        teamSection.style.opacity = 0;
        setTimeout(() => { teamSection.style.display = "none"; }, 600);
      }
    }
    lastScrollY = currentScrollY;
  });
});
  
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".about-carousel-track");
    const items = document.querySelectorAll(".about-carousel-item");
    const dots = document.querySelectorAll(".about-dot");
    let currentIndex = 0;
    const totalItems = items.length;
  
    function updateCarousel(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }
  
    // Dot navigation: add click listeners
    dots.forEach(dot => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"), 10);
        currentIndex = index;
        updateCarousel(index);
      });
    });
  
    // Optional: Auto slide every 3 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel(currentIndex);
    }, 3000);
  });
  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".aim-carousel-track");
    const items = document.querySelectorAll(".aim-carousel-item");
    const dots = document.querySelectorAll(".aim-dot");
    let currentIndex = 0;
    const totalSlides = items.length;
  
    function updateCarousel(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }
  
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"), 10);
        currentIndex = index;
        updateCarousel(index);
      });
    });
  
    // Optional: Auto-slide every 4 seconds
    if(totalSlides > 1) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(currentIndex);
      }, 4000);
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    const showButton = document.getElementById("show-aim-carousel");
    const carouselContainer = document.querySelector(".aim-carousel-container");

    // Show carousel on button click
    showButton.addEventListener("click", function () {
        carouselContainer.classList.add("active");
    });

    // Hide carousel when user scrolls to another section
    window.addEventListener("scroll", function () {
        const homeSection = document.getElementById("home");
        const rect = homeSection.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            carouselContainer.classList.remove("active");
        }
    });
});
    
