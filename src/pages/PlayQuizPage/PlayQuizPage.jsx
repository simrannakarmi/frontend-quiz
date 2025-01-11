import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, submitResponses } from "../../Services/api";
import UserLayout from "../../components/UserLayout/UserLayout";
import Button from "../../components/Button/Button";

const PlayQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(id);
        setQuiz(data);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId, choiceId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    return quiz.questions.reduce((score, question) => {
      const correctChoice = question.choices.find(
        (choice) => choice.is_correct
      );
      return answers[question.id] === correctChoice?.id ? score + 1 : score;
    }, 0);
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    try {
      await submitResponses({ quizId: id, answers, score });
      navigate(`/quiz-result/${id}`);
    } catch (error) {
      console.error("Failed to submit responses", error);
    }
  };

  if (loading) {
    return <div className="text-primaryText">Loading...</div>;
  }

  if (!quiz) {
    return <div className="text-error">Quiz not found</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <UserLayout>
      <div className="bg-light-accent p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="mb-4">
          <h1 className="font-bold text-3xl text-primary mb-2">{quiz.title}</h1>
          <p className="text-primaryText mb-2 py-4">{quiz.description}</p>
          <div className="h-2 rounded-full bg-gray-300">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-primaryText mt-2">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-inner mb-6">
          <p className="text-lg font-medium text-primaryText mb-4">
            {currentQuestion.text}
          </p>
          <ul className="space-y-3">
            {currentQuestion.choices.map((choice) => (
              <li key={choice.id}>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={choice.id}
                    checked={answers[currentQuestion.id] === choice.id}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.id, choice.id)
                    }
                    className="form-radio h-5 w-5 text-primary border-secondary"
                  />
                  <span className="text-primaryText">{choice.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <Button
            text="Previous"
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
            }
            className={`p-2 border-secondary rounded-lg shadow-sm transition-all duration-200 ${
              currentQuestionIndex === 0
                ? "btn bg-gray-300 text-neutral m-2 w-40 h-12 cursor-not-allowed"
                : "btn bg-white text-secondary border-secondary m-2 w-40 h-12 hover:bg-secondary hover:text-white"
            }`}
            disabled={currentQuestionIndex === 0}
          />

          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button
              text="Next"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="btn bg-white text-primary border-primary m-2 w-40 h-12 hover:bg-primary hover:text-white"
            />
          ) : (
            <Button
              text="Submit"
              type="button"
              onClick={handleSubmit}
              className="btn bg-white text-primary border-primary m-2 w-40 h-12 hover:bg-primary hover:text-white"
            />
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default PlayQuizPage;

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getQuizById, submitResponses } from "../../Services/api";
// import UserLayout from "../../components/UserLayout/UserLayout";
// import Button from "../../components/Button/Button";

// const PlayQuizPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const data = await getQuizById(id);
//         setQuiz(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   const handleAnswerChange = (questionId, choiceId) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: choiceId,
//     }));
//   };

//   const calculateScore = () => {
//     if (!quiz) return 0;
//     return quiz.questions.reduce((score, question) => {
//       const correctChoice = question.choices.find(
//         (choice) => choice.is_correct
//       );
//       return answers[question.id] === correctChoice?.id ? score + 1 : score;
//     }, 0);
//   };

//   const handleSubmit = async () => {
//     const score = calculateScore();
//     try {
//       await submitResponses({ quizId: id, answers, score });
//       navigate("/quiz/${id}/result");
//     } catch (error) {
//       console.error("Failed to submit responses", error);
//     }
//   };

//   if (loading) {
//     return <div className="text-primaryText">Loading...</div>;
//   }

//   if (!quiz) {
//     return <div className="text-error">Quiz not found</div>;
//   }

//   const currentQuestion = quiz.questions[currentQuestionIndex];
//   const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

//   return (
//     <UserLayout>
//       <div className="bg-light-accent p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
//         <div className="mb-4">
//           <h1 className="font-bold text-3xl text-primary mb-2">{quiz.title}</h1>
//           <p className="text-primaryText mb-2 py-4">{quiz.description}</p>
//           <div className="h-2 rounded-full bg-gray-300">
//             <div
//               className="h-full rounded-full bg-primary transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="text-sm text-primaryText mt-2">
//             Question {currentQuestionIndex + 1} of {quiz.questions.length}
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded-lg shadow-inner mb-6">
//           <p className="text-lg font-medium text-primaryText mb-4">
//             {currentQuestion.text}
//           </p>
//           <ul className="space-y-3">
//             {currentQuestion.choices.map((choice) => (
//               <li key={choice.id}>
//                 <label className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     name={`question-${currentQuestion.id}`}
//                     value={choice.id}
//                     checked={answers[currentQuestion.id] === choice.id}
//                     onChange={() =>
//                       handleAnswerChange(currentQuestion.id, choice.id)
//                     }
//                     className="form-radio h-5 w-5 text-primary border-secondary"
//                   />
//                   <span className="text-primaryText">{choice.text}</span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex justify-between items-center">
//           <Button
//             text="Previous"
//             onClick={() =>
//               setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
//             }
//             className={`p-2 border-secondary rounded-lg shadow-sm transition-all duration-200 ${
//               currentQuestionIndex === 0
//                 ? "bg-gray-300 text-neutral cursor-not-allowed"
//                 : "bg-base-100 text-secondary hover:bg-[#e9c46a] hover:text-[#f4f4f9] hover:border-secondary"
//             }`}
//             disabled={currentQuestionIndex === 0}
//           />

//           {currentQuestionIndex < quiz.questions.length - 1 ? (
//             <Button
//               text="Next"
//               onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
//               className="bg-base-100 text-[#2A9D8F] hover:bg-[#2A9D8F] hover:text-[#f4f4f9] p-2 rounded-lg shadow-sm transition-all duration-200"
//             />
//           ) : (
//             <Button
//               text="Submit"
//               type="button"
//               onClick={handleSubmit}
//               className="bg-base-100 text-[#2A9D8F] border-primary p-2 rounded-lg shadow-sm hover:bg-[#2A9D8F] hover:text-[#f4f4f9] transition-all duration-200"
//             />
//           )}
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default PlayQuizPage;
