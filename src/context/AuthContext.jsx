import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, login as apiLogin, logoutUser } from "../Services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await apiLogin(credentials);
      setUser(userData);
      localStorage.setItem("token", userData.token);
      setIsAuthenticated(true);
      if (userData.is_staff) {
        console.log("is staff");
        navigate('/admin-dashboard');
      } else {
        console.log(userData.is_staff);
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error("Failed to log in", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
