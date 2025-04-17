document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
    // Dropdown menu functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const menu = dropdown.querySelector('.dropdown-menu');
                menu.classList.toggle('show');
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a:not(.dropdown a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('show');
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Swiper for testimonials
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    // Form validation
    const form = document.getElementById('registrationForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Please enter your name';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate skill
        const skill = document.getElementById('skill');
        if (skill.value === '') {
            document.getElementById('skill-error').textContent = 'Please select your skill category';
            document.getElementById('skill-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate portfolio URL if provided
        const portfolio = document.getElementById('portfolio');
        if (portfolio.value.trim() !== '' && !isValidUrl(portfolio.value)) {
            document.getElementById('portfolio-error').textContent = 'Please enter a valid URL (e.g., https://example.com)';
            document.getElementById('portfolio-error').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid, show thank you message
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // In a real application, you would submit the form data to a server here
            console.log('Form submitted:', {
                name: name.value,
                email: email.value,
                skill: skill.value,
                portfolio: portfolio.value
            });
        }
    });
    
    // Helper function to validate URLs
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    // Reset form function
    window.resetForm = function() {
        document.getElementById('registrationForm').reset();
        document.getElementById('registrationForm').style.display = 'block';
        thankYouMessage.style.display = 'none';
    };
});