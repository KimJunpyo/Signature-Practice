import { useEffect } from "react";
import Controls from "./components/Controls/Controls";
import Layout from "./components/Layout/Layout";
import Title from "./components/Title/Title";
import TodoList from "./components/TodoList/TodoList";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./store/todoSlice";
import { AppDispatch } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div>
      <Layout>
        <Title />
        <Controls />
        <TodoList />
      </Layout>
    </div>
  );
}

export default App;
