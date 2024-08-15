import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getQuizzes, getQuestions, getResponses, getUserList } from "../../Services/api";
import AuthContext from "../../context/AuthContext";
import AdminLayout from "../../components/AdminLayout/AdminLayout";

const AdminDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [userList, setUserList] = useState([]);
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

    const fetchQuestions = async () => {
      try {
        const dataQues = await getQuestions();
        setQuestions(dataQues);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch questions");
      }
    };

    const fetchResponses = async () => {
      try {
        const dataResponses = await getResponses();
        setResponses(dataResponses);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch responses");
      }
    }

    const fetchUserList = async () => {
      try {
        const userList = await getUserList();
        setUserList(userList);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch user list");
      }
    }

    fetchQuizzes();
    fetchQuestions();
    fetchResponses();
    fetchUserList();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col h-full items-center gap-10">
        {user && <h1 className="text-center py-10">Welcome {user.username}</h1>}
        <div className="bg-accent w-4/5 h-3/5 flex flex-col items-center rounded-lg">
          <h2 className="font-bold text-2xl py-10">Dashboard Summary</h2>
          <div className="flex justify-center items-center bg-green-50 w-4/5 h-2/3 px-10 py-4 border border-gray-300">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="border-2 inline-block text-base text-primaryText">
                  <tr>
                    <th colSpan="3">Total Quizzes</th>
                  </tr>
                  <tr>
                    <th colSpan="3">Total Questions</th>
                  </tr>
                  <tr>
                    <th colSpan="3">Total Responses</th>
                  </tr>
                  <tr>
                    <th colSpan="3">Total Users</th>
                  </tr>
                </thead>
                <tbody className="border-2 inline-block px-6 text-base text-primaryText font-medium">
                  <tr>
                    <td>{ quizzes.length }</td>
                  </tr>
                  <tr className="hover">
                    <td>{ questions.length }</td>
                  </tr>
                  <tr>
                    <td>{ responses.length }</td>
                  </tr>
                  <tr>
                    <td>{ userList.length }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
