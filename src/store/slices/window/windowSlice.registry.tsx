import {
  AboutMe,
  ContactCard,
  MySkills,
  SendMessage,
} from '@components/Portfolio';
import { Language } from '../settings';
import TaskManager from '@components/TaskManager';
import BrowserSimulator from '@components/BrowserSimulator';
import { BackgroundPreferences } from '@components/Settings';
import Calculator from '@apps/Calculator';
import Notepad from '@apps/Notepad';
import ConsoleCommand from '@components/ConsoleCommand';
import DevMenu from '@/components/DevMenu';

export const returnWindowContent = (
  contentKey: string,
  {
    windowId,
    src,
    type,
    content,
  }: {
    windowId?: string;
    src?: string;
    type?: string;
    content?: any;
  },
) => {
  try {
    const map = {
      devMenu: () => <DevMenu />,
      about: () => <AboutMe />,
      skills: () => <MySkills />,
      sendMessage: () => <SendMessage />,
      contact: () => <ContactCard />,
      cmd: () => <ConsoleCommand />,
      taskManager: () => <TaskManager />,
      browser: () => <BrowserSimulator />,
      github: () => <BrowserSimulator src={src} />,
      backgroundPreferences: () => <BackgroundPreferences />,
      calculator: () => <Calculator />,
      notepad: () => <Notepad content={content as string} />,
    };
    return map[contentKey as keyof typeof map]?.();
  } catch (error) {
    alert('Erro');
  }
};
