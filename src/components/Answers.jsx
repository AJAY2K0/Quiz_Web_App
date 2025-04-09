// import { useRef } from "react";

// export default function Answers({
//   answers,
//   answerState,
//   onSelect,
//   selectedAnswer,
// }) {
//   const suffledAnswers = useRef();
//   if (!suffledAnswers.current) {
//     suffledAnswers.current = [...answers];

//     suffledAnswers.current.sort(() => Math.random() - 0.5);
//   }
//   return (
//     <ul id="answers">
//       {suffledAnswers.current.map((answer) => {
//         let cssClass = "";
//         const isSelected = selectedAnswer === answer;
//         if (answerState === "answered" && isSelected) {
//           cssClass = "selected";
//         }
//         if (
//           (answerState === "correct" || answerState === "wrong") &&
//           isSelected
//         ) {
//           cssClass = answerState;
//         }
//         return (
//           <li key={answer} className="answer">
//             <button
//               onClick={() => onSelect(answer)}
//               className={cssClass}
//               disabled={answerState !== ""}
//             >
//               {answer}
//             </button>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
import { useRef } from "react";

export default function Answers({
  answers,
  answerState,
  onSelect,
  selectedAnswer,
  correctAnswer,
}) {
  const suffledAnswers = useRef();
  if (!suffledAnswers.current) {
    suffledAnswers.current = [...answers];
    suffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {suffledAnswers.current.map((answer) => {
        let cssClass = "";
        const isSelected = selectedAnswer === answer;

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (answerState === "correct" && isSelected) {
          cssClass = "correct";
        }
        if (answerState === "wrong") {
          if (isSelected) cssClass = "wrong";
          if (answer === correctAnswer) cssClass = "correct";
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
