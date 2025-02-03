import { useState } from "react";
import { useTodoContext } from "../../store";
import { CREATE_TODO, FILTER_TODO } from "../../reducer";
import Button from "../Button/Button";

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
    <div className="flex gap-1.5">
      <input
        value={text}
        onChange={handleChangeText}
        type="text"
        className="grow bg-transparent border border-gray-300 rounded-md text-white py-1 px-3 text-sm shrink-0"
      />
      <Button onClick={handleSubmit}>추가</Button>
      <select
        className="bg-transparent border border-gray-300 rounded-md text-white p-0 px-3 shrink-0"
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
