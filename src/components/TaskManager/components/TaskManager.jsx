import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { useCallback, useState } from 'react';
import actions from '../../../store/actions';

const TaskManager = ({ handleUpdateWindow, language }) => {
  const taskList = useSelector((state) => state.window.openedWindowList);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleTaskSelection = (taskId) => {
    if (selectedTask === taskId) {
      setSelectedTask(null);
    } else {
      setSelectedTask(taskId);
    }
  };

  const updateWindowState = useCallback(
    (updates) => handleUpdateWindow({ id: selectedTask, ...updates }),
    [selectedTask, handleUpdateWindow]
  );

  const handleClose = () => updateWindowState({ requestingClose: true });

  return (
    <div className="task-manager" aria-label="Task Manager">
      <header className="task-manager-header">
        <h2 className="task-manager-title">Tasks</h2>
      </header>
      <main className="task-manager-main">
        <table>
          <thead className="task-list-header">
            <tr className="task-list-header-row">
              <th className="task-list-header-cell">
                <p>Name </p>
                <i className="icon arrow-down"></i>
              </th>
            </tr>
          </thead>
          <tbody className="task-list-body">
            {taskList.length === 0 ? (
              <tr className="task-row">
                <td className="task-name-cell">No processes running</td>
              </tr>
            ) : (
              taskList.map((task, index) => (
                <tr
                  className={`task-row ${
                    selectedTask === task.id ? 'selected' : ''
                  }`}
                  key={`task-row-${index}`}
                  onClick={() => toggleTaskSelection(task.id)}
                >
                  <td
                    id={`task-cell-${index}`}
                    key={`task-cell-${index}`}
                    className="task-name-cell"
                  >
                    <p className="task-name">
                      {task.title[language] || 'Untitled Task'}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>

      <footer className="task-manager-footer">
        <Button
          type="submit"
          ariaLabel="Submit Button"
          variant={'danger'}
          onClick={handleClose}
        >
          Terminate
        </Button>
      </footer>
    </div>
  );
};

export default TaskManager;
