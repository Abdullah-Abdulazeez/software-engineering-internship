import StudentCard from './StudentCard';

export default function StudentList({
  students,
  loading,
  error,
  searchTerm,
  onSearchChange,
  onRetry,
  onEdit,
  onDelete,
}) {
  const filtered = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      (s.id && s.id.toString().includes(term)) ||
      (s.firstName && s.firstName.toLowerCase().includes(term)) ||
      (s.lastName && s.lastName.toLowerCase().includes(term)) ||
      (s.email && s.email.toLowerCase().includes(term))
    );
  });

  return (
    <section className="my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Student Directory</h3>
          <p className="text-xs text-slate-500">Live database records</p>
        </div>
        <input
          type="text"
          placeholder="Search by ID, name, or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={loading || !!error}
          className="border border-slate-300 rounded-lg px-3.5 py-2 text-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200">
          <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-slate-600">Connecting to database...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-10 px-6 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-red-700 font-semibold mb-2">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition"
          >
            Retry Connection
          </button>
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500 text-sm">
          No students registered in the database yet.
        </div>
      )}

      {!loading && !error && students.length > 0 && filtered.length === 0 && (
        <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          No records match &ldquo;<strong>{searchTerm}</strong>&rdquo;.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}