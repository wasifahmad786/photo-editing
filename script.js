document.addEventListener('DOMContentLoaded', () => {
    const launchBtn = document.getElementById('launch-editor-btn');
    const previewImg = document.getElementById('preview-img');
    const ranges = document.querySelectorAll('input[type="range"]');

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle range inputs to simulate live editing in mockup
    ranges.forEach(range => {
        range.addEventListener('input', () => {
            const brightness = document.querySelector('input:nth-of-type(1)').value;
            const contrast = document.querySelector('input:nth-of-type(2)').value;
            const saturation = document.querySelector('input:nth-of-type(3)').value;
            
            previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        });
    });

    // Button hover effects and interactions
    launchBtn.addEventListener('click', () => {
        alert('Welcome to LuminaEdit! This is a demo version of the professional suite.');
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
