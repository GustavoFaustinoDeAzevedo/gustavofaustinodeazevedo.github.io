import { AboutMe, ContactCard, MySkills, SendMessage } from '@portfolio';
import { Language } from '../settings';
import TaskManager from '@components/TaskManager';
import BrowserSimulator from '@components/BrowserSimulator';
import { ChangeBackgroundMenu } from '@components/Settings';
import Calculator from '@apps/Calculator';
import Notepad from '@apps/Notepad';
import ConsoleCommand from '@components/ConsoleCommand';

export const returnWindowContent = (
  contentId: string,
  {
    windowId,
    language,
    src,
    type,
    windowActions,
    children,
  }: {
    windowId?: string;
    language: Language;
    src?: string;
    type?: string;
    windowActions?: any;
    children?: any;
  }
) => {
  try {
    const map = {
      about: () => <AboutMe language={language} />,
      skills: () => <MySkills language={language} />,
      sendMessage: () => <SendMessage language={language} />,
      contact: () => <ContactCard language={language} />,
      cmd: () => <ConsoleCommand language={language}>Test</ConsoleCommand>,
      'task-manager': () => (
        <TaskManager
          handleUpdateWindow={windowActions?.handleUpdateWindow}
          language={language}
        />
      ),
      browser: () => <BrowserSimulator />,
      github: () => <BrowserSimulator src={src} />,
      'background-color-picker': () => (
        <ChangeBackgroundMenu language={language} />
      ),
      'change-background': () => <ChangeBackgroundMenu language={language} />,
      calculator: () => <Calculator />,
      notepad: () => <Notepad windowId={windowId} />,
    };
    return map[contentId as keyof typeof map]?.();
  } catch (error) {
    alert('Erro');
  }
};
