import { useState } from "react";
import "./Controls.css";

const Controls = ({
  filter,
  onCreate,
  onFilter,
}: {
  filter: "all" | "todo" | "done";
  onCreate: (text: string) => void;
  onFilter: (value: "all" | "todo" | "done") => void;
}) => {
  const [text, setText] = useState("");

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    onCreate(text);
    setText("");
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value as "all" | "todo" | "done");
  };

  return (
    <div className="controls">
      <input
        value={text}
        onChange={handleChangeText}
        type="text"
        className="input"
      />
      <button onClick={handleSubmit} className="button">
        추가
      </button>
      <select className="select" value={filter} onChange={handleChangeFilter}>
        <option value="all">전체</option>
        <option value="todo">할 일</option>
        <option value="done">완료</option>
      </select>
    </div>
  );
};

export default Controls;
