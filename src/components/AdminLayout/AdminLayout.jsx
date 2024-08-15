import UserNavbar from "../Navbar/UserNavbar";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <UserNavbar />
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
