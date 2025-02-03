import { TodoListAction, TodoListType } from "../reducer/index";
import { createContext, useContext, useEffect, useReducer } from "react";
import { init, initialState, reducer } from "../reducer";

interface TodoContextProps {
  state: TodoListType;
  dispatch: React.Dispatch<TodoListAction>;
}

const TodoContext = createContext<TodoContextProps | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
};

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state.list));
    localStorage.setItem("id", JSON.stringify(state.id));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
