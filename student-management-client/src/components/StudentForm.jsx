import { useState, useEffect } from 'react';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export default function StudentForm({ onSubmit, editingStudent, onCancelEdit }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || '',
        lastName: editingStudent.lastName || '',
        email: editingStudent.email || '',
        phone: editingStudent.phone || '',
      });
      setFormErrors({});
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [editingStudent]);

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (formData.phone && formData.phone.trim().length < 8) {
      errors.phone = 'Phone number must be at least 8 digits';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">
          {editingStudent ? `Edit Student (ID: #${editingStudent.id})` : 'Register New Student'}
        </h3>
        {editingStudent && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ahmed"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              formErrors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {formErrors.firstName && (
            <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Bello"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              formErrors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {formErrors.lastName && (
            <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ahmed.bello@example.com"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {formErrors.email && (
            <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="08012345678"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              formErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
            }`}
          />
          {formErrors.phone && (
            <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
          {editingStudent && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition shadow disabled:bg-blue-400"
          >
            {submitting ? 'Saving...' : editingStudent ? 'Update Student' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
}