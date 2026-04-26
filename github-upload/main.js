document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Navigation Scroll Effect
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Form Handling with Cyber Theme
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Artificial "Processing" feel
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> LINKING...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> UPLOAD_COMPLETE';
                btn.style.background = 'var(--green)';
                btn.style.color = '#000';
                
                setTimeout(() => {
                    alert('Anfrage erfolgreich gesendet! Wir melden uns in Kürze.');
                    bookingForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 2000);
            }, 1500);
        });
    }

    // Cyber Segment Transition
    const overlay = document.querySelector('.transition-overlay');

    function triggerTransition(targetId) {
        // Close mobile menu if open
        navLinks.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');

        overlay.classList.add('active');
        
        setTimeout(() => {
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'instant'
                });
            }
            
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 300);
        }, 600);
    }

    // Smooth Scrolling for Nav Links with Transition
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            triggerTransition(targetId);
        });
    });
    
    // Interactive 3D Tilt for Team Cards
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg
            const rotateX = ((centerY - y) / centerY) * 10; // Max 10deg
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Before/After Slider Logic
    const slider = document.getElementById('comparisonSlider');
    const imgAfterContainer = document.querySelector('.img-after');
    const sliderLine = document.querySelector('.slider-line');
    const sliderButton = document.querySelector('.slider-button');
    const sliderParent = document.querySelector('.comparison-container');

    if (slider) {
        const updateSliderWidth = () => {
            const containerWidth = sliderParent.offsetWidth;
            const afterImg = imgAfterContainer.querySelector('img');
            if (afterImg) afterImg.style.width = containerWidth + 'px';
        };

        window.addEventListener('resize', updateSliderWidth);
        updateSliderWidth(); // Initial set

        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            imgAfterContainer.style.width = `${value}%`;
            sliderLine.style.left = `${value}%`;
            sliderButton.style.left = `${value}%`;
        });
    }

    // Log System Status
    console.log('%c DIAMOND DETAILING v3.0 | SYSTEM OPERATIONAL ', 'background: #22d3ee; color: #000; font-weight: bold;');
});
