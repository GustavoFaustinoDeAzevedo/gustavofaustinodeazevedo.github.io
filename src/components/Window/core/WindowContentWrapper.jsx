import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpened,
  windowId,
  currentNode,
  children,
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
      children={children ?? {}}
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
