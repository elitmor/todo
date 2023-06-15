import { v1 } from 'uuid';
import { TodoList } from '../todoList/TodoList';
import './App.css';

export type taskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const App = () => {
  const task1: taskType[] = [
    { id: v1(), title: 'Html', isDone: true },
    { id: v1(), title: 'Css', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ];

  const task2: taskType[] = [
    { id: v1(), title: 'Eternal Echoes', isDone: false },
    { id: v1(), title: 'Midnight Mirage', isDone: false },
    { id: v1(), title: 'Whispering Shadows', isDone: true },
    { id: v1(), title: 'Fragments of Destiny', isDone: true },
  ];

  return (
    <div>
      <TodoList
        title='What to Learn'
        tasks={task1}
      />
      <TodoList
        title='What to watch'
        tasks={task2}
      />
    </div>
  );
};
