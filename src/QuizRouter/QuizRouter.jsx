import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from ".././pages/LandingPage/LandingPage";
import LoginPage from ".././pages/LoginPage/LoginPage";
import RegisterPage from ".././pages/RegisterPage/RegisterPage";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import CreateQuizPage from "../pages/CreateQuizPage/CreateQuizPage";
import QuizzesPage from "../pages/QuizzesPage/QuizzesPage";
import QuestionsViewPage from "../pages/QuestionsViewPage/QuestionsViewPage";
import ResponsesPage from "../pages/ResponsesPage/ResponsesPage";
import AnalyticsPage from "../pages/AnalyticsPage/AnalyticsPage";
import QuizDetailPage from "../pages/QuizDetailPage/QuizDetailPage";
import { AuthProvider } from "../context/AuthContext";

const QuizRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/questions" element={<QuestionsViewPage />} />
          <Route path="/user-responses" element={<ResponsesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default QuizRouter;
