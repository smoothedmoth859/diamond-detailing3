document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 2. Reveal on scroll (Intersection Observer)
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
        revealObserver.observe(el);
    });

    // 3. Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    menuBtn?.addEventListener('click', () => {
        const isOpen = menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. Booking form
    const form = document.getElementById('booking-form');
    const formMsg = document.getElementById('form-msg');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('#submit-btn');
        const original = btn.textContent;

        btn.textContent = 'Wird gesendet…';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            form.reset();
            formMsg.style.display = 'block';
            formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => { formMsg.style.display = 'none'; }, 6000);
        }, 1600);
    });

    // 5. Modal: close on overlay click or ESC
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) window.location.hash = '';
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.location.hash = '';
    });

    // 6. Hero image parallax (subtle)
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const shift = window.scrollY * 0.25;
            heroImg.style.transform = `scale(1.04) translateY(${shift}px)`;
        }, { passive: true });
    }

    // 7. Smooth active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${entry.target.id}`
                        ? 'var(--gold)'
                        : '';
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => activeObserver.observe(s));
});
