import useRefs from '../../../contexts/useRefs';

const TaskbarItem = ({
  id,
  isMinimized,
  icon,
  index,
  focusedWindow,
  onWindowMinimize,
  onWindowRestore,
  title,
}) => {
  const clickHandler = () => {
    return isMinimized ? onWindowRestore(id) : onWindowMinimize(id);
  };

  return (
    <li
      key={`taskbar-icon-${index}-${id}`} // React key attribute
      className={`taskbar-item open 
         ${focusedWindow === id ? 'focus' : ''} 
         ${isMinimized ? 'minimized' : ''}
      `}
      title={title}

      onClick={clickHandler}
    >
      <i className={`${icon}`}></i>
    </li>
  );
};

export default TaskbarItem;
