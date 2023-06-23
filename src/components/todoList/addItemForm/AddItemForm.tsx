import { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (titleValue: string) => void;
};
export const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {
  const [newTaskInputValue, setNewTaskInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTaskInputValue(e.currentTarget.value);
  };

  const handleNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && newTaskInputValue.trim() !== '') {
      handleAddTask();
    } else {
      setError('Title is required!');
    }
  };

  const handleAddTask = () => {
    if (newTaskInputValue && newTaskInputValue.trim() !== '') {
      addItem(newTaskInputValue.trim());
    } else {
      setError('Title is required!');
    }
    setNewTaskInputValue('');
  };

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        onChange={handleNewTaskInputChange}
        value={newTaskInputValue}
        type='text'
        onKeyDown={handleNewTaskInputKeyDown}
      />
      <button onClick={handleAddTask}>Add</button>
      <div className='error-message'>{error}</div>
    </div>
  );
};
