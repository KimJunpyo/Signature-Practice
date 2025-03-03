import { useState } from "react";
import Button from "../Button/Button";
import {
  deleteTodos,
  editTodos,
  TodoItemType,
  toggleTodo,
} from "../../store/todoSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const TodoItem = ({ data }: { data: TodoItemType }) => {
  const dispatch = useAppDispatch();
  const { text, completed } = data;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(text);

  const handleEditToggle = () => {
    if (isEdit) {
      dispatch(editTodos({ id: data.id, text: newText }));
    }
    setIsEdit((prev) => !prev);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleToggle = () => {
    dispatch(toggleTodo({ id: data.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTodos(data.id));
  };

  return (
    <div className="flex gap-3 items-center p-3">
      <input checked={completed} onChange={handleToggle} type="checkbox" />
      {isEdit ? (
        <input
          className="grow bg-white border border-gray-300 rounded-md text-black py-1 px-3 text-sm shrink-0"
          type="text"
          value={newText}
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
