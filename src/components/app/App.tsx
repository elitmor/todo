import { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList } from '../todoList/TodoList';
import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValueType = 'all' | 'completed' | 'active';

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'Html', isDone: true },
    { id: v1(), title: 'Css', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValueType>('all');

  let tasksForTodoList = tasks;

  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }

  if (filter === 'active') {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }

  const addTask = (titleValue: string) => {
    const newTask = {
      id: v1(),
      title: titleValue,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const changeFilter = (filterValue: FilterValueType) => {
    setFilter(filterValue);
  };

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: isDone } : task,
      );
    });
  };

  return (
    <div>
      <TodoList
        title='What to Learn'
        tasks={tasksForTodoList}
        filter={filter}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
};
