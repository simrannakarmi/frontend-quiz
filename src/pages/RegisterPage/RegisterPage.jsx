import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleToggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleConfirmVisibility = () => {
    setIsConfirmVisible((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/account/register/",
        {
          username,
          email,
          password,
          confirmPassword,
        }
      );
      setMessage(response.data.response);
      localStorage.setItem("token", response.token);
      navigate("/login");
    } catch (error) {
      console.error("Error registering in", error);
    }
  };

  return (
    <Layout>
      <div className="h-full bg-base-100 flex justify-center items-center">
        <div className="bg-accent flex flex-col justify-center items-center space-y-8 w-2/5 h-auto py-6">
          <h1 className="text-4xl ">Sign Up</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col justify-center items-center">
              <label className="form-control w-96 max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Username</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label className="form-control w-96 max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Email</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-96 max-w-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="form-control w-96 max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">Password</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="input input-bordered w-full max-w-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-neutral"
                    onClick={handleToggleVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-neutral">
                    Confirm Password
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={isConfirmVisible ? "text" : "password"}
                    id="confirmPassword"
                    className="input input-bordered w-full max-w-xs"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-neutral"
                    onClick={handleConfirmVisibility}
                  >
                    {isConfirmVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </label>
            </div>
            <Button text="Sign Up" type="submit" />
          </form>
          <div>
            <p>
              Already have an account?
              <Link to="/login" className="text-primary font-bold">
                {" "}
                Log in here
              </Link>
            </p>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
