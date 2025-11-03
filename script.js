// --- Navigation ---
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// --- Smooth Scrolling for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile nav on click
        const nav = document.querySelector('.nav-links');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            document.querySelector('.burger').classList.remove('toggle');
        }
    });
});

// --- Scroll Animations ---
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .skill-item').forEach((el) => {
    scrollObserver.observe(el);
});

// Add this CSS for animations
const style = document.createElement('style');
style.innerHTML = `
    section, .project-card, .skill-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    section.in-view, .project-card.in-view, .skill-item.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    .nav-links.nav-active {
        transform: translateX(0%);
    }
    .burger.toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .burger.toggle .line2 { opacity: 0; }
    .burger.toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }

    .burger div {
        width: 25px;
        height: 3px;
        background-color: var(--secondary-color);
        margin: 5px;
        transition: all 0.3s ease;
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
`;
document.head.appendChild(style);

// Run all functions
navSlide();