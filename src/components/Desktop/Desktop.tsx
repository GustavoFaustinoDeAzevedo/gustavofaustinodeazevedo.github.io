import React from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const Desktop = () => {
  const root = useSelector((state: RootState) =>
    state.user.currentUser.config.store.userFolders.find(
      (folder) => folder.contentKey === 'desktop',
    ),
  );

  return (
    <div className="desktop-display">
      <DesktopBackground />
      <ListFiles
        currentNode="desktop"
        className="desktop-files__wrapper"
        openMode="window"
        content={root?.content || []}
      />
    </div>
  );
};

export default React.memo(Desktop);
