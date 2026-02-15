/**
 * MASTER SCRIPT - PRITESH HIRANI PORTFOLIO v3.5
 * Features: Auto-Motion Network with Proximity Glow, Click Shockwave, 
 * Glitch HUD Modals, Typing Engine, and 3D Card Physics.
 */

/* ================= GLOBAL VARIABLES ================= */
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let outlineX = mouseX;
let outlineY = mouseY;
let particles = [];
const accent1 = getComputedStyle(document.documentElement).getPropertyValue('--accent-1').trim() || '#00f0ff';

/* ================= PRELOADER ================= */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => { 
            preloader.style.opacity = '0'; 
            preloader.style.visibility = 'hidden'; 
        }, 800);
    }
});

/* ================= MOUSE & TOUCH TRACKING ================= */
document.addEventListener('mousemove', e => { 
    mouseX = e.clientX; 
    mouseY = e.clientY; 
    
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const xOffset = (mouseX - window.innerWidth / 2) * 0.03;
        const yOffset = (mouseY - window.innerHeight / 2) * 0.03;
        hero.style.transform = `rotateY(${xOffset * 0.5}deg) rotateX(${yOffset * -0.5}deg) translate3d(${xOffset}px, ${yOffset}px, 0)`;
    }
});

document.addEventListener('touchmove', e => { 
    mouseX = e.touches[0].clientX; 
    mouseY = e.touches[0].clientY; 
}, {passive: true});

/* ================= FLUID CUSTOM CURSOR ================= */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

function animateCursor() {
    if(cursorDot && cursorOutline) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

function setupCursorHovers() {
    const selectors = 'a, button, .magnetic, .skills span, .pd-card, .tab-btn, .blog-card, .option-card, .option-rect, .macro, .back-to-top, .option-btn';
    document.querySelectorAll(selectors).forEach(el => {
        el.addEventListener('mouseenter', () => { document.body.classList.add('cursor-hover'); });
        el.addEventListener('mouseleave', () => { document.body.classList.remove('cursor-hover'); });
    });
}
setupCursorHovers();

/* ================= CLICK RIPPLE & SHOCKWAVE ================= */
document.addEventListener('click', e => {
    if(e.target.closest('a') || e.target.closest('button') || e.target.closest('.magnetic')) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    particles.forEach(p => {
        let dx = p.x - e.clientX;
        let dy = p.y - e.clientY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 350) {
            let force = (350 - dist) / 10;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
        }
    });
});

/* ================= AUTO-MOTION PLEXUS (PROXIMITY SYNC) ================= */
const canvas = document.getElementById('network');
if(canvas) {
    const ctx = canvas.getContext('2d');
    const colors = ['#00f0ff', '#6366f1', '#ff007f'];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    particles = []; 
    for(let i = 0; i < 90; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed < 0.5) { p.vx *= 1.05; p.vy *= 1.05; }
            if (speed > 3) { p.vx *= 0.95; p.vy *= 0.95; }

            let isNear = false;

            particles.forEach(p2 => {
                if (p === p2) return;
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < 110) {
                    isNear = true;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist/110})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            });

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            
            if (isNear) {
                ctx.fillStyle = "#fff"; // Glowing state
                ctx.shadowBlur = 8;
                ctx.shadowColor = accent1;
            } else {
                ctx.fillStyle = p.color; // Normal state
                ctx.shadowBlur = 0;
            }
            
            ctx.globalAlpha = 0.8;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        requestAnimationFrame(animateNetwork);
    }
    animateNetwork();
}

/* ================= HACKER TEXT DECODE EFFECT ================= */
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
function decodeText(element) {
    if(!element) return;
    let iteration = 0;
    const originalText = element.dataset.value || element.innerText;
    element.dataset.value = originalText;
    
    clearInterval(element.interval);
    element.interval = setInterval(() => {
        element.innerText = originalText.split("").map((letter, index) => {
            if(index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        if(iteration >= originalText.length) clearInterval(element.interval);
        iteration += 1 / 3;
    }, 30);
}

const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => { 
        if(e.isIntersecting) {
            e.target.classList.add('show');
            const title = e.target.querySelector('.decode-text');
            if(title && !title.classList.contains('decoded')) {
                decodeText(title);
                title.classList.add('decoded');
            }
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('section, header').forEach(s => secObs.observe(s));

/* ================= HUD MODAL SYSTEM ================= */
function showMissionDebrief(isSuccess, integrity, message) {
    const modal = document.getElementById('missionModal');
    if(!modal) return;
    document.getElementById('statusValue').innerText = isSuccess ? "PASSED" : "FAILED";
    document.getElementById('statusValue').style.color = isSuccess ? "#2ecc71" : "#e74c3c";
    document.getElementById('integrityValue').innerText = integrity;
    document.getElementById('modalMessage').innerText = message;
    
    const icon = document.getElementById('modalIcon');
    icon.innerHTML = isSuccess ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-triangle-exclamation"></i>';
    icon.style.color = isSuccess ? "#2ecc71" : "#e74c3c";

    modal.classList.add('active');
    decodeText(document.getElementById('modalHeading'));
}

function terminateSession() {
    const modal = document.getElementById('terminateModal');
    if(modal) {
        modal.classList.add('active');
        decodeText(document.getElementById('termHeading'));
    }
}

function closeTerminateModal() {
    const modal = document.getElementById('terminateModal');
    if(modal) modal.classList.remove('active');
}

/* ================= TYPING ENGINE ================= */
const typingEl = document.getElementById('typing');
if(typingEl) {
    const roles = [ "VLSI Physical Design Engineer", "Advanced Node (5nm) Specialist", "Timing & IR Drop Expert", "Hirani Tech Founder" ];
    let rIdx = 0, cIdx = 0, isDeleting = false;
    function type() {
        const curr = roles[rIdx];
        cIdx = isDeleting ? cIdx - 1 : cIdx + 1;
        typingEl.textContent = curr.substring(0, cIdx);
        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && cIdx === curr.length) { speed = 2000; isDeleting = true; } 
        else if (isDeleting && cIdx === 0) { isDeleting = false; rIdx = (rIdx + 1) % roles.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();
}

/* ================= UI ENHANCEMENTS ================= */
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if(btn) window.pageYOffset > 400 ? btn.classList.add('show') : btn.classList.remove('show');
});

// Card 3D Effect
document.querySelectorAll('.card, .blog-card, .game-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        if (window.innerWidth <= 768) return; 
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -8;
        const rotateY = ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = `rotateX(0) rotateY(0) scale3d(1,1,1)`);
});

// Magnetic Buttons
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - rect.left - rect.width/2)*0.4}px, ${(e.clientY - rect.top - rect.height/2)*0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
});

/* ================= LEARN PAGE TAB ENGINE ================= */
function switchTab(event, targetId) {
    // 1. Deactivate all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // 2. Hide all content panels
    const panels = document.querySelectorAll('.content-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    // 3. Activate the clicked button
    event.currentTarget.classList.add('active');

    // 4. Reveal the target content panel
    const targetPanel = document.getElementById(targetId);
    if(targetPanel) {
        targetPanel.classList.add('active');
        
        // Optional: Re-trigger the decode effect on the new title if you want that hacker vibe
        const title = targetPanel.querySelector('.decode-text');
        if(typeof decodeText === 'function' && title) decodeText(title);
    }
}
/* ================= LEARN PAGE TAB ENGINE ================= */
function openTab(evt, tabName) {
    // 1. Find all content panels and hide them by removing the 'active' class
    const tabcontent = document.getElementsByClassName("content-panel");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // 2. Find all tab buttons and remove the 'active' highlight state
    const tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 3. Show the specific panel you clicked on
    document.getElementById(tabName).classList.add("active");

    // 4. Highlight the button you just clicked
    evt.currentTarget.classList.add("active");

    // 5. (Optional) Re-trigger your hacker decode effect on the new title
    const title = document.getElementById(tabName).querySelector('.decode-text');
    if(typeof decodeText === 'function' && title) {
        title.classList.remove('decoded'); // Reset it so it decodes again
        decodeText(title);
    }
}

