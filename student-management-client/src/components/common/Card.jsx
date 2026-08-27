export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition ${className}`}>
      {children}
    </div>
  );
}