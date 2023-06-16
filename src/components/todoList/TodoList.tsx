import { TaskType } from '../app/App';

type TodoListPropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
};

export const TodoList: React.FC<TodoListPropsType> = ({
  title,
  tasks,
  removeTask,
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
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
};
