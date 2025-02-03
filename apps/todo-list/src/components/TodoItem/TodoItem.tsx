import { useState } from "react";
import "./TodoItem.css";
import {
  DELETE_TODO,
  EDIT_TODO,
  TodoItemType,
  TOGGLE_TODO,
} from "../../reducer";
import { useTodoContext } from "../../store";

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
    <div className="todo-item">
      <input checked={completed} onChange={handleToggle} type="checkbox" />

      {isEdit ? (
        <input
          className="edit"
          type="text"
          value={text}
          onChange={handleEdit}
        />
      ) : (
        <p className={completed ? "completed" : ""}>{text}</p>
      )}
      <button onClick={handleEditToggle}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default TodoItem;
