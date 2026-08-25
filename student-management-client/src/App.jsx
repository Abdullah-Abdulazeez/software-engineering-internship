import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import { fetchAllStudents } from './services/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllStudents();
      setStudents(data);
    } catch (err) {
      console.error('API Error:', err);
      setError('Unable to connect to the backend server. Make sure your Express REST API is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
        <Dashboard 
          totalStudents={students.length} 
          totalCourses={0} 
        />
        <StudentList
          students={students}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRetry={loadStudents}
        />
      </main>
      <Footer />
    </div>
  );
}