import React, { useMemo } from 'react';
import { StartMenu, TaskbarItems } from '..';
import actions from '@/store/actions';
import TaskbarRightSection from './TaskbarRightSection';
import { useIsMobile } from '@/shared';

const Taskbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="taskbar">
      {!isMobile && <StartMenu />}
      <TaskbarItems />
      <TaskbarRightSection />
    </nav>
  );
};

export default React.memo(Taskbar);
