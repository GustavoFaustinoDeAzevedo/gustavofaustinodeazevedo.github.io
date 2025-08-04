import Calculator from '../../Gadgets/Calculator';
import Notepad from '../../Gadgets/Notepad';
import { AboutMe, Skills } from '../../Portfolio';
import BrowserSimulator from '../../BrowserSimulator';
import TaskManager from '../../TaskManager';
import { ChangeBackground } from '../../Settings';
import Tests from '../../Tests';
import AnimatedInput from '../components/AnimatedInput';
import Button from '../../ui/Button';

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

const getWindowContent = (
  contentId,
  { windowId, language, src, type, windowActions, children }
) => {
  const map = {
    about: () => <AboutMe language={language} />,
    skills: () => <Skills language={language} />,
    contact: () => <ContactSection language={language} />,
    cmd: () => <CommandPromptSection />,
    'task-manager': () => (
      <TaskManager
        handleUpdateWindow={windowActions?.handleUpdateWindow}
        language={language}
      />
    ),
    browser: () => <BrowserSimulator />,
    github: () => <BrowserSimulator src={src} />,
    'background-color-picker': () => (
      <ChangeBackground
        language={language}
        handleChangeBackground={windowActions?.handleChangeBackground}
      />
    ),
    'change-background': () => (
      <ChangeBackground
        language={language}
        handleChangeBackground={windowActions?.handleChangeBackground}
        handleUpdateWindowContent={(imagePreview) =>
          windowActions?.handleUpdateWindow({
            children: { ...children, imagePreview },
          })
        }
        children={children}
      />
    ),
    tests: () => (
      <Tests data-initial-dimension='{"width": "500px", "height": "400px"}' />
    ),
    calculator: () => <Calculator />,
    notepad: () => <Notepad windowId={windowId} />,
  };
  return map[contentId]?.();
};

export default getWindowContent;
