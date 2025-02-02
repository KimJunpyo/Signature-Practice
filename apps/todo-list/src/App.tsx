import { useState } from "react";
import Controls from "./components/Controls/Controls";
import Layout from "./components/Layout/Layout";
import Title from "./components/Title/Title";
import TodoList from "./components/TodoList/TodoList";

export interface TodoItemType {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const handleCreateTodo = (text: string) => {
    setTodoList((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        text,
        completed: false,
      },
    ]);
  };

  const handleToggle = (id: number) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAllToggle = (flag: boolean) => {
    setTodoList((prev) =>
      prev.map((item) => ({
        ...item,
        completed: flag,
      }))
    );
  };

  return (
    <div>
      <Layout>
        <Title />
        <Controls onCreate={handleCreateTodo} />
        <TodoList
          data={todoList}
          onToggle={handleToggle}
          onAllToggle={handleAllToggle}
        />
      </Layout>
    </div>
  );
}

export default App;
