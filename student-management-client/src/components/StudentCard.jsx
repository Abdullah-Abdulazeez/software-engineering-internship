export default function StudentCard({ student }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-bold text-slate-800">
          {student.firstName} {student.lastName}
        </h4>
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
          ID: #{student.id}
        </span>
      </div>
      <div className="mt-3 text-sm text-slate-600 space-y-1">
        <p><strong className="text-slate-700">Email:</strong> {student.email}</p>
        <p><strong className="text-slate-700">Phone:</strong> {student.phone || 'N/A'}</p>
      </div>
    </div>
  );
}