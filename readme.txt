Portfolio Website Documentation
=============================

This is a modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript, featuring GSAP animations.

Technologies Used
---------------
- HTML5 (Semantic markup)
- Modern CSS (Custom properties, logical properties, nesting)
- Vanilla JavaScript
- GSAP (Animation library)
- Google Fonts (Poppins)

Features
--------
1. Responsive Design
   - Mobile-first approach
   - Fluid typography using clamp()
   - Flexible grid layouts

2. Modern CSS Features
   - CSS Custom Properties (variables)
   - Logical Properties
   - CSS Nesting
   - Layer-based architecture (@layer)
   - Modern selectors and pseudo-classes

3. Animations
   - GSAP-powered animations
   - Scroll-triggered reveals
   - Smooth transitions
   - Reduced motion preferences support

4. Accessibility
   - Semantic HTML structure
   - ARIA attributes where necessary
   - Keyboard navigation support
   - Focus management

Structure
---------
- index.html: Main HTML document with semantic structure
- style.css: Modular CSS with modern features
- main.js: JavaScript for animations and interactivity

CSS Architecture
---------------
The CSS is organized into three layers:
1. base: Reset, typography, and root variables
2. components: Reusable UI components
3. utilities: Helper classes

JavaScript Features
------------------
- GSAP animations for hero section
- Scroll-triggered animations for projects
- Form handling
- Smooth scroll navigation

Customization
------------
To customize the website:
1. Modify CSS variables in :root
2. Update content in index.html
3. Adjust animations in main.js
4. Add/modify sections as needed

Performance Considerations
------------------------
- Optimized animations
- Responsive images
- Minimal dependencies
- Progressive enhancement