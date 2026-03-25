import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QuizProvider } from "./context/QuizContext.jsx";
import './index.css';



const main = () => {

  return (
    <div>main</div>
  )
}

export default main
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>
);