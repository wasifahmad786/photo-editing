document.addEventListener('DOMContentLoaded', () => {
    // --- Existing UI Logic ---
    const launchBtn = document.getElementById('launch-editor-btn');
    if(launchBtn) {
        launchBtn.addEventListener('click', () => {
            document.getElementById('editor-preview').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal animations on scroll
    const observerOptions = { threshold: 0.1 };
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

    // --- New Functional Editor Logic ---
    const fileInput = document.getElementById('upload-btn');
    const previewImg = document.getElementById('preview-img');
    const canvas = document.getElementById('photo-canvas');
    const ctx = canvas.getContext('2d');
    
    const brightnessInput = document.getElementById('brightness');
    const contrastInput = document.getElementById('contrast');
    const saturationInput = document.getElementById('saturation');
    const blurInput = document.getElementById('blur');
    const resetBtn = document.getElementById('reset-btn');
    
    const widthInput = document.getElementById('resize-width');
    const heightInput = document.getElementById('resize-height');
    const applyResizeBtn = document.getElementById('apply-resize-btn');
    const downloadBtn = document.getElementById('download-btn');

    let currentImage = new Image();
    currentImage.crossOrigin = "Anonymous";
    currentImage.src = previewImg.src;

    currentImage.onload = () => {
        if (!widthInput.value && !heightInput.value) {
            widthInput.value = currentImage.width;
            heightInput.value = currentImage.height;
        }
    };

    function applyFilters() {
        const brightness = brightnessInput.value;
        const contrast = contrastInput.value;
        const saturation = saturationInput.value;
        const blur = blurInput.value;
        
        const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
        previewImg.style.filter = filterStr;
    }

    const filters = [brightnessInput, contrastInput, saturationInput, blurInput];
    filters.forEach(input => {
        input.addEventListener('input', applyFilters);
    });

    resetBtn.addEventListener('click', () => {
        brightnessInput.value = 100;
        contrastInput.value = 115;
        saturationInput.value = 130;
        blurInput.value = 0;
        applyFilters();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            currentImage.src = event.target.result;
            previewImg.src = event.target.result;
            
            currentImage.onload = () => {
                widthInput.value = currentImage.width;
                heightInput.value = currentImage.height;
                resetBtn.click();
            };
        };
        reader.readAsDataURL(file);
    });

    applyResizeBtn.addEventListener('click', () => {
        if(!widthInput.value || !heightInput.value) return;
        alert(`Dimensions set to ${widthInput.value}x${heightInput.value}px. Click Download to save.`);
    });

    downloadBtn.addEventListener('click', () => {
        const w = parseInt(widthInput.value) || currentImage.width;
        const h = parseInt(heightInput.value) || currentImage.height;
        
        canvas.width = w;
        canvas.height = h;
        
        // Apply filters to canvas context
        ctx.filter = `brightness(${brightnessInput.value}%) contrast(${contrastInput.value}%) saturate(${saturationInput.value}%) blur(${blurInput.value}px)`;
        ctx.drawImage(currentImage, 0, 0, w, h);
        
        // Trigger download
        const link = document.createElement('a');
        link.download = 'edited-photo.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
