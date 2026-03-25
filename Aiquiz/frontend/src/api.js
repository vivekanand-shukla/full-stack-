import axios from "axios";

export const generateQuiz = (topic) => {
  return axios.post("http://localhost:5000/api/quiz/generate", {
    topic
  });
};