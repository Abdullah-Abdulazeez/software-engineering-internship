import Card from './common/Card';

export default function Dashboard({ totalStudents, totalCourses, totalEnrollments }) {
  return (
    <section className="my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-100">Total Students</h3>
          <p className="text-4xl font-extrabold mt-2">{totalStudents}</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-none">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Total Courses</h3>
          <p className="text-4xl font-extrabold mt-2">{totalCourses}</p>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none sm:col-span-2 lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-100">Total Enrollments</h3>
          <p className="text-4xl font-extrabold mt-2">{totalEnrollments}</p>
        </Card>
      </div>
    </section>
  );
}