export default function Navbar({ activeTab, onTabChange }) {
  const tabs = ['Dashboard', 'Students', 'Courses', 'About'];

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight">Student Management System</h1>
        <div className="flex gap-2 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}