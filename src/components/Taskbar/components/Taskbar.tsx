import React from 'react';
import { StartMenu, TaskbarTasks } from '..';
import TaskbarRightSection from './TaskbarRightSection';
import { useIsMobile } from '@/shared';

const Taskbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="taskbar">
      <StartMenu />
      <TaskbarTasks />
      <TaskbarRightSection />
    </nav>
  );
};

export default React.memo(Taskbar);
