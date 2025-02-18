import { useState } from "react";
import Button from "../Button/Button";
import {
  deleteTodo,
  editTodo,
  TodoItemType,
  toggleTodo,
} from "../../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ data }: { data: TodoItemType }) => {
  const dispatch = useDispatch();
  const { text, completed } = data;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditToggle = () => {
    setIsEdit((prev) => !prev);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTodo({ id: data.id, text: e.target.value }));
  };

  const handleToggle = () => {
    dispatch(toggleTodo({ id: data.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ id: data.id }));
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
