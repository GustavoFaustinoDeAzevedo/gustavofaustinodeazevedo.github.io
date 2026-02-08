import {
  BackgroundPreferences,
  Calculator,
  Notepad,
  DevMenu,
  Tests,
  AboutMe,
  ContactCard,
  SendMessage,
  MySkills,
} from '@/components';

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
      // cmd: () => <ConsoleCommand />,
      // taskManager: () => <TaskManager />,
      // browser: () => <BrowserSimulator />,
      // github: () => <BrowserSimulator src={src} />,
      backgroundPreferences: () => <BackgroundPreferences />,
      calculator: () => <Calculator />,
      notepad: () => <Notepad content={content as string} />,
      tests: () => <Tests />,
    };
    return map[contentKey as keyof typeof map]?.();
  } catch (error) {
    alert('Erro');
  }
};
