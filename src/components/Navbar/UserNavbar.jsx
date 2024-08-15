import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import userProfile from "../../assets/profile-user.png";

const UserNavbar = () => {
  const { user, loading, logout, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return <nav>Loading...</nav>;
  }

  const handleLogoClick = () => {
    if (isAuthenticated) {
      if (user.is_staff) {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <span
          className="app-logo text-white cursor-pointer"
          onClick={handleLogoClick}
        >
          QuiziA
        </span>
      </div>
      <div>
        <span className="text-base text-base-100 px-2">@{user.username}</span>
        <div className="flex-none gap-2 px-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-20 rounded-full">
                <img src={userProfile} className="w-8 opacity-60" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
