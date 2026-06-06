import React from 'react';
import { ListFiles } from '../../NativeApplications/FilesExplorer';
import DesktopBackground from './components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { usersSelectors } from '@/store/slices/users/userSlice';
import { FileNode } from '@/store/slices/file';
import { User } from '@/store/slices/users/userSlice.types';

const Desktop = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.users.currentUserId,
  );
  const userData = useSelector((state: RootState) =>
    usersSelectors.selectById(state, currentUserId),
  ) as User;
  const desktopFolder = userData?.config.store.userFolders.find(
    (folder: FileNode) => folder.contentKey === 'desktop',
  ) as FileNode;
  return (
    <div className="desktop-display" onDragOver={(e) => e.preventDefault()}>
      <DesktopBackground />
      <ListFiles
        currentNode="desktop"
        className="desktop-files__wrapper"
        openMode="window"
        content={desktopFolder?.content || []}
      />
    </div>
  );
};

export default React.memo(Desktop);
