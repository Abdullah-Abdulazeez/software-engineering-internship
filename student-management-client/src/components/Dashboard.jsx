export default function Dashboard({ totalStudents, totalCourses }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-100">Total Enrolled Students</h3>
        <p className="text-4xl font-black mt-2">{totalStudents}</p>
      </div>
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-100">Registered Courses</h3>
        <p className="text-4xl font-black mt-2">{totalCourses}</p>
      </div>
    </section>
  );
}