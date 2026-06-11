document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorDot && cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Add a slight lag to the glow for smooth trailing effect
            cursorGlow.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects on clickable elements
        const clickables = document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // 2. Boot Screen Sequence
    const bootScreen = document.getElementById('boot-screen');
    const typewriters = document.querySelectorAll('.typewriter-text');
    
    if (bootScreen && typewriters.length > 0) {
        // Start sequence
        setTimeout(() => {
            typewriters[0].classList.add('active');
            typewriters[0].textContent = typewriters[0].getAttribute('data-text');
        }, 500);

        setTimeout(() => {
            typewriters[1].classList.add('active');
            typewriters[1].textContent = typewriters[1].getAttribute('data-text');
        }, 2000);

        setTimeout(() => {
            typewriters[2].classList.add('active');
            typewriters[2].textContent = typewriters[2].getAttribute('data-text');
        }, 3500);

        // Hide boot screen
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.style.display = 'none';
                initReveal(); // Initialize reveal animations after boot
                initHeroTyping();
            }, 500);
        }, 5000);
    } else {
        initReveal();
        initHeroTyping();
    }

    // 3. Scroll Reveal with Intersection Observer
    function initReveal() {
        const revealElements = document.querySelectorAll('.hidden');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 4. Hero Section Typing Effect
    function initHeroTyping() {
        const typingRoles = document.querySelector('.typing-roles');
        if (!typingRoles) return;
        
        const roles = ["Web Developer", "AI Enthusiast", "Problem Solver"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingRoles.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingRoles.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000); // Start after boot screen
    }

    // 5. Basic Particle Setup for Background
    function createParticles() {
        const pjs = document.getElementById('particles-js');
        if(!pjs) return;
        
        // Create 50 random simple code particles traversing the background
        const chars = ['{', '}', '< />', ';', '[]', '()', '=>', 'import'];
        for(let i=0; i<30; i++) {
            let p = document.createElement('div');
            p.textContent = chars[Math.floor(Math.random() * chars.length)];
            p.style.position = 'absolute';
            p.style.top = `${Math.random() * 100}vh`;
            p.style.left = `${Math.random() * 100}vw`;
            p.style.color = 'rgba(0, 243, 255, 0.05)';
            p.style.fontFamily = 'monospace';
            p.style.fontSize = `${Math.random() * 20 + 10}px`;
            p.style.pointerEvents = 'none';
            p.style.zIndex = '0';
            p.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            pjs.appendChild(p);
        }
    }
    
    // Only create particles if not on mobile for performance
    if(!isTouchDevice) {
        createParticles();
    }
});
