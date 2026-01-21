import { useMemo } from 'react';
import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpened,
  windowId,
  currentNode,
  content,
  contentKey,
  windowHandlers,
  language,
  windowList,
  filesActions,
  src,
  type,
}) => {
  const windowContent = isOpened ? (
    <WindowContent
      windowId={windowId}
      currentNode={currentNode}
      src={src}
      content={content ?? {}}
      contentKey={contentKey}
      windowActions={windowHandlers}
      type={type}
      language={language}
      windowList={windowList}
      filesActions={filesActions}
    />
  ) : (
    <></>
  );

  return useMemo(
    () => <div className="window__content">{windowContent}</div>,
    [windowContent],
  );
};
export default WindowContentWrapper;
