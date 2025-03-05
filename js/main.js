// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio site loaded');
    
    // Initialize project filtering
    initProjectFilters();
    
    // Initialize skill bars
    initSkillBars();
    
    // Handle contact form submission
    initContactForm();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Handle placeholder image if profile image fails to load
    handleProfileImage();
});

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize skill bars with animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        
        // Create the progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = '0%';
        progressBar.style.height = '6px';
        progressBar.style.backgroundColor = 'var(--primary-color)';
        progressBar.style.borderRadius = '3px';
        progressBar.style.marginTop = '8px';
        progressBar.style.transition = 'width 1s ease-in-out';
        
        item.appendChild(progressBar);
        
        // Animate when in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = `${level}%`;
                    }, 200);
                    observer.unobserve(item);
                }
            });
        });
        
        observer.observe(item);
    });
}

// Handle contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you! Your message has been sent.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Handle profile image
function handleProfileImage() {
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        profileImg.onerror = function() {
            this.src = 'https://via.placeholder.com/350x350?text=Your+Photo+Here';
            this.onerror = null;
        };
    }
}

// Typing animation for hero section (optional enhancement)
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];
        
        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        
        // Initial Type Speed
        let typeSpeed = 300;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}
