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
  deleteStudent 
} from './services/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllStudents();
      setStudents(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Unable to connect to the backend server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // CREATE or UPDATE Handler
  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        showNotification(`Student ${formData.firstName} updated successfully!`);
        setEditingStudent(null);
      } else {
        await createStudent(formData);
        showNotification(`Student ${formData.firstName} registered successfully!`);
      }
      await loadStudents();
    } catch (err) {
      showNotification(err.message || 'Operation failed', 'error');
    }
  };

  // DELETE Handler with confirmation
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmed) return;

    try {
      await deleteStudent(id);
      showNotification(`Student ${name} deleted.`);
      await loadStudents();
    } catch (err) {
      showNotification(err.message || 'Delete operation failed', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Floating Notification Banner */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all ${
            notification.type === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
        <Dashboard 
          totalStudents={students.length} 
          totalCourses={0} 
        />

        <StudentForm
          onSubmit={handleFormSubmit}
          editingStudent={editingStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />

        <StudentList
          students={students}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRetry={loadStudents}
          onEdit={(student) => {
            setEditingStudent(student);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDelete={handleDelete}
        />
      </main>

      <Footer />
    </div>
  );
}