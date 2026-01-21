import { useMemo } from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { findByPath } from '@/store/slices/file/filesSlice';

const Desktop = () => {
  const root = useSelector((state: RootState) =>
    state.user.currentUser.config.store.userFolders.find(
      (folder) => folder.contentKey === 'desktop',
    ),
  );

  return useMemo(
    () => (
      <div className="desktop-display">
        <DesktopBackground />
        <ListFiles
          currentNode={'desktop'}
          className={'desktop-files__wrapper'}
          openMode={'window'}
          content={root?.content || []}
        />
      </div>
    ),
    [root?.content],
  );
};

export default Desktop;
