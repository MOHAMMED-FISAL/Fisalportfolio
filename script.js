document.addEventListener('DOMContentLoaded', () => {

    // ── EmailJS init ──
    if (typeof emailjs !== 'undefined') {
        emailjs.init("HBYfpnq3XH4p5vOga");
    }

    // ── Elements ──
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // ── Sidebar toggle ──
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    // ── All data-section elements (nav links + hero buttons) ──
    document.querySelectorAll('[data-section]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const sectionId = el.getAttribute('data-section');
            showSection(sectionId);
            // Close sidebar on mobile
            if (window.innerWidth <= 768) closeSidebar();
        });
    });

    // ── Contact form ──
    const form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', sendMail);

    // ── Keyboard: close sidebar on Escape ──
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSidebar();
    });

});

// ── Show section ──
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active-section');
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
    });
}

// ── Send mail ──
function sendMail(event) {
    event.preventDefault();

    const btn = document.getElementById('send-btn');
    const originalText = btn.innerText;
    btn.innerText = 'Sending…';
    btn.disabled = true;

    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    if (typeof emailjs === 'undefined') {
        alert('Email service not available. Please email directly at Mohammedfisalc@gmail.com');
        btn.innerText = originalText;
        btn.disabled = false;
        return;
    }

    emailjs.send('service_resumefisal', 'template_n83lo3l', templateParams)
        .then(() => {
            alert('Message sent successfully! I will get back to you soon.');
            event.target.reset();
        })
        .catch(err => {
            console.error('EmailJS error:', err);
            alert('Failed to send. Please email me directly at Mohammedfisalc@gmail.com');
        })
        .finally(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        });
}
