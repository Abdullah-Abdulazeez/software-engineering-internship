import StudentCard from './StudentCard';

export default function StudentList({ students, searchTerm, onSearchChange }) {
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.firstName.toLowerCase().includes(term) ||
      s.lastName.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term)
    );
  });

  return (
    <section id="students" className="my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Student Directory</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300 text-slate-500">
          No students match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </section>
  );
}