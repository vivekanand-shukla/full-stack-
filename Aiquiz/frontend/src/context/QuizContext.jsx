import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        topic,
        setTopic,
        quiz,
        setQuiz,
        index,
        setIndex,
        score,
        setScore
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};