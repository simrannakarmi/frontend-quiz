// import Button from '../../components/Button/Button'
// import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import { getQuizzes } from "../../Services/api";
import AuthContext from "../../context/AuthContext";
import UserLayout from "../../components/UserLayout/UserLayout";

const UserDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    fetchQuizzes();
  }, []);

  return (
    <UserLayout>
      <div className="flex flex-col h-full items-center gap-10">
        {user && 
        <h1 className="text-center py-10">Welcome {user.username}</h1>}
        <div className="bg-accent w-4/5 h-3/5 flex flex-col items-center rounded-lg">
          <h2 className="font-bold text-2xl py-10">Available Quizzes</h2>
          <div className="bg-green-50 w-4/5 px-10 py-4 border border-gray-300">
            <h2 className="font-bold text-lg py-4">Quiz Names</h2>
            {error && <p>{error}</p>}
            <ul className="flex flex-col gap-4">
              {quizzes.map((quiz) => (
                <li key={quiz.id}>{quiz.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
