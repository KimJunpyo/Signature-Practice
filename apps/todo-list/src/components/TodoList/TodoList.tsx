import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import TodoItem from "../TodoItem/TodoItem";
import {
  allToggleTodo,
  deleteAllTodo,
  TodoListType,
} from "../../store/todoSlice";
import { ChangeEvent } from "react";

const TodoList = () => {
  const state = useSelector((state: { todo: TodoListType }) => state.todo);
  const dispatch = useDispatch();
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
  const handleToggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(allToggleTodo({ completed: e.target.checked }));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTodo());
  };

  return (
    <div className="mt-5 bg-transparent border border-gray-300 rounded-md">
      <div className="flex gap-3 items-center h-10 p-0 px-3">
        <input
          type="checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className="grow">할 일</p>
        {completedCount > 0 && (
          <Button onClick={handleDeleteAll}>{completedCount}개 삭제</Button>
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
