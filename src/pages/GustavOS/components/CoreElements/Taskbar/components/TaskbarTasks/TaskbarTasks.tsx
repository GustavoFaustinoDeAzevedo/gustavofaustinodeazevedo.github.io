import React, { useMemo } from 'react';
import TaskbarTask from './TaskbarTask';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';

const TaskbarTasks = () => {
  const openedWindows = useSelector(
    (state: RootState) => state.window.openedWindows,
  );

  const mappedTasksIds = Object.keys(openedWindows).map((id, index) => (
    <TaskbarTask key={id} id={id} index={index} />
  ));

  return useMemo(
    () => <ul className="taskbar__window-list">{mappedTasksIds}</ul>,
    [mappedTasksIds],
  );
};

export default React.memo(TaskbarTasks);
