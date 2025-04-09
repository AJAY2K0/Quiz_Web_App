import { useState } from "react";
import quizCompleteLogo from "../assets/quiz-complete.png";
import ConfirmModal from "./ConfirmModal.jsx";

export default function Summary({ userAnswers, questions, onRestart }) {
  const [showModal, setShowModal] = useState(false);

  function handleRestartClick() {
    setShowModal(true);
  }

  function handleConfirmRestart() {
    setShowModal(false);
    onRestart();
  }

  function handleCancelRestart() {
    setShowModal(false);
  }

  const CorrectAnswer = userAnswers.filter(
    (answer, index) => answer === questions[index].answers[0]
  );

  const IncorrectAnswer = userAnswers.filter(
    (answer, index) => answer !== questions[index].answers[0] && answer !== null
  );

  const CorrectAnswerPercent = Math.round(
    (CorrectAnswer.length / userAnswers.length) * 100
  );
  const IncorrectAnswerPercent = Math.round(
    (IncorrectAnswer.length / userAnswers.length) * 100
  );

  const SkippedAnswerPercent =
    100 - (CorrectAnswerPercent + IncorrectAnswerPercent);

  return (
    <div id="summary">
      <img src={quizCompleteLogo} alt="Quiz complete logo" />
      <h2>Quiz Complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{CorrectAnswerPercent}%</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{IncorrectAnswerPercent}%</span>
          <span className="text">Incorrext</span>
        </p>
        <p>
          <span className="number">{SkippedAnswerPercent}%</span>
          <span className="text">Skipped</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === questions[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
      <button onClick={handleRestartClick}>Restart Quiz</button>
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to restart the quiz?"
          onConfirm={handleConfirmRestart}
          onCancel={handleCancelRestart}
        />
      )}
    </div>
  );
}
