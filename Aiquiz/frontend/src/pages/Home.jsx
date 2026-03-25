import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";

export default function Home() {
  const { topic, setTopic } = useContext(QuizContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>AI Quiz App</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
      />

      <button onClick={() => navigate("/quiz")}>
        Start Quiz
      </button>
  
    </div>
  );
}