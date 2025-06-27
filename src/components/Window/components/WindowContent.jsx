import AnimatedInput from './AnimatedInput';
import Button from '../../ui/Button';
import BrowserSimulator from '../../BrowserSimulator';
import TaskManager from '../../TaskManager';
import { ChangeBackground } from '../../Settings';
import Tests from '../../Tests';
import FilesExplorer from '../../FilesExplorer';
import Calculator from '../../Gadgets/Calculator';
import Notepad from '../../Gadgets/Notepad';

const AboutSection = () => (
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
        <h2>Hello, I'm Gustavo!</h2>
        <h3>React/JS Web Developer | HTML/CSS expertise.</h3>
        <hr />
      </section>
      <section className="about-me-text">
        <p>
          I'm a Computer Engineering graduate passionate about building sleek,
          user-friendly interfaces with HTML, CSS, and React — especially dark
          themes. I'm eager to bring my skills to a junior front-end developer
          role, where I can contribute, grow, and collaborate alone or with a
          dynamic team.
        </p>
      </section>
    </div>
  </main>
);

const SkillsSection = () => (
  <ul
    className="skills-list"
    aria-label="Skills List"
    data-initial-dimension='{"width": "535px", "height": "160px"}'
  >
    {[
      'HTML5 & CSS3',
      'JavaScript',
      'React.js',
      'UI/UX Design',
      'Responsive Design',
      'Web Performance',
      'Git & GitHub',
    ].map((skill) => (
      <li key={skill} aria-label={skill}>
        {skill}
      </li>
    ))}
  </ul>
);

const ContactSection = () => (
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
      textArea
    >
      Message
    </AnimatedInput>
    <Button type="submit" ariaLabel="Submit Button" variant={'primary'}>
      Send Message
    </Button>
  </form>
);

const CommandPromptSection = () => (
  <textarea
    className="console-command"
    data-initial-dimension='{"width": "580px", "height": "330px"}'
  ></textarea>
);

const WindowContent = ({
  id,
  nodeId,
  src,
  children,
  windowActions,
  handleUpdate,
  type,
  language,
  windowList,
  filesActions,
}) => {
  const sectionMap = {
    about: <AboutSection />,
    skills: <SkillsSection />,
    contact: <ContactSection />,
    cmd: <CommandPromptSection />,
    'task-manager': (
      <TaskManager handleUpdateWindow={windowActions?.handleUpdateWindow} />
    ),
    browser: <BrowserSimulator />,
    github: <BrowserSimulator src={src} />,
    'background-color-picker': (
      <ChangeBackground
        handleChangeBackground={windowActions?.handleChangeBackground}
      />
    ),
    'change-background': (
      <ChangeBackground
        handleChangeBackground={windowActions?.handleChangeBackground}
      />
    ),
    tests: (
      <Tests data-initial-dimension='{"width": "500px", "height": "400px"}' />
    ),
    calculator: <Calculator />,
    notepad: <Notepad windowKey={id} />,
  };
  const section = id.split('#')[1];
  return (
    sectionMap[section] || (
      <FilesExplorer.FilesList
        nodeId={nodeId}
        language={language}
        windowList={windowList}
        children={children}
        filesActions={filesActions}
        windowActions={windowActions}
        handleUpdate={handleUpdate}
        nodeType={type}
        dataInitialDimension='{"width": "1000px", "height": "600px"}'
        fileClassName="files-explorer"
      />
    )
  );
};

export default WindowContent;
