import { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList } from '../todoList/TodoList';
import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'Html', isDone: true },
    { id: v1(), title: 'Css', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ]);

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TodoList
        title='What to Learn'
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  );
};
