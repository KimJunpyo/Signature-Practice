import { useState } from "react";
import "./TodoItem.css";
import { TodoItemType } from "../../reducer";

const TodoItem = ({
  data,
  onToggle,
  onDelete,
  onEdit,
}: {
  data: TodoItemType;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (id: number, text: string) => void;
}) => {
  const { text, completed } = data;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleEditToggle = () => {
    setIsEdit((prev) => !prev);
  };
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit(data.id, e.target.value);
  };
  return (
    <div className="todo-item">
      <input checked={completed} onChange={onToggle} type="checkbox" />

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
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

export default TodoItem;
