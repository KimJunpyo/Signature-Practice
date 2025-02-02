import { TodoItemType } from "../../App";
import "./TodoItem.css";

const TodoItem = ({
  data,
  onToggle,
}: {
  data: TodoItemType;
  onToggle: () => void;
}) => {
  const { text, completed } = data;
  return (
    <div className="todo-item">
      <input checked={completed} onChange={onToggle} type="checkbox" />
      <p>{text}</p>
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
};

export default TodoItem;
