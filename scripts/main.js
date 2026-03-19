// Custom Cursor
const dot = document.querySelector('.cursor-dot');
const circle = document.querySelector('.cursor-circle');

window.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    
    circle.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor expansion on hover
document.querySelectorAll('a, button, .hover-lift, .skill-card').forEach(link => {
    link.addEventListener('mouseenter', () => {
        circle.style.transform = 'scale(1.4)';
        circle.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        circle.style.background = 'rgba(99, 102, 241, 0.05)';
    });
    link.addEventListener('mouseleave', () => {
        circle.style.transform = 'scale(1)';
        circle.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        circle.style.background = 'transparent';
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar Transparency on Scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(11, 11, 11, 0.8)';
        nav.style.padding = '1rem 0';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.05)';
        nav.style.padding = '1.5rem 0';
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Logic
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu && closeBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.style.right = '0';
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.style.right = '-100%';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.right = '-100%';
        });
    });
}

// Particle Animation
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
const connectionDistance = 150;
const mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - 10) this.x += 1;
            if (mouse.x > this.x && this.x > 10) this.x -= 1;
            if (mouse.y < this.y && this.y < canvas.height - 10) this.y += 1;
            if (mouse.y > this.y && this.y > 10) this.y -= 1;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - distance / connectionDistance) * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initParticles);
initParticles();
animate();
