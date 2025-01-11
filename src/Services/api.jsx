import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}/account/login/`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login failed api.jsx", error);
    throw error;
  }
};

export const register = async (data) => {
  const response = await api.post("/account/register/", data);
  return response.data;
};

export const getQuizzes = async () => {
  const response = await api.get("/quizzes/");
  return response.data;
};

export const getQuizById = async (quizId) => {
  const response = await api.get(`/quiz/${quizId}/`);
  return response.data;
};

export const getQuestions = async () => {
  const response = await api.get("/questions/");
  return response.data;
};

export const getChoices = async () => {
  const response = await api.get("/choices/");
  return response.data;
};

export const submitResponses = async ({ quizId, answers, score }) => {
  const formattedResponses = Object.entries(answers).map(
    ([questionId, choiceText]) => ({
      question: questionId,
      choice: choiceText,
    })
  );
  try {
    const response = await api.post(`/quiz-submit/${quizId}/`, {
      quiz_id: quizId,
      responses: formattedResponses,
      score,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to submit responses", error);
    throw error;
  }
};

export const getQuizResult = async (quizId) => {
  const response = await api.get(`/quiz-result/${quizId}/`);
  return response.data;

  // const data = await response.json();
  // return data;
};

// export const submitResponses = async ({responses}) => {
//   const response = await api.post("/responses/", responses);
//   return response.data;
// };

export const getResponses = async () => {
  const response = await api.get("/responses/");
  return response.data;
};

// ai quiz generate
export const generateQuiz = async (description) => {
  const response = await api.post("/generate-quiz/", { description });
  return response.data;
};

export const getUserList = async () => {
  const response = await api.get("/account/user-list/");
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/account/user-detail/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/account/logout/");
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

export default api;
