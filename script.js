// Main script to load portfolio data and animate elements

// Load JSON data
async function loadPortfolioData() {
    try {
        const response = await fetch('portfolio_data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        return null;
    }
}

// Initialize all content with animations
async function initPortfolio() {
    const portfolioData = await loadPortfolioData();
    if (!portfolioData) return;

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize title animation
    initTitleAnimation();
    
    // Initialize SNES animation
    initSNESAnimation();
    
    // Load content sections
    loadAboutSection(portfolioData.profile);
    loadSkillsSection(portfolioData.skills);
    loadLanguagesSection(portfolioData.languages);
    loadCertificationsSection(portfolioData.certifications);
    loadExperienceSection(portfolioData.professionalExperience);
    loadEducationSection(portfolioData.education);
    loadContactSection(portfolioData.profile.contact);

    // Initialize section transitions
    initSectionTransitions();
}

// Title Animation with Anime.js
function initTitleAnimation() {
    const titleElement = document.getElementById('title-animation');
    titleElement.style.opacity = '1';
    
    anime({
        targets: '#title-animation',
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeInOutQuad',
        complete: function() {
            // Glitch effect after appearing
            setInterval(() => {
                anime({
                    targets: '#title-animation',
                    color: [
                        { value: 'rgb(255, 0, 255)', duration: 100 },
                        { value: 'rgb(0, 255, 255)', duration: 100 },
                        { value: 'rgb(255, 0, 255)', duration: 100 }
                    ],
                    textShadow: [
                        { value: '0 0 8px rgba(255, 0, 255, 0.8)', duration: 100 },
                        { value: '0 0 8px rgba(0, 255, 255, 0.8)', duration: 100 },
                        { value: '0 0 8px rgba(255, 0, 255, 0.8)', duration: 100 }
                    ],
                    translateY: [
                        { value: 0, duration: 50 },
                        { value: -2, duration: 50 },
                        { value: 0, duration: 50 }
                    ],
                    easing: 'steps(1)'
                });
            }, 5000); // Glitch every 5 seconds
        }
    });
}

// SNES Animation with Anime.js
function initSNESAnimation() {
    // Animate SNES console floating
    anime({
        targets: '.snes-console',
        translateY: [0, -10],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
        duration: 3000
    });
    
    // Animate SNES controller floating
    anime({
        targets: '.snes-controller',
        translateY: [0, -8],
        rotate: -5,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
        duration: 2800,
        delay: 200
    });
    
    // Animate TV screen floating
    anime({
        targets: '.pixel-television',
        translateY: [0, -12],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
        duration: 4000,
        delay: 300
    });
    
    // Animate blinking text on TV
    anime({
        targets: '.tv-content',
        opacity: [1, 0],
        easing: 'steps(1)',
        duration: 1000,
        loop: true
    });
    
    // Add interactivity to the buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.2,
                backgroundColor: 'var(--accent-color)',
                boxShadow: '0 0 10px var(--accent-color)',
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                backgroundColor: 'var(--snes-purple)',
                boxShadow: '0 2px 0 var(--snes-dark-purple)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Special animation for start button
    const startButton = document.querySelector('.button-start');
    startButton.addEventListener('click', () => {
        // Change TV screen content
        const tvContent = document.querySelector('.tv-content');
        tvContent.textContent = 'LOADING...';
        
        // Flash the screen
        anime({
            targets: '.tv-screen',
            backgroundColor: [
                { value: '#fff', duration: 100 },
                { value: '#000', duration: 300 }
            ],
            easing: 'linear',
            complete: function() {
                // Scroll to About section
                setTimeout(() => {
                    document.getElementById('about').scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Change TV content back after delay
                    setTimeout(() => {
                        tvContent.textContent = 'PRESS START';
                    }, 2000);
                }, 800);
            }
        });
    });
    
    // Make power button interactive
    const powerButton = document.querySelector('.power-button');
    powerButton.addEventListener('click', () => {
        // Toggle the TV on/off effect
        const tvScreen = document.querySelector('.tv-screen');
        
        if (tvScreen.classList.contains('tv-off')) {
            // Turn on
            tvScreen.classList.remove('tv-off');
            anime({
                targets: '.tv-screen',
                backgroundColor: [
                    { value: '#000', duration: 500 }
                ],
                easing: 'easeOutQuad',
                complete: function() {
                    document.querySelector('.tv-content').style.display = 'block';
                }
            });
        } else {
            // Turn off
            document.querySelector('.tv-content').style.display = 'none';
            anime({
                targets: '.tv-screen',
                backgroundColor: [
                    { value: '#222', duration: 200 },
                    { value: '#111', duration: 200 },
                    { value: '#000', duration: 200 }
                ],
                easing: 'easeInQuad',
                complete: function() {
                    tvScreen.classList.add('tv-off');
                }
            });
        }
    });
}

// About Section
function loadAboutSection(profile) {
    const aboutContent = document.getElementById('about-content');
    
    // Create and append name and headline
    const nameHeadline = document.createElement('div');
    nameHeadline.innerHTML = `<h3>${profile.fullName}</h3><p>${profile.headline}</p>`;
    nameHeadline.classList.add('name-headline');
    aboutContent.appendChild(nameHeadline);
    
    // Create and append location
    const location = document.createElement('div');
    location.innerHTML = `<p class="location">${profile.location}</p>`;
    aboutContent.appendChild(location);
    
    // Create and append summary
    const summary = document.createElement('div');
    summary.innerHTML = `<p>${profile.summary}</p>`;
    summary.classList.add('summary');
    aboutContent.appendChild(summary);
    
    // Animate the content appearing
    anime({
        targets: '#about-content > *',
        opacity: [0, 1],
        translateY: [10, 0],
        delay: anime.stagger(200),
        easing: 'easeOutQuad'
    });
}

// Skills Section
function loadSkillsSection(skills) {
    // Main Technologies
    const mainTechnologies = document.getElementById('main-technologies');
    skills.mainTechnologies.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.textContent = skill;
        skillItem.classList.add('skill-item');
        mainTechnologies.appendChild(skillItem);
    });
    
    // Other Technologies
    const otherTechnologies = document.getElementById('other-technologies');
    skills.otherTechnologies.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.textContent = skill;
        skillItem.classList.add('skill-item');
        otherTechnologies.appendChild(skillItem);
    });
    
    // Work Methodologies
    const methodologies = document.getElementById('methodologies');
    skills.workMethodologies.forEach(method => {
        const methodItem = document.createElement('div');
        methodItem.textContent = method;
        methodItem.classList.add('skill-item');
        methodologies.appendChild(methodItem);
    });
    
    // Animate skills appearing
    anime({
        targets: '.skill-item',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(50),
        easing: 'easeOutElastic(1, .5)'
    });
}

// Languages Section
function loadLanguagesSection(languages) {
    const languagesContent = document.getElementById('languages-content');
    
    languages.forEach(lang => {
        const languageItem = document.createElement('div');
        languageItem.classList.add('language-item');
        languageItem.innerHTML = `
            <div class="language-name">${lang.language}</div>
            <div class="language-level">${lang.proficiency}</div>
        `;
        languagesContent.appendChild(languageItem);
    });
    
    // Animate languages appearing
    anime({
        targets: '.language-item',
        opacity: [0, 1],
        translateX: [20, 0],
        delay: anime.stagger(150),
        easing: 'easeOutSine'
    });
}

// Certifications Section
function loadCertificationsSection(certifications) {
    const certificationsContent = document.getElementById('certifications-content');
    
    certifications.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.classList.add('certification-item');
        certItem.textContent = cert;
        certificationsContent.appendChild(certItem);
    });
    
    // Animate certifications appearing
    anime({
        targets: '.certification-item',
        opacity: [0, 1],
        translateY: [5, 0],
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });
}

// Experience Section
function loadExperienceSection(experiences) {
    const experienceContent = document.getElementById('experience-content');
    
    experiences.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.classList.add('experience-item');
        
        // Handle companies with multiple roles
        if (exp.roles) {
            let rolesHTML = '';
            exp.roles.forEach(role => {
                rolesHTML += `
                    <div class="experience-role">
                        <div class="experience-position">${role.position}</div>
                        <div class="experience-period">${role.period}</div>
                        <div class="experience-description">${role.description}</div>
                    </div>
                `;
            });
            
            expItem.innerHTML = `
                <div class="experience-company">${exp.company}</div>
                ${rolesHTML}
            `;
        } else {
            expItem.innerHTML = `
                <div class="experience-company">${exp.company}</div>
                <div class="experience-position">${exp.position}</div>
                <div class="experience-period">${exp.period}</div>
                <div class="experience-description">${exp.description}</div>
            `;
        }
        
        experienceContent.appendChild(expItem);
    });
    
    // Animate experience items appearing
    anime({
        targets: '.experience-item',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        easing: 'easeOutQuad'
    });
}

// Education Section
function loadEducationSection(education) {
    const educationContent = document.getElementById('education-content');
    
    education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.classList.add('education-item');
        eduItem.innerHTML = `
            <div class="education-institution">${edu.institution}</div>
            <div class="education-degree">${edu.degree}</div>
            <div class="education-period">${edu.period}</div>
        `;
        educationContent.appendChild(eduItem);
    });
    
    // Animate education items appearing
    anime({
        targets: '.education-item',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        easing: 'easeOutQuad'
    });
}

// Contact Section
function loadContactSection(contact) {
    const contactContent = document.getElementById('contact-content');
    
    // Email Button
    const emailButton = document.createElement('a');
    emailButton.href = `mailto:${contact.email}`;
    emailButton.classList.add('contact-button');
    emailButton.innerHTML = `<span>Email</span>`;
    contactContent.appendChild(emailButton);
    
    // LinkedIn Button
    const linkedinButton = document.createElement('a');
    linkedinButton.href = contact.linkedin;
    linkedinButton.target = '_blank';
    linkedinButton.classList.add('contact-button');
    linkedinButton.innerHTML = `<span>LinkedIn</span>`;
    contactContent.appendChild(linkedinButton);
    
    // GitHub Button
    const githubButton = document.createElement('a');
    githubButton.href = contact.github;
    githubButton.target = '_blank';
    githubButton.classList.add('contact-button');
    githubButton.innerHTML = `<span>GitHub</span>`;
    contactContent.appendChild(githubButton);
    
    // Linktree Button
    const linktreeButton = document.createElement('a');
    linktreeButton.href = contact.linktree;
    linktreeButton.target = '_blank';
    linktreeButton.classList.add('contact-button');
    linktreeButton.innerHTML = `<span>Linktree</span>`;
    contactContent.appendChild(linktreeButton);
    
    // Animate contact buttons appearing
    anime({
        targets: '.contact-button',
        opacity: [0, 1],
        scale: [0.9, 1],
        delay: anime.stagger(150),
        easing: 'easeOutElastic(1, .5)'
    });
}

// Section Transitions
function initSectionTransitions() {
    // Simple scroll watcher to trigger section animations
    const sections = document.querySelectorAll('.game-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger animation
                entry.target.classList.add('section-visible');
                
                // Simple pixel-style transition effect
                anime({
                    targets: entry.target,
                    backgroundColor: [
                        { value: 'rgba(255, 255, 255, 0.1)', duration: 100 },
                        { value: 'rgba(30, 30, 50, 0.7)', duration: 300 }
                    ],
                    easing: 'steps(3)'
                });
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Generate starfield
function generateStarfield() {
    const starfield = document.querySelector('.starfield');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        star.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        starfield.appendChild(star);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    generateStarfield();
});