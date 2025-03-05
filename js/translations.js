document.addEventListener('DOMContentLoaded', function() {
    // Translations dictionary
    const translations = {
        'en': {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-skills': 'Skills',
            'nav-contact': 'Contact',
            
            // Hero section
            'hero-title-1': 'Hi, I\'m <span class="highlight">Leonardo Gasparini</span>',
            'hero-title-2': '.NET Developer | Solution Architect | Professor',
            'hero-description': 'Technology professional with solid experience in the .NET ecosystem since 2012',
            'hero-btn-work': 'My Skills',
            'hero-btn-contact': 'Contact Me',
            
            // About section
            'about-title': 'About Me',
            'about-p1': 'I\'m a technology professional from São Paulo, Brazil, with solid experience in the .NET ecosystem since 2012. I work as a .NET Developer, Solution Architect, and University Professor, besides acting as a Scrum Master.',
            'about-p2': 'Throughout my career, I\'ve developed skills in various areas, covering programming languages, agile methodologies, and cloud platforms.',
            'about-p3': 'I enjoy applying my knowledge in different contexts, from enterprise solutions to academic environments, delivering high-impact results.',
            'about-education-title': 'Education',
            'about-education-detail': 'MBA in Information Technology - USP',
            'about-location-title': 'Location',
            'about-location-detail': 'São Paulo, Brazil',
            'about-experience-title': 'Experience',
            'about-experience-detail': '11+ years',
            
            // Skills section
            'skills-title': 'Skills & Technologies',
            'skills-frontend': 'Frontend',
            'skills-backend': 'Backend',
            'skills-cloud': 'Cloud & DevOps',
            
            // Contact section
            'contact-title': 'Contact Me',
            
            // Footer
            'footer-copyright': '© 2023 Leonardo Gasparini. All rights reserved.',
            'footer-made': 'Made with ❤️ and JavaScript'
        },
        'pt-br': {
            // Navigation
            'nav-home': 'Início',
            'nav-about': 'Sobre',
            'nav-skills': 'Habilidades',
            'nav-contact': 'Contato',
            
            // Hero section
            'hero-title-1': 'Olá, eu sou <span class="highlight">Leonardo Gasparini</span>',
            'hero-title-2': 'Desenvolvedor .NET | Arquiteto de Soluções | Professor',
            'hero-description': 'Profissional de tecnologia com sólida experiência no ecossistema .NET desde 2012',
            'hero-btn-work': 'Minhas Habilidades',
            'hero-btn-contact': 'Entre em Contato',
            
            // About section
            'about-title': 'Sobre Mim',
            'about-p1': 'Sou um profissional de tecnologia de São Paulo, Brasil, com sólida experiência no ecossistema .NET desde 2012. Atuo como Dev .NET, Solution Architect e Professor Universitário, além de exercer a função de Scrum Master.',
            'about-p2': 'Ao longo de minha carreira, desenvolvi competências em diversas áreas, abrangendo linguagens, metodologias ágeis e plataformas na nuvem.',
            'about-p3': 'Gosto de aplicar meus conhecimentos em diferentes contextos, desde soluções empresariais até ambientes acadêmicos, entregando resultados de alto impacto.',
            'about-education-title': 'Educação',
            'about-education-detail': 'MBA em Tecnologia da Informação - USP',
            'about-location-title': 'Localização',
            'about-location-detail': 'São Paulo, Brasil',
            'about-experience-title': 'Experiência',
            'about-experience-detail': '11+ anos',
            
            // Skills section
            'skills-title': 'Habilidades & Tecnologias',
            'skills-frontend': 'Frontend',
            'skills-backend': 'Backend',
            'skills-cloud': 'Cloud & DevOps',
            
            // Contact section
            'contact-title': 'Entre em Contato',
            
            // Footer
            'footer-copyright': '© 2023 Leonardo Gasparini. Todos os direitos reservados.',
            'footer-made': 'Feito com ❤️ e JavaScript'
        }
    };

    // Default language
    let currentLang = 'en';
    
    // Language buttons
    const enBtn = document.getElementById('en-lang');
    const ptBrBtn = document.getElementById('pt-br-lang');
    
    // Translation function
    function translatePage(language) {
        // Update language buttons state
        if (language === 'en') {
            enBtn.classList.add('active');
            ptBrBtn.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            ptBrBtn.classList.add('active');
            enBtn.classList.remove('active');
            document.documentElement.lang = 'pt-BR';
        }
        
        currentLang = language;
        
        // Apply translations
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });
    }
    
    // Event listeners for language buttons
    enBtn.addEventListener('click', () => translatePage('en'));
    ptBrBtn.addEventListener('click', () => translatePage('pt-br'));
});
