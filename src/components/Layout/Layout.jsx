import Navbar from "../Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-screen">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
