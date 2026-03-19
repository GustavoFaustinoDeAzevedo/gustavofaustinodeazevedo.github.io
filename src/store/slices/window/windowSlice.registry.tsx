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
  CorruptedFile,
  ConsoleCommand,
} from '@/components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Permission } from '../file';
import { roles } from '../users/userSlice.data';

export const returnWindowContent = (
  contentKey: string,
  {
    windowId,
    src,
    type,
    permission,
    owner,
    content,
  }: {
    windowId?: string;
    src?: string;
    type?: string;
    permission?: Permission;
    owner?: string;
    content?: any;
  },
) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const map = {
    devMenu: () => <DevMenu />,
    about: () => <AboutMe />,
    skills: () => <MySkills />,
    sendMessage: () => <SendMessage />,
    contact: () => <ContactCard />,
    cmd: () => <ConsoleCommand />,
    // taskManager: () => <TaskManager />,
    // browser: () => <BrowserSimulator />,
    // github: () => <BrowserSimulator src={src} />,
    backgroundPreferences: () => <BackgroundPreferences />,
    calculator: () => <Calculator />,
    notepad: () => <Notepad content={content as string} />,
    tests: () => <Tests />,
    corruptedFile: () => <CorruptedFile message="Test" />,
  };

  const contentKeyValidation = contentKey in map;

  const permissionValidation =
    permission === undefined
      ? true
      : permission?.read || (permission?.execute && permission?.read);

  if (!!!permissionValidation)
    throw new Error(
      {
        por: 'Permissão insuficiente',
        eng: 'Insufficient permission',
      }[language],
    );

  if (contentKeyValidation) return map[contentKey as keyof typeof map]?.();

  throw new Error(
    {
      por: 'Conteúdo não encontrado',
      eng: 'Content not found',
    }[language],
  );
};
