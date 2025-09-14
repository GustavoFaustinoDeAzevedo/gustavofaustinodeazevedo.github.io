import Calculator from '@/apps/Calculator';
import Notepad from '@/apps/Notepad';
import { AboutMe, MySkills, SendMessage } from '@/components/Portfolio';
import BrowserSimulator from '@/components/BrowserSimulator';
import TaskManager from '@/components/TaskManager';
import { ChangeBackground } from '@/components/Settings';
import Tests from '@/components/Tests';
import AnimatedInput from '../components/AnimatedInput';
import Button from '@/components/ui/Button';

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
    skills: () => <MySkills language={language} />,
    sendMessage: () => <SendMessage language={language} />,
    contact: () => <div className="contact-card"></div>,
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
