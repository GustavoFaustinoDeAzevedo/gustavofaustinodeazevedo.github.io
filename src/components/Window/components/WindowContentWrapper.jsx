import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpen,
  id,
  nodeId,
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
      id={id}
      nodeId={nodeId}
      src={src}
      children={children ?? {}}
      windowActions={windowActions}
      handleUpdate={handleUpdate}
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
