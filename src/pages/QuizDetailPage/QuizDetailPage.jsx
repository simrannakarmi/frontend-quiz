import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuiz } from '../../Services/api';
import AdminLayout from "../../components/AdminLayout/AdminLayout";

const QuizDetailPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await getQuiz(id);
                setQuiz(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

  return (
    <AdminLayout>
        <h1>Quiz Detail</h1>
        <p>ID: {quiz.id}</p>
        <p>Title: {quiz.title}</p>
        <p>Description: {quiz.description}</p>
        <p>Created At: {quiz.created_at}</p>
        <p>Updated At: {quiz.updated_at}</p>
        <p>Total Questions: {quiz.questions.length}</p>
        
        {/* <p>Average Score: {quiz.attempts.length > 0? (quiz.attempts.reduce((acc, attempt) => acc + attempt.score, 0) / quiz.attempts.length).toFixed(2) : 0} */}
      <div className="flex justify-center items-center h-full">
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
      </div>
    </AdminLayout>
  );
};

export default QuizDetailPage;
