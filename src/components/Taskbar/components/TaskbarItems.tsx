import React, { useMemo } from 'react';
import TaskbarItem from './TaskbarItem';
import { WindowNode } from '@/store/slices/window';

interface TaskbarItemProps {
  language: string;
  focusedWindow: string;
  onWindowMinimize: (id: string) => void;
  onWindowRestore: (id: string) => void;
  openedWindowList: WindowNode[];
}

const TaskbarItems = ({
  language,
  focusedWindow,
  openedWindowList,
  onWindowMinimize,
  onWindowRestore,
}: TaskbarItemProps) => {
  const renderedItems = useMemo(() => {
    return (
      <ul className="taskbar-items">
        {openedWindowList?.[0]?.windowState?.status.opened &&
          openedWindowList
            .filter(
              ({ windowId }) =>
                windowId !== 'New' &&
                windowId !== 'placeholder' &&
                windowId !== 'desktop'
            )
            .map(({ windowId, title, windowState, icon }, index) => {
              return (
                <TaskbarItem
                  key={windowId}
                  id={windowId ?? ''}
                  title={title?.[language] ?? ''}
                  isMinimized={windowState?.status.minimized ?? false}
                  icon={icon ?? 'html-file'}
                  index={index}
                  focusedWindow={focusedWindow}
                  onWindowMinimize={onWindowMinimize}
                  onWindowRestore={onWindowRestore}
                />
              );
            })}
      </ul>
    );
  }, [openedWindowList, focusedWindow, onWindowMinimize, onWindowRestore]);

  return renderedItems;
};

export default TaskbarItems;
