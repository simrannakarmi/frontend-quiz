import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link to="/" className="app-logo text-white">
          QuiziA
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
