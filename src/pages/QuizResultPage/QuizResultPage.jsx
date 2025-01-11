import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizResult } from "../../Services/api";
import UserLayout from "../../components/UserLayout/UserLayout";

const QuizResultPage = () => {
  const { id } = useParams();
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const data = await getQuizResult(id);
        setQuizResult(data);
      } catch (error) {
        console.error("Failed to fetch quiz result", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResult();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quizResult) {
    return <div>Quiz result not found</div>;
  }

  return (
    <UserLayout>
      <div className="bg-light-accent p-6 rounded-lg h-screen shadow-lg max-w-2xl mx-auto">
        <h1 className="font-bold text-3xl text-primary mb-4">
          {quizResult.quiz_title}
        </h1>
        <p className="text-lg text-primaryText mb-4">
          You scored {quizResult.score} out of {quizResult.total}
        </p>

        <div className="bg-white p-5 h-4/5 rounded-lg overflow-auto shadow-inner mb-6">
          {quizResult.questions.map((question, index) => (
            <div key={question.question_id} className="mb-4">
              <p className="text-lg font-medium text-primaryText mb-2">
                {index + 1}. {question.question_text}
              </p>
              <p
                className={`mb-2 ${
                  question.is_correct ? "text-green-600" : "text-red-600"
                }`}
              >
                Your answer: {question.user_choice_text}
              </p>
              {!question.is_correct && (
                <p className="text-green-600">
                  Correct answer: {question.correct_choice_text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default QuizResultPage;
