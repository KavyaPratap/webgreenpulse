/*function adjustTextSize(change) {
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
const faqResponses = {
    "services": "We offer 6 core services: Health Monitoring, Social Activities, Home Care, Meal Services, Transportation, and Personal Assistance. You can find details in our Services section.",
    "contact": "You can reach us via phone at (123) 456-7890 or email at info@esahara.com. Our office is located at 123 Care Street, City.",
    "hours": "Our support team is available 24/7. Office hours are Mon-Fri 9AM-5PM.",
    "team": "We're engineering students from NIET passionate about elderly care. Meet our team here: [team.html]",
    "default": "I'm here to help with common questions about our services, contact info, hours, and team. Feel free to ask anything!"
};

function toggleChat() {
    const chat = document.getElementById('chatbot-container');
    isChatOpen = !isChatOpen;
    chat.classList.toggle('chatbot-hidden');
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const messages = document.getElementById('chat-messages');
    const userText = input.value.trim().toLowerCase();

    if (!userText) return;

    messages.innerHTML += `
        <div class="message user-message">
            ${userText}
        </div>
    `;

    const response = getBotResponse(userText);
    messages.innerHTML += `
        <div class="message bot-message">
            ${response}
        </div>
    `;

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(input) {
    if (input.includes('service')) return faqResponses.services;
    if (input.includes('contact') || input.includes('email')) return faqResponses.contact;
    if (input.includes('hour') || input.includes('time')) return faqResponses.hours;
    if (input.includes('team') || input.includes('who')) return faqResponses.team;
    return faqResponses.default;
}

// Handle Enter key
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});


  async function sendMessage() {
  const input = document.getElementById('user-input');
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user-message');

  const typingIndicator = addMessage('...', 'bot-message typing');
  
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  typingIndicator.remove();
  const response = getBotResponse(userText.toLowerCase());
  await typeResponse(response);
}

function addMessage(text, className) {
  const messages = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${className}`;
  msgDiv.textContent = text;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
  return msgDiv;
}

async function typeResponse(text) {
  const messages = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message bot-message';
  messages.appendChild(msgDiv);

  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 35)); 
    msgDiv.textContent = text.substring(0, i + 1);
    messages.scrollTop = messages.scrollHeight;
  }
}

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
} else {
    console.log('Speech Recognition API not supported in this browser.');
}
*/

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
// Chatbot functionality (Updated AI Integration)
let isChatOpen = false;
let isProcessing = false; // Prevent multiple simultaneous requests
//add api section only...2line of code likh

async function getAIResponse(userMessage) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `As a senior care assistant,keep responses concise, and dont answer any useless question and chats, only answer what we do, what website is about, services of website as listed, respond to: ${userMessage}` }]
                }]
            }),
        });

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("API error:", error);
        return "Error connecting to AI. Please try again later.";
    }
}

function toggleChat() {
    const chat = document.getElementById('chatbot-container');
    isChatOpen = !isChatOpen;
    chat.classList.toggle('chatbot-hidden');
}

async function sendMessage() {
    if (isProcessing) return;
    
    const input = document.getElementById('user-input');
    const messages = document.getElementById('chat-messages');
    const userText = input.value.trim();
    
    if (!userText) return;

    isProcessing = true;
    input.disabled = true;

    // Add user message
    messages.innerHTML += `<div class="message user-message">${userText}</div>`;
    input.value = '';
    
    // Add typing indicator
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

if (window.SpeechRecognition) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    document.getElementById('voice-command-btn')?.addEventListener('click', () => {
        recognition[recognition.continuous ? 'stop' : 'start']();
    });

    recognition.addEventListener('result', (e) => {
        const transcript = e.results[e.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('toggle chat')) toggleChat();
    });
}


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
} else {
    console.log('Speech Recognition API not supported in this browser.');
}
