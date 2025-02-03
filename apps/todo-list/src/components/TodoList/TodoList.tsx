import { ALL_TOGGLE, DELETE_ALL_TODO } from "../../reducer";
import { useTodoContext } from "../../store";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const { state, dispatch } = useTodoContext();
  const data = state.list;
  const filter = state.filter;
  const filteredTodoList = state.list.filter((item) => {
    if (filter === "all") return true;
    if (filter === "todo") return !item.completed;
    if (filter === "done") return item.completed;
    return true;
  });

  const isAllCompleted =
    filteredTodoList.length > 0 &&
    filteredTodoList.every((item) => item.completed);

  const completedCount = data.filter((item) => item.completed).length;

  const handleToggleAll = () => {
    dispatch({
      type: ALL_TOGGLE,
      payload: { completed: !isAllCompleted },
    });
  };

  const handleDeleteAll = () => {
    dispatch({ type: DELETE_ALL_TODO, payload: {} });
  };

  return (
    <div className="todo-list">
      <div className="todo-header">
        <input
          type="checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p>할 일</p>
        {completedCount > 0 && (
          <button onClick={handleDeleteAll}>{completedCount}개 삭제</button>
        )}
      </div>
      <div>
        {filteredTodoList.map((item) => (
          <TodoItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
