import { useState } from "react";
import "./Controls.css";

const Controls = ({ onCreate }: { onCreate: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    onCreate(text);
    setText("");
  };

  return (
    <div className="controls">
      <input onChange={handleChangeText} type="text" className="input" />
      <button onClick={handleSubmit} className="button">
        추가
      </button>
      <select className="select">
        <option value="all">전체</option>
        <option value="todo">할 일</option>
        <option value="done">완료</option>
      </select>
    </div>
  );
};

export default Controls;
