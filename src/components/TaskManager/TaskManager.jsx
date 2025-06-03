import Button from '../ui/Button';

const TaskManager = () => {
  // This is a placeholder for the task list.
  const taskList = [
    { name: 'Task 1', status: 'Running' },
    { name: 'Task 2', status: 'Completed' },
    { name: 'Task 3', status: 'Pending' },
    { name: 'Task 4', status: 'Running' },
    { name: 'Task 5', status: 'Failed' },
    { name: 'Task 6', status: 'Completed' },
    { name: 'Task 7', status: 'Pending' },
    { name: 'Task 8', status: 'Running' },
    { name: 'Task 9', status: 'Completed' },
    { name: 'Task 10', status: 'Pending' },
    { name: 'Task 11', status: 'Running' },
    { name: 'Task 12', status: 'Failed' },
  ];

  return (
    <div className="task-manager" aria-label="Task Manager">
      <header className="task-manager-header">
        <h2 className="task-manager-title">Tasks</h2>
      </header>
      <main className="task-manager-main">
        <table>
          <thead className="task-list-header">
            <tr className="task-list-header-row"> 
              <th colSpan={'2'} className="task-list-header-cell">
                <p>Name </p>
                <i className="icon arrow-down"></i>
              </th>
            </tr>
          </thead>
          <tbody className="task-list-body">
            {taskList.map((task, index) => (
              <tr className="task-row" key={`${index}-task-row`}>
                <td key={`${index}-task-name`} className="task-name-cell">
                  <span className="task-name">{task.name}</span>
                </td>

                <td key={`${index}-task-status`} className="task-status-cell">
                  <span className={`task-status ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="task-manager-footer">
        <Button type="submit" ariaLabel="Submit Button" variant={'danger'}>
          Terminate
        </Button>
      </footer>
    </div>
  );
};

export default TaskManager;
