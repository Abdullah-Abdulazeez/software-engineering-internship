export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">Student Management System</h1>
      <div className="flex gap-4 text-sm font-medium">
        <a href="#dashboard" className="hover:text-blue-400 transition-colors">Dashboard</a>
        <a href="#students" className="hover:text-blue-400 transition-colors">Students</a>
      </div>
    </nav>
  );
}