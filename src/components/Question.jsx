import { useState } from "react";
import QuestionProgressTimer from "./QuestionProgessTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
  questions,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answerText) {
    setAnswer({
      selectedAnswer: answerText,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answerText,
        isCorrect: questions[index].answers[0] === answerText,
      });
      setTimeout(() => {
        onSelectAnswer(answerText);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionProgressTimer
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{questions[index].text}</h2>

      <Answers
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
        correctAnswer={questions[index].answers[0]}
      />
    </div>
  );
}
