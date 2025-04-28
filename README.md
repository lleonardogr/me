# SNES-Themed Portfolio Website

A retro-styled personal portfolio website inspired by the Super Nintendo Entertainment System (SNES) 16-bit aesthetic. This project showcases professional experience, skills, and contact information in a nostalgic gaming interface.

![SNES Portfolio Preview](preview.png)

## Features

- **SNES 16-bit Visual Style**: Classic black background with neon-colored text and pixel-art aesthetics
- **Interactive SNES Console Animation**: Floating console and controller with interactive buttons
- **Anime.js Animations**: Dynamic title animation with glitch effect and smooth section transitions
- **Pixel-Perfect UI Elements**: Authentic retro-style borders, buttons, and dialog boxes
- **Dynamic Content Loading**: All portfolio data loaded from a JSON object
- **Responsive Design**: Optimized for desktop with reasonable mobile support

## Sections

- **About Me**: Personal profile and summary
- **Skills**: Technologies and methodologies organized by categories
- **Languages**: Language proficiency display
- **Certifications**: Scrollable list of professional certifications
- **Experience**: Work history presented in RPG-style dialog boxes
- **Education**: Academic background in pixel-art style
- **Contact**: Interactive contact buttons with hover effects

## Technical Implementation

### Tech Stack
- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: Custom pixel art styling without frameworks
- **JavaScript**: Vanilla JS for dynamic content loading and interactivity
- **Anime.js**: Library for smooth animations and transitions

### Structure
- `index.html`: Contains the structure with empty containers for dynamic content
- `style.css`: SNES-themed styling with pixel-perfect details
- `script.js`: Handles JSON data loading and animations
- `portfolio_data.json`: Contains all the personal information for the portfolio

### Key Features Implementation

#### Interactive SNES Animation
The header features an animated SNES console with controller and TV that:
- Floats with a gentle bobbing motion
- Has interactive buttons that glow on hover
- Contains a START button that triggers page scrolling
- Features a TV with blinking "PRESS START" text and scan lines

#### Dynamic Content Loading
All content is loaded from a JavaScript object that contains:
- Profile information
- Skills categorized by type
- Language proficiencies
- Certifications
- Professional experience with detailed descriptions
- Educational background

#### Animations
The site uses Anime.js to create:
- Glitching title text
- Floating SNES components
- Section transition effects
- Button hover animations
- Starfield background effect

## Running the Project

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build tools or server required - pure frontend implementation

## Customization

To use this template for your own portfolio:

1. Edit the `portfolio_data.json` file with your personal information
2. Modify the color variables in `:root` in `style.css` if desired
3. Add additional sections by following the existing pattern

## Credits

- Font: "Press Start 2P" from Google Fonts
- Animation Library: Anime.js
- Inspiration: Super Nintendo Entertainment System (SNES) UI

## License

MIT License