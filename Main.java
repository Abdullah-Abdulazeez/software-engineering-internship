public class Main {
    public static void main(String[] args) {
        // 1. Create Courses
        Course cs101 = new Course("CS101", "Introduction to Java", 3);
        Course cs102 = new Course("CS102", "Data Structures", 4);

        // 2. Create Lecturer
        Lecturer lecturer = new Lecturer(501, "Dr. Alan Turing", "Computer Science");

        // 3. Create Student
        Student student = new Student(1001, "Alex Morgan", "Computer Science", 200);

        // 4. Demonstrate Methods & Interactions
        System.out.println("=== COURSE & LECTURER DETAILS ===");
        cs101.displayCourseInfo();
        lecturer.displayLecturerDetails();
        lecturer.teachCourse(cs101);

        System.out.println("\n=== ADDING GRADES FOR STUDENT ===");
        // Alex gets an A (4.0) in CS101 (3 units) and a B (3.0) in CS102 (4 units)
        student.addCourseGrade(4.0, cs101.getCreditUnits());
        student.addCourseGrade(3.0, cs102.getCreditUnits());

        System.out.println("\n=== STUDENT PROFILE ===");
        student.displayStudentProfile();
    }
}