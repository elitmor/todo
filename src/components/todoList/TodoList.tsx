import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType, TaskType } from '../app/App';

type TodoListPropsType = {
  title: string;
  tasks: TaskType[];
  filter: FilterValueType;
  addTask: (titleValue: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (filterValue: FilterValueType) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodoList: React.FC<TodoListPropsType> = ({
  title,
  tasks,
  filter,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
}) => {
  const [newTaskInputValue, setNewTaskInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTaskInputValue(e.currentTarget.value);
  };

  const handleAddTask = () => {
    if (newTaskInputValue && newTaskInputValue.trim() !== '') {
      addTask(newTaskInputValue.trim());
    } else {
      setError('Title is required!');
    }
    setNewTaskInputValue('');
  };

  const handleNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && newTaskInputValue.trim() !== '') {
      handleAddTask();
    } else {
      setError('Title is required!');
    }
  };

  const handleFilterAll = () => {
    changeFilter('all');
  };

  const handleFilterActive = () => {
    changeFilter('active');
  };

  const handleFilterCompleted = () => {
    changeFilter('completed');
  };

  return (
    <div>
      <h3>{title}</h3>
      <input
        className={error ? 'error' : ''}
        onChange={handleNewTaskInputChange}
        value={newTaskInputValue}
        type='text'
        onKeyDown={handleNewTaskInputKeyDown}
      />
      <button
        onClick={() => {
          handleAddTask();
        }}
      >
        Add
      </button>
      <div className='error-message'>{error}</div>
      <ul>
        {tasks.map((task) => {
          const handleRemoveTask = () => {
            removeTask(task.id);
          };
          const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
          };
          return (
            <li
              className={task.isDone ? 'is-done' : ''}
              key={task.id}
            >
              <input
                onChange={handleChangeTask}
                type='checkbox'
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={handleRemoveTask}>×</button>
            </li>
          );
        })}
      </ul>
      <button
        className={filter === 'all' ? 'active-filter' : ''}
        onClick={handleFilterAll}
      >
        All
      </button>
      <button
        className={filter === 'active' ? 'active-filter' : ''}
        onClick={handleFilterActive}
      >
        Active
      </button>
      <button
        className={filter === 'completed' ? 'active-filter' : ''}
        onClick={handleFilterCompleted}
      >
        Completed
      </button>
    </div>
  );
};
