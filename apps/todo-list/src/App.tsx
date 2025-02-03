import { useEffect, useReducer } from "react";
import Controls from "./components/Controls/Controls";
import Layout from "./components/Layout/Layout";
import Title from "./components/Title/Title";
import TodoList from "./components/TodoList/TodoList";
import {
  ALL_TOGGLE,
  CREATE_TODO,
  DELETE_ALL_TODO,
  DELETE_TODO,
  EDIT_TODO,
  FILTER_TODO,
  init,
  initialState,
  reducer,
  TOGGLE_TODO,
} from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const filter = state.filter;

  const handleCreateTodo = (text: string) => {
    if (text === "") return;
    dispatch({ type: CREATE_TODO, payload: { text } });
  };

  const handleToggle = (id: number) => {
    dispatch({ type: TOGGLE_TODO, payload: { id } });
  };

  const handleAllToggle = (flag: boolean) => {
    dispatch({ type: ALL_TOGGLE, payload: { completed: flag } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: DELETE_TODO, payload: { id } });
  };

  const handleDeleteAll = () => {
    dispatch({ type: DELETE_ALL_TODO, payload: {} });
  };

  const handleEdit = (id: number, text: string) => {
    dispatch({ type: EDIT_TODO, payload: { id, text } });
  };

  const handleFilter = (value: "all" | "todo" | "done") => {
    dispatch({ type: FILTER_TODO, payload: { filter: value } });
  };

  const filteredTodoList = state.list.filter((item) => {
    if (filter === "all") return true;
    if (filter === "todo") return !item.completed;
    if (filter === "done") return item.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state.list));
    localStorage.setItem("id", JSON.stringify(state.id));
  }, [state]);

  return (
    <div>
      <Layout>
        <Title />
        <Controls
          filter={filter}
          onCreate={handleCreateTodo}
          onFilter={handleFilter}
        />
        <TodoList
          data={filteredTodoList}
          onToggle={handleToggle}
          onAllToggle={handleAllToggle}
          onDelete={handleDelete}
          onDeleteAll={handleDeleteAll}
          onEdit={handleEdit}
        />
      </Layout>
    </div>
  );
}

export default App;
