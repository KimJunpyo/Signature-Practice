import Controls from "./components/Controls/Controls";
import Layout from "./components/Layout/Layout";
import Title from "./components/Title/Title";
import TodoList from "./components/TodoList/TodoList";
import TodoProvider from "./store";

function App() {
  return (
    <div>
      <TodoProvider>
        <Layout>
          <Title />
          <Controls />
          <TodoList />
        </Layout>
      </TodoProvider>
    </div>
  );
}

export default App;
