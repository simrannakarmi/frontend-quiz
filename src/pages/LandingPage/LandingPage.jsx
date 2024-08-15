import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Layout>
      <div className="hero bg-base-100 h-full">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-neutral">
              Welcome to QuiziA
            </h1>
            <p className="py-6 text-neutral">Test your brain</p>
            <Button text="Login" onClick={handleLogin} />
            <Button text="Register" onClick={handleRegister} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
