import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import {
  fetchAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  fetchAllCourses,
  createCourse,
  deleteCourse,
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState(null);

  // Auth State
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ courseCode: '', courseName: '', creditUnit: 3 });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const notify = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    notify('Logged out successfully');
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sData, cData] = await Promise.all([
        fetchAllStudents().catch(() => []),
        fetchAllCourses().catch(() => []),
      ]);
      setStudents(sData);
      setCourses(cData);
    } catch (err) {
      setError(err.message || 'Unable to load data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, user]);

  const handleStudentSubmit = async (formData) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        notify(`Updated ${formData.firstName}!`);
        setEditingStudent(null);
      } else {
        await createStudent(formData);
        notify(`Registered ${formData.firstName}!`);
      }
      await loadData();
    } catch (err) {
      notify(err.message, true);
      throw err;
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (user.role !== 'ADMIN') {
      notify('Forbidden: Only ADMINs can delete students.', true);
      return;
    }
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      await deleteStudent(id);
      notify(`Deleted ${name}.`);
      await loadData();
    } catch (err) {
      notify(err.message, true);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    try {
      await createCourse(newCourse);
      notify(`Added course ${newCourse.courseCode}!`);
      setNewCourse({ courseCode: '', courseName: '', creditUnit: 3 });
      await loadData();
    } catch (err) {
      notify(err.message, true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Top Session Bar */}
      <div className="bg-slate-800 text-slate-300 px-6 py-2 text-xs flex justify-between items-center">
        <span>
          {user ? (
            <>Signed in as <strong className="text-white">{user.name}</strong> ({user.role})</>
          ) : (
            'Viewing as Guest (Read-Only)'
          )}
        </span>
        {user ? (
          <button onClick={handleLogout} className="text-red-400 hover:underline">Log Out</button>
        ) : (
          <button onClick={() => setShowAuthModal(true)} className="text-blue-400 hover:underline font-semibold">
            Sign In / Register
          </button>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={(u) => { setUser(u); notify(`Welcome back, ${u.name}!`); }}
      />

      {notification && (
        <div className={`fixed top-12 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold ${
          notification.isError ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
        {activeTab === 'Dashboard' && (
          <div>
            <h2 className="text-2xl font-black mb-2">Overview</h2>
            <Dashboard totalStudents={students.length} totalCourses={courses.length} />
            <div className="mt-8">
              <StudentList
                students={students.slice(0, 6)}
                loading={loading}
                error={error}
                searchTerm=""
                onSearchChange={() => {}}
                onRetry={loadData}
                onEdit={(s) => { setEditingStudent(s); setActiveTab('Students'); }}
                onDelete={handleDeleteStudent}
              />
            </div>
          </div>
        )}

        {activeTab === 'Students' && (
          <div>
            <StudentForm
              onSubmit={handleStudentSubmit}
              editingStudent={editingStudent}
              onCancelEdit={() => setEditingStudent(null)}
            />
            <StudentList
              students={students}
              loading={loading}
              error={error}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRetry={loadData}
              onEdit={(s) => { setEditingStudent(s); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onDelete={handleDeleteStudent}
            />
          </div>
        )}

        {activeTab === 'Courses' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Course</h3>
              <form onSubmit={handleCourseSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <input
                  type="text"
                  placeholder="Course Code"
                  value={newCourse.courseCode}
                  onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newCourse.courseName}
                  onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold">
                  Add Course
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'About' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">Student Management System Web 1.0</h3>
            <p className="text-sm text-slate-600 mt-2">
              Full-stack system deployed with React on Netlify, Express on Render, and MySQL on Aiven Cloud.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}