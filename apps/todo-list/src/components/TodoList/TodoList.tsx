import { TodoItemType } from "../../App";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

const TodoList = ({
  data,
  onToggle,
  onAllToggle,
  onDelete,
  onDeleteAll,
  onEdit,
}: {
  data: TodoItemType[];
  onToggle: (id: number) => void;
  onAllToggle: (flag: boolean) => void;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
  onEdit: (id: number, text: string) => void;
}) => {
  const isAllCompleted =
    data.length > 0 && data.every((item) => item.completed);
  const completedCount = data.filter((item) => item.completed).length;

  return (
    <div className="todo-list">
      <div className="todo-header">
        <input
          type="checkbox"
          checked={isAllCompleted}
          onChange={() => onAllToggle(!isAllCompleted)}
        />
        <p>할 일</p>
        {completedCount > 0 && (
          <button onClick={onDeleteAll}>{completedCount}개 삭제</button>
        )}
      </div>
      <div>
        {data.map((item) => (
          <TodoItem
            key={item.id}
            data={item}
            onToggle={() => onToggle(item.id)}
            onDelete={() => onDelete(item.id)}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
