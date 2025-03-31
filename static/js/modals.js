document.addEventListener('DOMContentLoaded', () => {
    // Modal handling
    const modals = {
        'collaborate-btn': 'collaborate-modal',
        'join-us-btn': 'join-us-modal'
    };

    // Initialize all modals
    Object.entries(modals).forEach(([triggerId, modalId]) => {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        
        if (trigger && modal) {
            // Open modal
            trigger.addEventListener('click', () => {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });

            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });

    // Close modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Form submission handling
    document.querySelectorAll('.email-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            try {
                const response = await fetch("{{ url_for('submit_form') }}", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': document.querySelector('[name=csrf_token]').value
                    }
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                    form.closest('.modal').style.display = 'none';
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Error sending message. Please try again.');
            }
        });
    });
});