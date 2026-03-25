
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

  const score = localStorage.getItem("score");
  const total = localStorage.getItem("total");

  const restart = () => {
    localStorage.removeItem("score");
    localStorage.removeItem("total");
    navigate("/");
  };

  return (
    <div>
      <h1>Your Score: {score} / {total}</h1>
      <button onClick={restart}>Restart</button>
    </div>
  );
}