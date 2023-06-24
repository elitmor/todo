import { ChangeEvent, useState } from 'react';

type EditableSpaPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export const EditableSpan: React.FC<EditableSpaPropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {editMode ? (
        <input
          onChange={handleChangeTitle}
          onBlur={deactivateEditMode}
          value={title}
          autoFocus={true}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
      )}
    </>
  );
};
