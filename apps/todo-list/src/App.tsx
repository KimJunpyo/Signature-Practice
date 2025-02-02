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
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");

  const handleCreateTodo = (text: string) => {
    if (text === "") return;
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

  const handleDelete = (id: number) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    setTodoList((prev) => prev.filter((item) => !item.completed));
  };

  const handleEdit = (id: number, text: string) => {
    setTodoList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleFilter = (value: "all" | "todo" | "done") => {
    setFilter(value);
  };

  const filteredTodoList = todoList.filter((item) => {
    if (filter === "all") return true;
    if (filter === "todo") return !item.completed;
    if (filter === "done") return item.completed;
    return true;
  });

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
