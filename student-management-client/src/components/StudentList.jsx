import StudentCard from './StudentCard';

export default function StudentList({ 
  students, 
  loading, 
  error, 
  searchTerm, 
  onSearchChange,
  onRetry 
}) {
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.firstName?.toLowerCase().includes(term) ||
      s.lastName?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term)
    );
  });

  return (
    <section id="students" className="my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Directory</h2>
          <p className="text-sm text-slate-500">Live data synchronized with MySQL database</p>
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={loading || error !== null}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        />
      </div>

      {/* 1. LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading students from database...</p>
        </div>
      )}

      {/* 2. ERROR STATE */}
      {!loading && error && (
        <div className="text-center py-12 px-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="text-red-600 text-3xl font-bold mb-2">⚠️</div>
          <h3 className="text-lg font-bold text-red-800">Connection Error</h3>
          <p className="text-sm text-red-600 mt-1 max-w-md mx-auto">{error}</p>
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition shadow"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 3. EMPTY STATE (Database has zero records) */}
      {!loading && !error && students.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-base">No students found in the database.</p>
          <p className="text-xs text-slate-400 mt-1">Register a student to populate the directory.</p>
        </div>
      )}

      {/* 4. SEARCH FILTER EMPTY STATE */}
      {!loading && !error && students.length > 0 && filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">
          No students match &ldquo;<strong>{searchTerm}</strong>&rdquo;.
        </div>
      )}

      {/* 5. SUCCESS POPULATED STATE */}
      {!loading && !error && filteredStudents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </section>
  );
}