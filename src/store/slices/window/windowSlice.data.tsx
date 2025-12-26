import {
  AboutMe,
  ContactCard,
  MySkills,
  SendMessage,
} from '@components/portfolio';
import { Language } from '../settings';
import TaskManager from '@components/TaskManager';
import BrowserSimulator from '@components/BrowserSimulator';
import { BackgroundPreferences } from '@components/Settings';
import Calculator from '@apps/Calculator';
import Notepad from '@apps/Notepad';
import ConsoleCommand from '@components/ConsoleCommand';
import DevMenu from '@/components/DevMenu';

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
      devMenu: () => <DevMenu />,
      about: () => <AboutMe />,
      skills: () => <MySkills />,
      sendMessage: () => <SendMessage />,
      contact: () => <ContactCard />,
      cmd: () => <ConsoleCommand />,
      'task-manager': () => (
        <TaskManager
          handleUpdateWindow={windowActions?.handleUpdateWindow}
          language={language}
        />
      ),
      browser: () => <BrowserSimulator />,
      github: () => <BrowserSimulator src={src} />,
      'background-color-picker': () => <BackgroundPreferences />,
      'change-background': () => <BackgroundPreferences />,
      calculator: () => <Calculator />,
      notepad: () => <Notepad />,
    };
    return map[contentId as keyof typeof map]?.();
  } catch (error) {
    alert('Erro');
  }
};
