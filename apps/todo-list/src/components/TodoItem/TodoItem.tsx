import { useState } from "react";
import {
  DELETE_TODO,
  EDIT_TODO,
  TodoItemType,
  TOGGLE_TODO,
} from "../../reducer";
import { useTodoContext } from "../../store";
import Button from "../Button/Button";

const TodoItem = ({ data }: { data: TodoItemType }) => {
  const { dispatch } = useTodoContext();
  const { text, completed } = data;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EDIT_TODO,
      payload: { id: data.id, text: e.target.value },
    });
  };

  const handleToggle = () => {
    dispatch({ type: TOGGLE_TODO, payload: { id: data.id } });
  };

  const handleDelete = () => {
    dispatch({ type: DELETE_TODO, payload: { id: data.id } });
  };

  return (
    <div className="flex gap-3 items-center p-3">
      <input checked={completed} onChange={handleToggle} type="checkbox" />
      {isEdit ? (
        <input
          className="grow bg-white border border-gray-300 rounded-md text-black py-1 px-3 text-sm shrink-0"
          type="text"
          value={text}
          onChange={handleEdit}
        />
      ) : (
        <p className={`grow ${completed && "line-through"}`}>{text}</p>
      )}
      <Button onClick={handleEditToggle}>수정</Button>
      <Button onClick={handleDelete}>삭제</Button>
    </div>
  );
};

export default TodoItem;
