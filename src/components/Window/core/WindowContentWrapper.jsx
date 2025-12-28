import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpened,
  windowId,
  currentNode,
  content,
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
      windowActions={windowHandlers}
      type={type}
      language={language}
      windowList={windowList}
      filesActions={filesActions}
    />
  ) : (
    <></>
  );

  return <div className="window__content">{windowContent}</div>;
};
export default WindowContentWrapper;
