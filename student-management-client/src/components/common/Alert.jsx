export default function Alert({ type = 'info', message, onClose }) {
  if (!message) return null;
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
  };

  return (
    <div className={`p-4 rounded-lg border text-sm flex justify-between items-center ${styles[type]}`}>
      <span>{message}</span>
      {onClose && <button onClick={onClose} className="font-bold ml-4">&times;</button>}
    </div>
  );
}