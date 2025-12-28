import { useMemo } from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { findByPath } from '@/store/slices/file/filesSlice';

const Desktop = () => {
  const root = useSelector((state: RootState) => state.file.filesList);
  const content = findByPath(root, 'users/guests/desktop')?.content ?? [];

  return useMemo(
    () => (
      <div className="desktop-display">
        <DesktopBackground />
        <ListFiles
          currentNode={'desktop'}
          className={'desktop-files__wrapper'}
          openMode={'window'}
          content={content}
        />
      </div>
    ),
    [content]
  );
};

export default Desktop;
