export default function Dashboard({ totalStudents, totalCourses }) {
  return (
    <section id="dashboard" className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
        <h3 className="text-sm font-semibold uppercase tracking-wider">Total Students</h3>
        <p className="text-4xl font-extrabold mt-2">{totalStudents}</p>
      </div>
      <div className="bg-emerald-600 text-white p-6 rounded-xl shadow">
        <h3 className="text-sm font-semibold uppercase tracking-wider">Active Courses</h3>
        <p className="text-4xl font-extrabold mt-2">{totalCourses}</p>
      </div>
    </section>
  );
}