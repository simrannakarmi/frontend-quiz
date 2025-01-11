import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById } from "../../Services/api";
import Button from "../Button/Button";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizById = async () => {
      try {
        const data = await getQuizById(id);
        setQuiz(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizById();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }
  return (
    <>
      <div className="w-4/5 h-2/5 mx-auto p-5 mt-10 bg-light-accent flex flex-col justify-center shadow-lg rounded-lg">
        <h1 className="font-bold text-2xl text-primary mb-4">{quiz.title}</h1>
        <p className="text-primaryText mb-4">{quiz.description}</p>
        {/* <p className="text-sm text-gray-500">Created At: {quiz.created_at}</p>
        <p className="text-sm text-gray-500">Updated At: {quiz.updated_at}</p> */}
        <p className="text-primaryText mt-5 text-lg font-semibold">
          Total Questions: {quiz.questions.length}
        </p>
        <Button
          text="Play Quiz"
          onClick={() => navigate(`/play-quiz/${quiz.id}`)}
          className=""
        />
      </div>
    </>

    //   {/* <p>Average Score: {quiz.attempts.length > 0? (quiz.attempts.reduce((acc, attempt) => acc + attempt.score, 0) / quiz.attempts.length).toFixed(2) : 0} */}
    //   {/* <ul>
    //     {quiz.questions.map((question) => (
    //       <li key={question.id}>
    //         <p>{question.text}</p>
    //         <ul>
    //           {question.choices.map((choice) => (
    //             <li key={choice.id}>{choice.text}</li>
    //           ))}
    //         </ul>
    //       </li>
    //     ))}
    //   </ul> */}
    // </div>
  );
};

export default QuizDetail;
