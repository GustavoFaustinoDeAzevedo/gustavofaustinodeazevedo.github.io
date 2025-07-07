import AnimatedInput from './AnimatedInput';
import Button from '../../ui/Button';
import BrowserSimulator from '../../BrowserSimulator';
import TaskManager from '../../TaskManager';
import { ChangeBackground } from '../../Settings';
import Tests from '../../Tests';
import FilesExplorer from '../../FilesExplorer';
import Calculator from '../../Gadgets/Calculator';
import Notepad from '../../Gadgets/Notepad';
import { AboutMe, Skills } from '../../Portolio';

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
  handleWindowUpdate,
  type,
  language,
  windowList,
  filesActions,
}) => {
  const contentMap = {
    about: <AboutMe language={language} />,
    skills: <Skills language={language} />,
    contact: <ContactSection />,
    cmd: <CommandPromptSection />,
    'task-manager': (
      <TaskManager
        handleUpdateWindow={windowActions?.handleUpdateWindow}
        language={language}
      />
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
  const contentId = id.split('#')[1];
  return (
    contentMap[contentId] || (
      <FilesExplorer.FilesList
        nodeId={nodeId}
        language={language}
        windowList={windowList}
        children={children}
        filesActions={filesActions}
        windowActions={windowActions}
        handleWindowUpdate={handleWindowUpdate}
        nodeType={type}
        dataInitialDimension='{"width": "1000px", "height": "600px"}'
        fileClassName="files-explorer"
      />
    )
  );
};

export default WindowContent;
