// Hero Slider
let currentSlide = 1;

const heroImages = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600'
];

function changeSlide(direction) {
    const hero = document.querySelector('.hero');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current dot
    dots[currentSlide - 1].classList.remove('active');
    
    // Update current slide
    currentSlide += direction;
    
    // Loop around
    if (currentSlide > 3) currentSlide = 1;
    if (currentSlide < 1) currentSlide = 3;
    
    // Add active class to new dot
    dots[currentSlide - 1].classList.add('active');
    
    // Update background image
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${heroImages[currentSlide - 1]}')`;
}

function currentSlide(n) {
    const hero = document.querySelector('.hero');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Update current slide
    currentSlide = n;
    
    // Add active class to clicked dot
    dots[currentSlide - 1].classList.add('active');
    
    // Update background image
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${heroImages[currentSlide - 1]}')`;
}

// Auto slide
setInterval(() => {
    changeSlide(1);
}, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements
window.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.offer-card, .feature-item, .package-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery lightbox effect
const galleryImages = document.querySelectorAll('.gallery-grid img');

galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', function() {
            this.remove();
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Counter animation for booking badges
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = `Booked: ${Math.floor(current)}/530`;
    }, 30);
}

// Trigger counter animation when booking badges are visible
const bookingBadges = document.querySelectorAll('.booking-badge');
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            animateCounter(entry.target, 500);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

bookingBadges.forEach(badge => badgeObserver.observe(badge));

// Form handling (if you add a form later)
function handleFormSubmit(event) {
    event.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your interest! We will contact you soon.');
}

// Add click handlers to all "APPLY NOW" buttons
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.trim() === 'APPLY NOW') {
            e.preventDefault();
            alert('Application form will open here. Please contact us at info@thekokentrip.com or call +91-253-2312345');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Add hover effect to cards
document.querySelectorAll('.offer-card, .package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('The Kokan Trip website loaded successfully!');