import { useEffect, useState } from "react";
import { getQuizzes } from "../../Services/api";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout/AdminLayout";

const QuizListPage = () => {
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
    <AdminLayout>
      <div className="flex justify-center items-center h-full">
        {error && <p>{error}</p>}

        <div className="bg-accent w-4/5 h-3/5 flex flex-col items-center rounded-lg">
          <h2 className="font-bold text-2xl py-10">Available Quizzes</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-10 py-4 border">
              <thead className="text-xs text-gray-700 uppercase bg-primary border-gray-300 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Quiz Names
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Questions
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Updated At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr
                    key={quiz.id}
                    className="border-b bg-green-50 dark:border-gray-300 hover:bg-gray-50 dark:hover:bg-accent"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-primaryText"
                    >
                      {quiz.title}
                    </th>
                    <td className="px-6 py-4">{quiz.question}</td>
                    <td className="px-6 py-4">{quiz.created_at}</td>
                    <td className="px-6 py-4">{quiz.updated_at}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/quizzes/${quiz.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizListPage;
