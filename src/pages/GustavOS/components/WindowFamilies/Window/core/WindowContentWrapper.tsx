import React, { useMemo } from 'react';
import WindowContent from './WindowContent';
import { Permission } from '@/store/slices/file';
import { WindowHandlers } from './Window';

const WindowContentWrapper = ({
  isOpened,
  windowId,
  currentNode,
  content,
  contentKey,
  permission,
  owner,
  src,
  type,
  windowHandlers,
}: {
  isOpened: boolean;
  windowId: string;
  currentNode: string;
  content?: any;
  contentKey: string;
  permission?: {
    read: boolean;
    write: boolean;
    execute: boolean;
    delete: boolean;
  };
  owner?: string;
  src?: string;
  type?: string;
  windowHandlers: WindowHandlers;
}) => {
  const windowContent = isOpened ? (
    <WindowContent
      windowId={windowId}
      currentNode={currentNode}
      src={src}
      content={content ?? {}}
      contentKey={contentKey}
      permission={permission}
      owner={owner}
      type={type}
      actions={windowHandlers}
    />
  ) : (
    <></>
  );

  return <div className="window__content">{windowContent}</div>;
};
export default React.memo(WindowContentWrapper);
