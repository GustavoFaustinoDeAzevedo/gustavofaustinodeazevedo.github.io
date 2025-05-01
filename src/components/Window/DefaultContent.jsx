import React from 'react';
import AnimatedInput from './AnimatedInput';
import Button from '../Button';

const DefaultContent = ({ id }) => {
  const section = id.split('#')[1];
  switch (section) {
    case 'about':
      return (
        <main className="about-me" aria-label="About Me Section">
          <section className="about-me-image">
            <img
              src="images/profile-pic.png"
              alt="A profile picture of Gustavo Faustino de Azevedo"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              fetchPriority="high"
            />
          </section>

          <section className="about-me-title">
            <h2 aria-label="Introduction Title">Hello, I'm Gustavo!</h2>
            <h3>React/JS Web Developer | HTML/CSS expertise.</h3>
            <hr />
          </section>
          <section className="about-me-text">
            <p aria-label="Introduction Text">
              I'm a Computer Engineering graduate passionate about building
              sleek, user-friendly interfaces with HTML, CSS, and React —
              especially dark themes. I'm eager to bring my skills to a junior
              front-end developer role, where I can contribute, grow, and
              collaborate alone or with a dynamic team.
            </p>
          </section>
        </main>
      );
    case 'projects':
      return (
        <div className="project-grid" aria-label="Projects">
          <article className="project-card" aria-label="Project One">
            <h3>Project One</h3>
            <p>Project Card Example</p>
          </article>
        </div>
      );
    case 'skills':
      return (
        <ul className="skills-list" aria-label="Skills List">
          <li aria-label="HTML5 & CSS3">HTML5 & CSS3</li>
          <li aria-label="JavaScript">JavaScript</li>
          <li aria-label="React.js & React Native">React.js & React Native</li>
          <li aria-label="UI/UX Design">UI/UX Design</li>
          <li aria-label="Responsive Design">Responsive Design</li>
          <li aria-label="RESTful APIs">RESTful APIs</li>
          <li aria-label="Web Performance">Web Performance</li>
          <li aria-label="Git & GitHub">Git & GitHub</li>
        </ul>
      );
    case 'contact':
      return (
        <form
          className="contact-form"
          aria-label="Contact Form"
          action="https://formspree.io/f/mnqelzyz"
          method="POST"
          target="placeholder"
        >
          <AnimatedInput
            id="name"
            type="input"
            name="Name"
            required
            ariaLabel="Name input"
            inputPlaceholder="Ex: Charlie Lima"
          >
            Name
          </AnimatedInput>

          <AnimatedInput
            id="email"
            type="email"
            name="message"
            required
            ariaLabel="Email input"
            inputPlaceholder="exemplo@email.com"
          >
            Email
          </AnimatedInput>

          <AnimatedInput
            id="message"
            type="text"
            name="message"
            required
            ariaLabel="Message input"
            inputPlaceholder="Your text here..."
            textArea={true}
          >
            Message
          </AnimatedInput>
          <Button type="submit" ariaLabel="Submit Button" variant={'primary'}>
            Send Message
          </Button>
        </form>
      );
    default:
      return null;
  }
};

export default DefaultContent;
