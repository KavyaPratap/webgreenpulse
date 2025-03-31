document.addEventListener('DOMContentLoaded', () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Voice command elements
    const voiceBtn = document.getElementById('voice-command-btn');
    const chatInput = document.getElementById('user-input');

    if (!voiceBtn) return;

    let isVoiceActive = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        // Chat input handling
        if (chatInput && document.activeElement === chatInput) {
            chatInput.value = transcript;
            return;
        }

        // Navigation commands
        const sections = {
            'home': '#home',
            'about': '#about',
            'services': '#features',
            'features': '#features',
            'contact': '#contact',
            'chat': '#chatbot-container'
        };

        Object.entries(sections).forEach(([keyword, selector]) => {
            if (transcript.includes(keyword)) {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    if (selector === '#chatbot-container') toggleChat();
                }
            }
        });
    };

    recognition.onerror = (event) => {
        console.log('Voice error:', event.error);
        voiceBtn.classList.remove('listening');
    };

    recognition.onend = () => {
        voiceBtn.classList.remove('listening');
        if (isVoiceActive) recognition.start();
    };

    // Toggle voice control
    voiceBtn.addEventListener('click', () => {
        isVoiceActive = !isVoiceActive;
        voiceBtn.classList.toggle('listening', isVoiceActive);
        
        if (isVoiceActive) {
            recognition.start();
            voiceBtn.title = 'Voice control active - say "home", "about", etc.';
        } else {
            recognition.stop();
            voiceBtn.title = 'Enable voice control';
        }
    });

    // Chat-specific voice input
    const chatVoiceBtn = document.getElementById('voice-input-btn');
    if (chatVoiceBtn) {
        chatVoiceBtn.addEventListener('click', () => {
            recognition.stop();
            recognition.lang = document.documentElement.lang || 'en-US';
            recognition.start();
        });
    }
});