import { useEffect } from 'react';
import useRefs from '../../contexts/useRefs';
import useWindowTimeline from '../Window/hooks/useWindowTimeline';

const TaskbarItem = ({
  id,
  isMinimized,
  icon,
  index,
  focusedWindow,
  onWindowMinimize,
  onWindowRestore,
}) => {
  const { getRef } = useRefs();
  const windowRef = getRef(id);
  const timelineRef = getRef('timeline' + id);

  useEffect(() => {
    if (!timelineRef.current) {
      timelineRef.current = useWindowTimeline(windowRef, index, timelineRef);
    }
  }, [windowRef, index]);
  const handleMinimize = () => {
    if (timelineRef?.current) {
      if (isMinimized) {
        onWindowRestore(id);
        timelineRef.current.reverse();
      } else {
        onWindowMinimize(id);
        timelineRef.current?.play();
      }
    }
  };

  return (
    <li
      key={`taskbar-icon-${index}-${id}`} // React key attribute
      className={`taskbar-item open 
         ${focusedWindow === id ? 'focus' : ''} 
         ${isMinimized ? 'minimized' : ''}
         `}
      onClick={handleMinimize}
    >
      <i className={`${icon}`}></i>
    </li>
  );
};

export default TaskbarItem;
