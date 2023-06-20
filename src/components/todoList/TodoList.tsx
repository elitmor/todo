import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType, TaskType } from '../app/App';

type TodoListPropsType = {
  title: string;
  tasks: TaskType[];
  addTask: (titleValue: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (filterValue: FilterValueType) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodoList: React.FC<TodoListPropsType> = ({
  title,
  tasks,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
}) => {
  const [newTaskInputValue, setNewTaskInputValue] = useState('');

  const handleNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskInputValue(e.currentTarget.value);
  };

  const handleAddTask = () => {
    if (newTaskInputValue && newTaskInputValue.trim() !== '') {
      addTask(newTaskInputValue.trim());
    }
    setNewTaskInputValue('');
  };

  const handleNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && newTaskInputValue.trim() !== '') {
      handleAddTask();
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
      <ul>
        {tasks.map((task) => {
          const handleRemoveTask = () => {
            removeTask(task.id);
          };
          const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
          };
          return (
            <li key={task.id}>
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
      <button onClick={handleFilterAll}>All</button>
      <button onClick={handleFilterActive}>Active</button>
      <button onClick={handleFilterCompleted}>Completed</button>
    </div>
  );
};
