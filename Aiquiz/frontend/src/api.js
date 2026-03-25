import axios from "axios";

export const generateQuiz = (topic) => {
  return axios.post("https://full-stack-xpzh.vercel.app/api/quiz/generate", {
    topic
  });
};

// https://full-stack-xpzh.vercel.app/