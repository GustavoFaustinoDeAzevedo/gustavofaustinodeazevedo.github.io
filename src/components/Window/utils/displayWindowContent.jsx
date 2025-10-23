import Calculator from '@/apps/Calculator';
import Notepad from '@/apps/Notepad';
import {
  AboutMe,
  MySkills,
  SendMessage,
  ContactCard,
} from '@/components/Portfolio';
import BrowserSimulator from '@/components/BrowserSimulator';
import TaskManager from '@/components/TaskManager';
import { ChangeBackgroundMenu } from '@/components/Settings';
import Tests from '@/components/Tests';
import AnimatedInput from '../components/AnimatedInput';
import Button from '@/components/ui/Button';

const CommandPromptSection = () => (
  <textarea
    className="console-command"
    data-initial-dimension='{"width": "580px", "height": "330px"}'
  ></textarea>
);

const displayWindowContent = (
  contentId,
  { windowId, language, src, type, windowActions, children }
) => {
  const map = {
    about: () => <AboutMe language={language} />,
    skills: () => <MySkills language={language} />,
    sendMessage: () => <SendMessage language={language} />,
    contact: () => <ContactCard language={language} />,
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
      <ChangeBackgroundMenu
        language={language}
        handleChangeBackground={windowActions?.handleChangeBackground}
      />
    ),
    'change-background': () => (
      <ChangeBackgroundMenu
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

export default displayWindowContent;
