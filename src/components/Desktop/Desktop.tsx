import { useMemo } from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { findByPath } from '@/store/slices/file/filesSlice';

const Desktop = () => {
  const root = useSelector((state: RootState) => state.file.filesList);
  const { language } = useSelector((state: RootState) => state.settings);
  const children = findByPath(root, 'users/guests/desktop')?.children ?? [];
  console.log(children);
  // rootFolder.children?.[0]?.children?.[0]?.children?.[0]?.children ?? [];

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
