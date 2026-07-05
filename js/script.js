/**
 * Pinecrest Academy - Core Script
 * Handles Navigation, Smooth Scroll, ScrollSpy, Form Validation, and Animations
 */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            delay: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Add scroll listener for sticky header styling
    window.addEventListener('scroll', handleHeaderScroll);
    
    // ScrollSpy: Highlight active navbar link on scroll
    window.addEventListener('scroll', scrollSpyHighlight);
});

// 1. Mobile Navbar Toggle (Original myFunction integration with modern enhancements)
function myFunction() {
    const x = document.getElementById("myTopnav");
    const navMenu = document.querySelector(".nav-menu");
    const toggleButton = document.querySelector(".mobile-nav-toggle");
    
    if (!x || !navMenu || !toggleButton) return;
    
    // Original check
    if (x.className === "navbar-lists") {
        x.className += " responsive";
        navMenu.classList.add("open");
        toggleButton.classList.add("active");
        
        // Update hamburger icons
        toggleButton.querySelector(".toggle-open").style.display = "none";
        toggleButton.querySelector(".toggle-close").style.display = "block";
    } else {
        x.className = "navbar-lists";
        navMenu.classList.remove("open");
        toggleButton.classList.remove("active");
        
        // Update hamburger icons
        toggleButton.querySelector(".toggle-open").style.display = "block";
        toggleButton.querySelector(".toggle-close").style.display = "none";
    }
}

// Close mobile navbar when clicking any link
document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
        const x = document.getElementById("myTopnav");
        const navMenu = document.querySelector(".nav-menu");
        const toggleButton = document.querySelector(".mobile-nav-toggle");
        
        if (x && x.className.includes("responsive")) {
            x.className = "navbar-lists";
            if (navMenu) navMenu.classList.remove("open");
            if (toggleButton) {
                toggleButton.classList.remove("active");
                toggleButton.querySelector(".toggle-open").style.display = "block";
                toggleButton.querySelector(".toggle-close").style.display = "none";
            }
        }
    });
});

// 2. Sticky Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;
    
    if (window.scrollY > 20) {
        header.classList.add("scroll-scrolled");
    } else {
        header.classList.remove("scroll-scrolled");
    }
}

// 3. Smooth Scrolling (Original click handler integrated with sticky header offset)
const scrollLinks = document.querySelectorAll('.navbar-link');

scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Check if it is an internal anchor
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.getElementById(targetId.substring(1));
            
            if (targetElement) {
                // Adjust for sticky header height
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Element with id '${targetId.substring(1)}' not found.`);
            }
        } else if (!targetId) {
            console.error('No href attribute found.');
        }
    });
});

// 4. ScrollSpy: Update active navigation item based on scroll position
function scrollSpyHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120; // Offset to trigger early
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
            if (activeLink) {
                document.querySelectorAll('.navbar-link').forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });
}

// 5. Contact Form Submission & Validation
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const feedbackEl = document.getElementById("form-feedback");
    
    if (!form || !feedbackEl) return;
    
    // Clear previous feedback classes
    feedbackEl.className = "form-feedback";
    feedbackEl.style.display = "none";
    
    // Basic Input Validations
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const msgVal = messageInput.value.trim();
    
    if (nameVal.length < 2) {
        showFeedback("Please enter your full name (at least 2 characters).", "error");
        nameInput.focus();
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        showFeedback("Please enter a valid email address.", "error");
        emailInput.focus();
        return;
    }
    
    if (msgVal.length < 10) {
        showFeedback("Message must be at least 10 characters long.", "error");
        messageInput.focus();
        return;
    }
    
    // Success State
    showFeedback("Thank you! Your message has been sent successfully. We will contact you soon.", "success");
    
    // Reset Form
    form.reset();
}

function showFeedback(message, type) {
    const feedbackEl = document.getElementById("form-feedback");
    if (!feedbackEl) return;
    
    feedbackEl.innerText = message;
    feedbackEl.classList.add(type);
    
    // Trigger smooth fade-in
    feedbackEl.style.opacity = 0;
    feedbackEl.style.display = "block";
    
    let opacity = 0;
    const interval = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(interval);
        } else {
            opacity += 0.1;
            feedbackEl.style.opacity = opacity;
        }
    }, 30);
}
