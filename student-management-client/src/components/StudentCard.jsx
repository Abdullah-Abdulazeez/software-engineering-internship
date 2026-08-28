export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h4 className="text-base font-bold text-slate-900">
            {student.firstName} {student.lastName}
          </h4>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-mono">
            #{student.id}
          </span>
        </div>
        <div className="mt-3 text-sm text-slate-600 space-y-1">
          <p className="truncate"><strong className="text-slate-700 font-medium">Email:</strong> {student.email}</p>
          <p><strong className="text-slate-700 font-medium">Phone:</strong> {student.phone || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end gap-2">
        <button
          onClick={() => onEdit(student)}
          className="px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md cursor-pointer transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student.id, `${student.firstName} ${student.lastName}`)}
          className="px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-md cursor-pointer transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}