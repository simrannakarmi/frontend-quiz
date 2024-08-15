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
    const response = await api.post("/account/login/", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
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

export const getQuiz = async (quizId) => {
  const response = await api.get(`/quizzes/${quizId}/`);
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

export const getResponses = async () => {
  const response = await api.get("/responses/");
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
