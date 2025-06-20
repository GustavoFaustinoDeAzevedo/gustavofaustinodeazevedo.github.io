import React from 'react';
import AnimatedInput from './AnimatedInput';
import Button from '../../ui/Button';
import BrowserSimulator from '../../BrowserSimulator';
import TaskManager from '../../TaskManager';
import { ChangeBackground } from '../../Settings';
import Tests from '../../Tests';
import actions from '../../../store/actions';
import FilesExplorer from '../../FilesExplorer';
import { useSelector } from 'react-redux';
import Calculator from '../../Gadgets/Calculator';
import Desktop from '../../Desktop';

const Content = ({ id, src, children, windowActions }) => {
  const language = useSelector((state) => state.language);
  const filesActions = actions.useFilesActions();
  const windowList = useSelector((state) => state.window.openedWindowList);

  if (Array.isArray(children) && children.length > 0) {
    const folderProps = {
      language,
      windowList,
      children,
      filesActions,
      handleOpenWindow: windowActions.onOpen,
      dataInitialDimension: '{"width": "1000px", "height": "600px"}',
      fileClassName: 'files-explorer',
    };
    return <FilesExplorer.FilesList {...folderProps} />;
  }
  const section = id.split('#')[1];
  switch (section) {
    case 'about':
      return (
        <main
          className="about-me"
          aria-label="About Me Section"
          data-initial-dimension='{"width": "430px", "height": "550px"}'
        >
          <div className="about-me-wrapper">
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
          </div>
        </main>
      );
    case 'projects':
      return <div className="folder" aria-label="Projects"></div>;
    case 'skills':
      return (
        <ul
          className="skills-list"
          aria-label="Skills List"
          data-initial-dimension='{"width": "535px", "height": "160px"}'
        >
          <li aria-label="HTML5 & CSS3">HTML5 & CSS3</li>
          <li aria-label="JavaScript">JavaScript</li>
          <li aria-label="React.js & React Native">React.js</li>
          <li aria-label="UI/UX Design">UI/UX Design</li>
          <li aria-label="Responsive Design">Responsive Design</li>
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
          data-initial-dimension='{"width": "490px", "height": "550px"}'
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
            inputPlaceholder="example@email.com"
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
    case 'cmd':
      return (
        <textarea
          className="console-command"
          data-initial-dimension='{"width": "580px", "height": "330px"}'
        ></textarea>
      );
    case 'task-manager':
      return <TaskManager windowActions={windowActions}></TaskManager>;
    case 'browser':
      return <BrowserSimulator></BrowserSimulator>;
    case 'github':
      return <BrowserSimulator src={src}></BrowserSimulator>;
    case 'background-color-picker':
    case 'change-background':
      return (
        <ChangeBackground
          handleChangeBackground={windowActions.onChangeBackground}
        ></ChangeBackground>
      );
    case 'tests':
      return (
        <Tests data-initial-dimension='{"width": "500px", "height": "400px"}'></Tests>
      );
    case 'calculator':
      return <Calculator />;
    default:
      return null;
  }
};

export default Content;
