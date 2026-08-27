export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">{label}</label>}
      <input
        className={`w-full border rounded-lg px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}