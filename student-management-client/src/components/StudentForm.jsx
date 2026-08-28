import { useState, useEffect } from 'react';

const INITIAL_FORM = { firstName: '', lastName: '', email: '', phone: '' };

export default function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || '',
        lastName: editingStudent.lastName || '',
        email: editingStudent.email || '',
        phone: editingStudent.phone || '',
      });
      setErrors({});
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [editingStudent]);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email syntax';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(formData);
      if (!editingStudent) {
        setFormData(INITIAL_FORM);
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      // Guarantees button is unlocked
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-bold text-slate-900">
          {editingStudent ? `Edit Student (ID #${editingStudent.id})` : 'Register New Student'}
        </h3>
        {editingStudent && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Ahmed"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Bello"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ahmed.bello@example.com"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone Number</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="08012345678"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
          {editingStudent && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Saving...' : editingStudent ? 'Update Student' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
}