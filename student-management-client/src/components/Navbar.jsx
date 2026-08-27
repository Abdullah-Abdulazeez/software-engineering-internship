import { useState } from 'react';

export default function Navbar({ activeTab, onTabChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Dashboard', 'Students', 'Courses', 'Enrollments', 'About'];

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Student Management System</h1>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-1"
        >
          <span className="text-2xl">&#9776;</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => onTabChange(link)}
              className={`transition-colors cursor-pointer ${
                activeTab === link ? 'text-blue-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 border-t border-slate-800 flex flex-col gap-3">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => {
                onTabChange(link);
                setMenuOpen(false);
              }}
              className={`text-left text-sm py-1 ${
                activeTab === link ? 'text-blue-400 font-bold' : 'text-slate-300'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}