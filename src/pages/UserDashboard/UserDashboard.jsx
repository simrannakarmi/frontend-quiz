// import Button from '../../components/Button/Button'
// import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import { getQuizzes } from "../../Services/api";
import AuthContext from "../../context/AuthContext";
import UserLayout from "../../components/UserLayout/UserLayout";
import QuizList from "../../components/QuizList/QuizList";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    // const fetchUser = async () => {
    //   try {
    //     const currentUser = await getCurrentUser();
    //     setUser(currentUser);
    //   } catch {
    //     console.error("Failed to fetch user", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchUser();
    fetchQuizzes();
  }, []);

  const handleClick = () => {
    navigate("/create-quiz");
  };

  return (
    <UserLayout>
      <div className="flex flex-col h-full items-center gap-4">
        {user && <h1 className="text-center py-10">Welcome {user.username}</h1>}
        <QuizList />
        <Button text="Generate Quiz" onClick={handleClick} />
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
