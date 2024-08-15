import { useEffect, useState } from "react";
import { getQuizzes } from "../../Services/api";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="bg-accent w-4/5 h-3/5 flex flex-col items-center rounded-lg">
      <h2 className="font-bold text-2xl py-10">Available Quizzes</h2>
      <div className="bg-green-50 w-4/5 px-10 py-4 border border-gray-300">
        <h2 className="font-bold text-lg py-4">Quiz Names</h2>
        {error && <p>{error}</p>}
        <ul className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizList;
