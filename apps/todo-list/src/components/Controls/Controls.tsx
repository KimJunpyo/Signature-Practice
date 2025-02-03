import { useState } from "react";
import "./Controls.css";
import { useTodoContext } from "../../store";
import { CREATE_TODO, FILTER_TODO } from "../../reducer";

const Controls = () => {
  const [text, setText] = useState("");
  const { state, dispatch } = useTodoContext();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text === "") return;
    dispatch({ type: CREATE_TODO, payload: { text } });
    setText("");
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: FILTER_TODO,
      payload: { filter: e.target.value as "all" | "todo" | "done" },
    });
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
      <select
        className="select"
        value={state.filter}
        onChange={handleChangeFilter}
      >
        <option value="all">전체</option>
        <option value="todo">할 일</option>
        <option value="done">완료</option>
      </select>
    </div>
  );
};

export default Controls;
