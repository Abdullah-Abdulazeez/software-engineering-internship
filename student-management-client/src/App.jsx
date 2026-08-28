import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
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

  // New Course Input State
  const [newCourse, setNewCourse] = useState({ courseCode: '', courseName: '', creditUnit: 3 });

  const notify = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 4000);
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
      setError(err.message || 'Unable to connect to backend server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Student Actions
  const handleStudentSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        notify(`Updated ${formData.firstName} successfully!`);
        setEditingStudent(null);
      } else {
        await createStudent(formData);
        notify(`Registered ${formData.firstName} successfully!`);
      }
      await loadData();
    } catch (err) {
      notify(err.message, true);
      throw err;
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      await deleteStudent(id);
      notify(`Deleted ${name}.`);
      await loadData();
    } catch (err) {
      notify(err.message, true);
    }
  };

  // Course Actions
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!newCourse.courseCode || !newCourse.courseName) return;
    try {
      await createCourse(newCourse);
      notify(`Added course ${newCourse.courseCode}!`);
      setNewCourse({ courseCode: '', courseName: '', creditUnit: 3 });
      await loadData();
    } catch (err) {
      notify(err.message, true);
    }
  };

  const handleDeleteCourse = async (id, code) => {
    if (!window.confirm(`Delete course ${code}?`)) return;
    try {
      await deleteCourse(id);
      notify(`Deleted course ${code}.`);
      await loadData();
    } catch (err) {
      notify(err.message, true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Floating Alert Banner */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold transition-all ${
            notification.isError ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
          }`}
        >
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
                onEdit={(s) => {
                  setEditingStudent(s);
                  setActiveTab('Students');
                }}
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
              onEdit={(s) => {
                setEditingStudent(s);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDelete={handleDeleteStudent}
            />
          </div>
        )}

        {activeTab === 'Courses' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Course</h3>
              <form onSubmit={handleCourseSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Course Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. CSC301"
                    value={newCourse.courseCode}
                    onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Course Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Operating Systems"
                    value={newCourse.courseName}
                    onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow cursor-pointer transition"
                >
                  Add Course
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">{course.courseCode}</h4>
                    <p className="text-xs text-slate-500">{course.courseName}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCourse(course.id, course.courseCode)}
                    className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-md cursor-pointer transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'About' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">Student Management System Web 1.0</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Full-stack system integrating React, Tailwind CSS, Express, and MySQL built for the NIIT SE Internship.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}