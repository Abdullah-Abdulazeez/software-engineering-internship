import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import Footer from './components/Footer';

// Sample mock data for Day 1
const INITIAL_STUDENTS = [
  { id: 1, firstName: 'Ahmed', lastName: 'Bello', email: 'ahmed.bello@example.com', phone: '08012345678' },
  { id: 2, firstName: 'Sarah', lastName: 'Musa', email: 'sarah.musa@example.com', phone: '08087654321' },
  { id: 3, firstName: 'Fatima', lastName: 'Aliyu', email: 'fatima.aliyu@example.com', phone: '08099887766' }
];

export default function App() {
  const [students] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
        <Dashboard totalStudents={students.length} totalCourses={4} />
        <StudentList
          students={students}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </main>
      <Footer />
    </div>
  );
}