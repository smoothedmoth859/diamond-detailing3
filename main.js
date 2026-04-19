document.addEventListener('DOMContentLoaded', () => {
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
    
    // Log System Status
    console.log('%c DIAMOND DETAILING v3.0 | SYSTEM OPERATIONAL ', 'background: #22d3ee; color: #000; font-weight: bold;');
});
