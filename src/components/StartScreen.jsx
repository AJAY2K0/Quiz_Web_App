import { useState } from "react";

export default function StartScreen({ onStart }) {
  const [count, setCount] = useState(10);
  const questionNum = [5, 10, 15, 20];

  return (
    <div id="start-screen">
      <h2>Welcome to the Quiz!</h2>
      <label>
        Number of Questions:
        <select
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
        >
          {questionNum.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onStart(count)}>Start Quiz</button>
    </div>
  );
}
