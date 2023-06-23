import { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList } from '../todoList/TodoList';
import { AddItemForm } from '../todoList/addItemForm/AddItemForm';
import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValueType = 'all' | 'completed' | 'active';

type TodoListsType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksStateType = {
  [key: string]: TaskType[];
};

export const App = () => {
  const addTask = (titleValue: string, todoListId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: titleValue,
      isDone: false,
    };

    const updatedTasks = {
      ...tasks,
      [todoListId]: [...tasks[todoListId], newTask],
    };

    setTasks(updatedTasks);
  };

  const removeTask = (id: string, todoListId: string) => {
    const updatedTasks = {
      ...tasks,
      [todoListId]: tasks[todoListId].filter((task) => task.id !== id),
    };

    setTasks(updatedTasks);
  };

  const changeFilter = (filterValue: FilterValueType, todoListId: string) => {
    const todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = filterValue;
      setTodoLists([...todoLists]);
    }
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string,
  ) => {
    const updatedTasks = {
      ...tasks,
      [todoListId]: tasks[todoListId].map((task) =>
        task.id === taskId ? { ...task, isDone: isDone } : task,
      ),
    };

    setTasks(updatedTasks);
  };

  const removeTodoList = (todoListId: string) => {
    const filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasks[todoListId];
  };

  const todoList1 = v1();
  const todoList2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListsType[]>([
    { id: todoList1, title: 'What to learn', filter: 'all' },
    { id: todoList2, title: 'What to watch', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoList1]: [
      { id: v1(), title: 'Html', isDone: true },
      { id: v1(), title: 'Css', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todoList2]: [
      { id: v1(), title: 'Inception', isDone: false },
      { id: v1(), title: 'Interstellar', isDone: false },
      { id: v1(), title: 'Joker', isDone: true },
    ],
  });

  const addTodoList = (titleValue: string) => {
    const todoList: TodoListsType = {
      id: v1(),
      title: titleValue,
      filter: 'all',
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({ ...tasks, [todoList.id]: [] });
  };

  return (
    <div>
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let tasksForTodoList = tasks[tl.id];

        if (tl.filter === 'completed') {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === true,
          );
        }

        if (tl.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === false,
          );
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            filter={tl.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
};
