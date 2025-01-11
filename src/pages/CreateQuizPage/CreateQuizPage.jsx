import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuiz } from "../../Services/api";
import Button from "../../components/Button/Button";
import UserLayout from "../../components/UserLayout/UserLayout";

const CreateQuizPage = () => {
  const [description, setDescription] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    generateQuiz(description)
      .then((response) => {

        if (response.status === "success") {
          setQuizId(response.quiz_id);
          setError(null); 
        } else {
          setError(response.data.message || "Error generating quiz");
        }
      })
      .catch((error) => {
        console.error("Error:", error); 
        setError(
          error.response ? error.response.data.error : "Error generating quiz"
        );
      });
  };

  return (
    <UserLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Create a New Quiz
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description:
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter a brief description"
              />
            </div>
            <div className="flex justify-center">
              <Button text="Generate Quiz" />
            </div>
          </form>
          {quizId && (
            <p className="mt-4 text-center text-success">
              Quiz generated with ID: {quizId}
              <Button
                text="Play It"
                className="bg-base-100 text-[#2A9D8F] hover:bg-[#2A9D8F] hover:text-white"
                onCLick={navigate(`/play-quiz/${quizId}`)}
              />
            </p>
          )}
          {error && (
            <p className="mt-4 text-center text-error">Error: {error}</p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default CreateQuizPage;
