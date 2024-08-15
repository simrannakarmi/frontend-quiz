import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/Button/Button";

import Layout from "../../components/Layout/Layout";
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");


  const handleToggleVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(credentials);
    } catch (error) {
      console.error('Failed to log in', error);
      setMessage("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <Layout>
      <div className="h-full bg-base-100 flex justify-center items-center">
        <div className="bg-accent flex flex-col justify-center items-center space-y-14 w-2/5 h-4/5">
          <h1 className="text-4xl ">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-10"
          >
            <div className="flex flex-col items-center">
              <label className="form-control w-96 max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Username</span>
                </div>
                <input
                  type="text"
                  name="username"
                  className="input input-bordered w-full max-w-xs"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Password</span>
                </div>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    className="input input-bordered w-full max-w-xs"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-neutral"
                    onClick={handleToggleVisibility}
                  >
                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </label>
            </div>
            <Button text="Login" type="submit" />
          </form>
          <div>
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-primary font-bold">
                Register here
              </Link>
            </p>
          </div>
          {message && <p className="text-error">{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
