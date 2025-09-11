import useRefs from '../../../contexts/useRefs';
import Icon from '../../ui/GlobalStyles/components/Icon';

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
  const handleClick = () => {
    console.log(`TaskbarItem: clickHandler called for window ${id}`);
    return isMinimized ? onWindowRestore(id) : onWindowMinimize(id);
  };

  console.log(
    `TaskbarItem: rendering window ${id}, minimized: ${isMinimized}, focused: ${
      focusedWindow === id
    }`
  );

  return (
    <li
      key={`taskbar-icon-${index}-${id}`}
      className={`taskbar-item open 
         ${focusedWindow === id ? 'focus' : ''} 
         ${isMinimized ? 'minimized' : ''}
      `}
      title={title}
      onClick={handleClick}
    >
      <Icon
        variant={icon}
        style={{ backgroundColor: 'transparent', width: '1.8rem' }}
      />
    </li>
  );
};

export default TaskbarItem;
