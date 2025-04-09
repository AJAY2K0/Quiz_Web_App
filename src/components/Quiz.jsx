import { useCallback, useState, useRef } from "react";

import Questions from "../questions.js";
import Summary from "./Summary.jsx";
import Question from "./Question.jsx";
import StartScreen from "./StartScreen.jsx";

function getRandomQuestions(questions, count) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionCount, setQuestionCount] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const questionSet = useRef([]);

  function handleStart(count) {
    setQuestionCount(count);
    questionSet.current = getRandomQuestions(Questions, count);
  }

  function handleRestart() {
    setUserAnswers([]);
    setResetKey((prev) => prev + 1);
    setQuestionCount(null);
  }

  const currentQuestionIndex = userAnswers.length;
  const quizComplete =
    questionCount !== null &&
    currentQuestionIndex === questionSet.current.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswer) => [...prevUserAnswer, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (questionCount === null) {
    return <StartScreen onStart={handleStart} />;
  }

  if (quizComplete) {
    return (
      <Summary
        key={resetKey}
        userAnswers={userAnswers}
        questions={questionSet.current}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div id="quiz">
      <Question
        key={currentQuestionIndex + resetKey}
        index={currentQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        questions={questionSet.current}
      />
    </div>
  );
}
