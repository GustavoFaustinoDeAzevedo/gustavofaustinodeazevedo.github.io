import React from 'react';

const DefaultContent = ({ id }) => {
  switch (id) {
    case 'about':
      return (
        <div className="about-me-wraper">
          <h2>
            👋 Hi, I'm Gustavo, a Web Developer specializing in React and
            JavaScript.
          </h2>
          <p className="about-me-text">
            I'm a Computer Engineering graduate passionate about building sleek,
            user-friendly interfaces with HTML, CSS, and React — especially dark
            themes. I'm eager to bring my skills to an entry-level front-end
            developer role, where I can contribute, grow, and collaborate alone
            or with a dynamic team.
          </p>
        </div>
      );
    case 'projects':
      return (
        <div className="project-grid">
          <article className="project-card">
            <h3>Project One</h3>
            <p>Project Card Example</p>
          </article>
        </div>
      );
    case 'skills':
      return (
        <ul className="skills-list">
          <li>HTML5 & CSS3</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>UI/UX Design</li>
          <li>Responsive Design</li>
        </ul>
      );
    case 'contact':
      return (
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      );
    default:
      return null;
  }
};

export default DefaultContent;
