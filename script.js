// Main script to load portfolio data and animate elements

// Global variables for translations
let currentLanguage = 'en';
let translations = null;

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

// Load translations
async function loadTranslations(lang) {
    if (lang === 'en') {
        return null; // English is default, no translation needed
    }
    
    try {
        const response = await fetch(`translations_${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading translations for ${lang}:`, error);
        return null;
    }
}

// Initialize all content with animations
async function initPortfolio() {
    const portfolioData = await loadPortfolioData();
    if (!portfolioData) return;

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize language switcher
    initLanguageSwitcher();

    // Initialize title animation
    initTitleAnimation();
    
    // Load content sections
    loadAboutSection(portfolioData.profile);
    loadSkillsSection(portfolioData.skills);
    loadLanguagesSection(portfolioData.languages);
    loadCertificationsSection(portfolioData.certifications);
    
    // Load combined timeline (experience + education)
    loadCombinedTimeline(
        portfolioData.professionalExperience, 
        portfolioData.education
    );
    
    loadContactSection(portfolioData.profile.contact);

    // Initialize section transitions
    initSectionTransitions();
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

// Combined Timeline Section
function loadCombinedTimeline(experiences, education) {
    const timelineContent = document.getElementById('timeline-content');
    timelineContent.innerHTML = ''; // Clear existing content if any
    
    // Create a combined array of all timeline items (both education and work)
    let timelineItems = [];
    
    // Process professional experiences
    experiences.forEach(exp => {
        // For entries with multiple roles, add each role as a separate entry
        if (exp.roles && exp.roles.length > 0) {
            exp.roles.forEach(role => {
                timelineItems.push({
                    type: 'experience',
                    company: exp.company,
                    position: role.position,
                    period: role.period,
                    description: role.description,
                    // Extract year for sorting (assuming format like "jan/2023 - presente" or "2015 - 2017")
                    year: extractYearFromPeriod(role.period)
                });
            });
        } else {
            // For single role experiences
            timelineItems.push({
                type: 'experience',
                company: exp.company,
                position: exp.position,
                period: exp.period,
                description: exp.description,
                // Extract year for sorting
                year: extractYearFromPeriod(exp.period)
            });
        }
    });
    
    // Process education entries
    education.forEach(edu => {
        timelineItems.push({
            type: 'education',
            institution: edu.institution,
            degree: edu.degree,
            period: edu.period,
            // Extract year for sorting
            year: extractYearFromPeriod(edu.period)
        });
    });
    
    // Sort all items by year, most recent first
    timelineItems.sort((a, b) => b.year - a.year);
    
    // Create and append each timeline item
    timelineItems.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        
        // Create the timeline dot
        const timelineDot = document.createElement('div');
        timelineDot.classList.add('timeline-dot');
        // Add different colors for education vs experience
        if (item.type === 'education') {
            timelineDot.style.backgroundColor = 'var(--secondary-color)';
        } else {
            timelineDot.style.backgroundColor = 'var(--secondary-color)';
        }
        timelineItem.appendChild(timelineDot);
        
        // Create timeline content
        const itemContent = document.createElement('div');
        itemContent.classList.add('timeline-content');
        
        // Add year badge
        const timelineDate = document.createElement('div');
        timelineDate.classList.add('timeline-date');
        timelineDate.textContent = item.year;
        itemContent.appendChild(timelineDate);
        
        if (item.type === 'experience') {
            // Add company name
            const company = document.createElement('div');
            company.classList.add('timeline-company');
            company.textContent = item.company;
            itemContent.appendChild(company);
            
            // Add position
            const position = document.createElement('div');
            position.classList.add('timeline-position');
            position.textContent = item.position;
            itemContent.appendChild(position);
            
            // Add period
            const period = document.createElement('div');
            period.style.color = 'var(--text-light)';
            period.style.fontSize = '0.875rem';
            period.style.marginBottom = '10px';
            period.textContent = item.period;
            itemContent.appendChild(period);
            
            // Add description if available
            if (item.description) {
                const description = document.createElement('div');
                description.classList.add('timeline-description');
                description.textContent = item.description;
                itemContent.appendChild(description);
            }
        } else {
            // Add institution name
            const institution = document.createElement('div');
            institution.classList.add('timeline-institution');
            institution.textContent = item.institution;
            itemContent.appendChild(institution);
            
            // Add degree
            const degree = document.createElement('div');
            degree.classList.add('timeline-degree');
            degree.textContent = item.degree;
            itemContent.appendChild(degree);
            
            // Add period
            const period = document.createElement('div');
            period.style.color = 'var(--text-light)';
            period.style.fontSize = '0.875rem';
            period.textContent = item.period;
            itemContent.appendChild(period);
        }
        
        timelineItem.appendChild(itemContent);
        timelineContent.appendChild(timelineItem);
    });
    
    // Initialize timeline animations with Intersection Observer
    initTimelineAnimations();
}

// Helper function to extract year from period string
function extractYearFromPeriod(periodString) {
    // Look for patterns like "jan/2023", "2023 -", "2023", etc.
    const yearMatch = periodString.match(/\b(20\d{2})\b/);
    if (yearMatch) {
        return parseInt(yearMatch[1]);
    }
    
    // If "presente" or "present" is in the string, use current year
    if (periodString.toLowerCase().includes('presente') || 
        periodString.toLowerCase().includes('present')) {
        return new Date().getFullYear();
    }
    
    // Default to 0 if no year found (will appear at the end of the timeline)
    return 0;
}

// Initialize language switcher
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.getAttribute('data-lang');
            
            // Don't do anything if this language is already active
            if (currentLanguage === lang) return;
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Load translations for the selected language
            if (lang !== 'en' && !translations) {
                translations = await loadTranslations(lang);
            }
            
            // Update current language
            currentLanguage = lang;
            
            // Update all text on the page
            updatePageLanguage();
            
            // Special animation for language change
            anime({
                targets: '.section',
                opacity: [0.8, 1],
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Update page language
function updatePageLanguage() {
    if (currentLanguage === 'en') {
        // Reset to English (default)
        resetToEnglish();
        return;
    }
    
    if (!translations) return;
    
    // Update welcome title
    document.getElementById('title-animation').textContent = translations.general.welcomeTitle;
    
    // Update navigation menu
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks[0].textContent = translations.navigation.aboutMe;
    navLinks[1].textContent = translations.navigation.skills;
    navLinks[2].textContent = translations.navigation.languages;
    navLinks[3].textContent = translations.navigation.certifications;
    navLinks[4].textContent = translations.navigation.timeline || "Timeline";
    navLinks[5].textContent = translations.navigation.contact;
    
    // Update section titles
    document.querySelector('#about .section-title').textContent = translations.sections.aboutMe.title;
    document.querySelector('#skills .section-title').textContent = translations.sections.skills.title;
    document.querySelector('#languages .section-title').textContent = translations.sections.languages.title;
    document.querySelector('#certifications .section-title').textContent = translations.sections.certifications.title;
    document.querySelector('#timeline .section-title').textContent = translations.sections.timeline?.title || "Career Timeline";
    document.querySelector('#contact .section-title').textContent = translations.sections.contact.title;
    
    // Update skill category headings
    const skillCategories = document.querySelectorAll('.skill-category h3');
    skillCategories[0].textContent = translations.sections.skills.mainTechnologies;
    skillCategories[1].textContent = translations.sections.skills.otherTechnologies;
    skillCategories[2].textContent = translations.sections.skills.workMethodologies;
    
    // Update footer copyright
    document.querySelector('footer p').innerHTML = translations.general.copyright;
    
    // Update contact button texts
    const contactButtons = document.querySelectorAll('.contact-button span');
    contactButtons[0].textContent = translations.sections.contact.email;
    contactButtons[1].textContent = translations.sections.contact.linkedin;
    contactButtons[2].textContent = translations.sections.contact.github;
    contactButtons[3].textContent = translations.sections.contact.linktree;
}

// Reset to English
function resetToEnglish() {
    // Reset welcome title
    document.getElementById('title-animation').textContent = "Leonardo Gasparini";
    
    // Reset navigation menu
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks[0].textContent = "About Me";
    navLinks[1].textContent = "Skills";
    navLinks[2].textContent = "Languages";
    navLinks[3].textContent = "Certifications";
    navLinks[4].textContent = "Timeline";
    navLinks[5].textContent = "Contact";
    
    // Reset section titles
    document.querySelector('#about .section-title').textContent = "About Me";
    document.querySelector('#skills .section-title').textContent = "Skills";
    document.querySelector('#languages .section-title').textContent = "Languages";
    document.querySelector('#certifications .section-title').textContent = "Certifications";
    document.querySelector('#timeline .section-title').textContent = "Career Timeline";
    document.querySelector('#contact .section-title').textContent = "Contact";
    
    // Reset skill category headings
    const skillCategories = document.querySelectorAll('.skill-category h3');
    skillCategories[0].textContent = "Main Technologies";
    skillCategories[1].textContent = "Other Technologies";
    skillCategories[2].textContent = "Work Methodologies";
    
    // Reset footer copyright
    document.querySelector('footer p').innerHTML = `© <span id="current-year">${new Date().getFullYear()}</span> Leonardo Gasparini | Professional Portfolio`;
    
    // Reset contact button texts
    const contactButtons = document.querySelectorAll('.contact-button span');
    contactButtons[0].textContent = "Email";
    contactButtons[1].textContent = "LinkedIn";
    contactButtons[2].textContent = "GitHub";
    contactButtons[3].textContent = "Linktree";
}

// Title Animation with Anime.js
function initTitleAnimation() {
    const titleElement = document.getElementById('title-animation');
    titleElement.style.opacity = '1';
    
    anime({
        targets: '#title-animation',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1200,
        easing: 'easeOutQuad'
    });
    
    // Also animate the subtitle if present
    if (document.querySelector('.subtitle')) {
        anime({
            targets: '.subtitle',
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 1200,
            delay: 300,
            easing: 'easeOutQuad'
        });
    }
}

// Section Transitions
function initSectionTransitions() {
    // Simple scroll watcher to trigger section animations
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger animation
                entry.target.classList.add('section-visible');
                
                // Simple fade-in animation effect
                anime({
                    targets: entry.target,
                    opacity: [0.7, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize timeline animations with Intersection Observer
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Special animation for the timeline line
    document.querySelectorAll('.timeline-line').forEach(line => {
        anime({
            targets: line,
            opacity: [0, 1],
            height: ['0%', '100%'],
            duration: 1500,
            easing: 'easeInOutQuad'
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});