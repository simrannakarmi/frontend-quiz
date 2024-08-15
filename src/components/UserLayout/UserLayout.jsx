import UserNavbar from "../Navbar/UserNavbar";
import Sidebar from "../Sidebar/Sidebar";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <UserNavbar />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
