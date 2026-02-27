import React from 'react';
import TaskbarTasks from './TaskbarTasks';
import TaskbarRightSection from './TaskbarRightSection';
import StartMenu from './StartMenu';
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
