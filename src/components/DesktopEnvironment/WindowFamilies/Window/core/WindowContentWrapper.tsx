import React, { useMemo } from 'react';
import WindowContent from './WindowContent';
import { Permission } from '@/store/slices/file';

const WindowContentWrapper = ({
  isOpened,
  windowId,
  currentNode,
  content,
  contentKey,
  permission,
  src,
  type,
}: {
  isOpened: boolean;
  windowId: string;
  currentNode: string;
  content?: any;
  contentKey: string;
  permission?: Permission;
  src?: string;
  type?: string;
}) => {
  const windowContent = isOpened ? (
    <WindowContent
      windowId={windowId}
      currentNode={currentNode}
      src={src}
      content={content ?? {}}
      contentKey={contentKey}
      permission={permission}
      type={type}
    />
  ) : (
    <></>
  );

  return <div className="window__content">{windowContent}</div>;
};
export default React.memo(WindowContentWrapper);
