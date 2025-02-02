import { TodoItemType } from "../../App";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

const TodoList = ({
  data,
  onToggle,
  onAllToggle,
}: {
  data: TodoItemType[];
  onToggle: (id: number) => void;
  onAllToggle: (flag: boolean) => void;
}) => {
  const isAllCompleted = data.every((item) => item.completed);

  return (
    <div className="todo-list">
      <div className="todo-header">
        <input
          type="checkbox"
          checked={isAllCompleted}
          onChange={() => onAllToggle(!isAllCompleted)}
        />
        <p>할 일</p>
        <button>0개 삭제</button>
      </div>
      <div>
        {data.map((item) => (
          <TodoItem
            key={item.id}
            data={item}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
