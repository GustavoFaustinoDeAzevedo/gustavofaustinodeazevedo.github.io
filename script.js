const about = document.getElementById('about');
const projects = document.getElementById('projects');
const contact = document.getElementById('contact');
const buttons = [aboutButton, projectsButton, contactButton];


let isAnimating = false;


document.onsubmit = () => {
  alert(
    'Thank you for your message! I will get back to you as soon as possible.')
}

document.onreadystatechange = () => {
  
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
        showSection(about);
    }
};

function showSection(section) {
  if (!isAnimating && !section.classList.contains('fade-in')) {
    about.style.opacity = projects.style.opacity = contact.style.opacity = 0;

    about.style.position = projects.style.position = contact.style.position = 'absolute';

    // about.style.fontSize = projects.style.fontSize = contact.style.fontSize = '1.1rem';
    
    about.style.pointerEvents = projects.style.pointerEvents = contact.style.pointerEvents = 'none';

    [...document.querySelectorAll('.fade-in')].forEach(element => element.classList.remove('fade-in'));
    setTimeout(() => {
      section.style.opacity = 1;
      section.style.position = 'static';
      // section.style.fontSize = window.matchMedia('(max-width: 768px)').matches?"0.7rem": "1rem";
      section.style.pointerEvents = 'auto';
      section.classList.add('fade-in');
      
    }, 500);
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 500);
    
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (!isAnimating && !button.classList.contains('active')) {
      aboutButton.classList.remove('active');
      projectsButton.classList.remove('active');
      contactButton.classList.remove('active');
      setTimeout(() => {
        button.classList.add('active');
      }, 250);
    }
    const sectionToShow = button.id.replace(/Button$/, ''); 
    showSection(document.getElementById(sectionToShow), button);
  });
});