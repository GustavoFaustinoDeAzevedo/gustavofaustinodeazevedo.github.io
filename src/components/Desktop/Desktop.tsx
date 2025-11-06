import { useMemo } from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const Desktop = () => {
  const rootFolder = useSelector((state: RootState) => state.file.filesList);
  const { language } = useSelector((state: RootState) => state.settings);
  const children =
    rootFolder.children?.[0]?.children?.[0]?.children?.[0]?.children ?? [];

  return useMemo(
    () => (
      <div className="desktop-display">
        <DesktopBackground />
        <ListFiles
          currentNode={'desktop'}
          className={'desktop-files__wrapper'}
          openMode={'window'}
          language={language}
          children={children}
        />
      </div>
    ),
    [language]
  );
};

export default Desktop;
