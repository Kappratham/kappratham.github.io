// ================================
// CANVAS PARTICLE BACKGROUND
// ================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const NUM_PARTICLES = 80;

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#00ffaa' : '#00c8ff';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = '#00ffaa';
                ctx.globalAlpha = (1 - dist / 120) * 0.08;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ================================
// TERMINAL TYPING EFFECT
// ================================
const commands = [
    { cmd: 'python rag_pipeline.py --model llama2', output: '✓ LLaMA-2 loaded | ChromaDB ready | Streamlit running on :8501' },
    { cmd: 'uvicorn main:app --port 8000', output: '✓ FastAPI running | 110K records | XGBoost model loaded' },
    { cmd: 'ollama run llama2:7b-q4', output: '✓ Quantized model loaded | Memory: -40% | Ready for inference' },
    { cmd: 'git push origin main', output: '✓ Deployed to production | github.com/kappratham' },
];

let cmdIndex = 0;
let charIndex = 0;
let outputIndex = 0;
let phase = 'typing'; // typing | output | pause
let pauseCount = 0;

const cmdEl = document.getElementById('typed-cmd');
const outputEl = document.getElementById('typed-output');

function typeTerminal() {
    const current = commands[cmdIndex];

    if (phase === 'typing') {
        if (charIndex < current.cmd.length) {
            cmdEl.textContent += current.cmd[charIndex];
            charIndex++;
            setTimeout(typeTerminal, 45);
        } else {
            phase = 'output';
            outputEl.textContent = '';
            outputIndex = 0;
            setTimeout(typeTerminal, 300);
        }
    } else if (phase === 'output') {
        if (outputIndex < current.output.length) {
            outputEl.textContent += current.output[outputIndex];
            outputIndex++;
            setTimeout(typeTerminal, 20);
        } else {
            phase = 'pause';
            pauseCount = 0;
            setTimeout(typeTerminal, 2500);
        }
    } else if (phase === 'pause') {
        cmdEl.textContent = '';
        outputEl.textContent = '';
        charIndex = 0;
        cmdIndex = (cmdIndex + 1) % commands.length;
        phase = 'typing';
        setTimeout(typeTerminal, 300);
    }
}

setTimeout(typeTerminal, 1000);

// ================================
// NAVBAR
// ================================
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 300);
});

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('nav-active'));
});

// ================================
// CUSTOM CURSOR
// ================================
const cursorDot = document.createElement('div');
cursorDot.style.cssText = `
    position: fixed; width: 8px; height: 8px;
    background: #00ffaa; border-radius: 50%;
    pointer-events: none; z-index: 9999;
    box-shadow: 0 0 10px #00ffaa;
    transition: transform 0.1s;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorDot);

const cursorRing = document.createElement('div');
cursorRing.style.cssText = `
    position: fixed; width: 28px; height: 28px;
    border: 1px solid rgba(0,255,170,0.4); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transition: all 0.15s ease;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .stat-card, .project-card, .skill-pills span').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursorRing.style.borderColor = 'rgba(0,255,170,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(0,255,170,0.4)';
    });
});

// ================================
// SCROLL REVEAL
// ================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .stat-card, .skill-category, .cert-card, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
