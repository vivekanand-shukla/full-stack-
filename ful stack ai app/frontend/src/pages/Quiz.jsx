import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuiz } from "../api";

export default function Quiz() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  console.log(quiz)
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  console.log(score)
  useEffect(() => {
    generateQuiz("computer").then(res => setQuiz(res.data));
  }, []);

  if (!quiz.length) return <h2>Loading...</h2>;

  const question = quiz[current];

  const handleNext = () => {
  if (selected === null) return;

  let newScore = score;

  const correctIndex = question.answer.charCodeAt(0) - 65;

  if (selected === correctIndex) {
    newScore = score + 1;
    setScore(newScore);
  }

  setSelected(null);

  if (current + 1 < quiz.length) {
    setCurrent(current + 1);
  } else {
    // ✅ localStorage save (temporary fix)
    localStorage.setItem("score", newScore);
    localStorage.setItem("total", quiz.length);

    navigate("/result");
  }
};

  return (
    <div>
      <h2>{question.question}</h2>

      {question.options.map((opt, i) => (
  <div key={i}>
    <input
      type="radio"
      name="option"
      checked={selected === i}
      onChange={() => setSelected(i)}
    />
    {opt}
  </div>
))}

      <button onClick={handleNext}>Next</button>
    </div>
  );
}