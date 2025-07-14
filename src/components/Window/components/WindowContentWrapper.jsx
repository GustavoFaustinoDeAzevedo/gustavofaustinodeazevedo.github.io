import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpen,
  windowId,
  currentNode,
  children,
  windowActions,
  language,
  windowList,
  filesActions,
  src,
  type,
  handleUpdate,
}) => {
  const handleFocus = isFocused ? null : onFocus;
  const windowContent = isOpen ? (
    <WindowContent
      windowId={windowId}
      currentNode={currentNode}
      src={src}
      children={children ?? {}}
      windowActions={windowActions}
      handleWindowUpdate={handleUpdate}
      type={type}
      language={language}
      windowList={windowList}
      filesActions={filesActions}
    />
  ) : (
    <></>
  );

  return (
    <div
      onTouchStart={handleFocus}
      onMouseDown={handleFocus}
      onClick={handleFocus}
      className="window-content"
    >
      {windowContent}
    </div>
  );
};
export default WindowContentWrapper;
