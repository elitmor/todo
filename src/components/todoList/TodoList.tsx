import { FilterValueType, TaskType } from '../app/App';

type TodoListPropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (filterValue: FilterValueType) => void;
};

export const TodoList: React.FC<TodoListPropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <input type='text' />
      <button>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.isDone}
            />
            <span>{task.title}</span>
            <button onClick={() => removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
      <button onClick={() => changeFilter('all')}>All</button>
      <button onClick={() => changeFilter('active')}>Active</button>
      <button onClick={() => changeFilter('completed')}>Completed</button>
    </div>
  );
};
