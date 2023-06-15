import { taskType } from '../app/App';

type TodoListPropsType = {
  title: string;
  tasks: taskType[];
};

export const TodoList: React.FC<TodoListPropsType> = ({ title, tasks }) => {
  return (
    <div>
      <h3>{title}</h3>
      <input type='text' />
      <button>Add</button>
      <ul>
        {tasks.map((task) => (
          <li>
            <input
              type='checkbox'
              checked={task.isDone}
            />
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  );
};
