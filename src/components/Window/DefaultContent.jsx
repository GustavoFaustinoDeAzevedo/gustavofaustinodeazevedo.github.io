import React from 'react';

const DefaultContent = ({ id }) => {
  switch (id) {
    case 'about':
      return (
        <div className="about-me" aria-label="About Me Section">
          <hr />
          <h2 aria-label="About Me Title">👋 Hello, I'm Gustavo!</h2>
          <h3>
            Web Developer specializing in React and JavaScript, complemented by
            a strong foundation in HTML and CSS.
          </h3>
          <hr />
          <div className="about-me-wraper">
            <img
              className="about-me-image"
              src="images/profile-pic.png"
              alt="Gustavo's Photo"
              aria-label="Gustavo's Photo"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              importance="high"
              onClick={() => console.log('Image clicked')}
            ></img>
            <p className="about-me-text" aria-label="About Me Text">
              I'm a Computer Engineering graduate passionate about building
              sleek, user-friendly interfaces with HTML, CSS, and React —
              especially dark themes. I'm eager to bring my skills to a junior
              front-end developer role, where I can contribute, grow, and
              collaborate alone or with a dynamic team.
            </p>
          </div>
        </div>
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
        <form className="contact-form" aria-label="Contact Form">
          <label htmlFor="name" aria-label="Name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            aria-label="Name input"
            required
          />

          <label htmlFor="email" aria-label="Email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            aria-label="Email input"
            required
          />

          <label htmlFor="message" aria-label="Message">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-label="Message input"
          ></textarea>

          <button type="submit" aria-label="Submit Button">
            Send Message
          </button>
        </form>
      );
    default:
      return null;
  }
};

export default DefaultContent;
