package Week2;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n=== STUDENT RESULT SYSTEM ===");
            System.out.println("1. Add New Student Record & Courses");
            System.out.println("2. Display All Students & Calculated GPAs");
            System.out.println("3. Search Student by ID");
            System.out.println("4. Update Student Details");
            System.out.println("5. Delete Student Record");
            System.out.println("6. Exit");
            System.out.print("Choose an option (1-6): ");

            String choice = scanner.nextLine().trim();

            switch (choice) {
                case "1": addStudent(); break;
                case "2": displayAll(); break;
                case "3": searchStudent(); break;
                case "4": updateStudent(); break;
                case "5": deleteStudent(); break;
                case "6":
                    System.out.println("Exiting system. Goodbye!");
                    return;
                default:
                    System.out.println(" Invalid choice. Please select 1-6.");
            }
        }
    }

    private static void addStudent() {
        try {
            System.out.print("Enter Student ID: ");
            int id = Integer.parseInt(scanner.nextLine().trim());
            System.out.print("Enter Student Name: ");
            String name = scanner.nextLine().trim();
            System.out.print("Enter Department: ");
            String dept = scanner.nextLine().trim();

            Student student = new Student(id, name, dept);

            System.out.print("How many courses to register? ");
            int numCourses = Integer.parseInt(scanner.nextLine().trim());

            for (int i = 1; i <= numCourses; i++) {
                System.out.println("\n--- Course " + i + " ---");
                System.out.print("Enter Course Code (e.g., CS101): ");
                String code = scanner.nextLine().trim();
                System.out.print("Enter Score (0-100): ");
                double score = Double.parseDouble(scanner.nextLine().trim());
                System.out.print("Enter Credit Units: ");
                int units = Integer.parseInt(scanner.nextLine().trim());

                student.addCourse(new Course(code, score, units));
            }

            FileManager.saveStudent(student);
        } catch (NumberFormatException e) {
            System.out.println(" Error: Invalid number entered.");
        }
    }

    private static void displayAll() {
        List<Student> students = FileManager.loadAllStudents();
        if (students.isEmpty()) {
            System.out.println("No records found in CSV file.");
            return;
        }

        System.out.println("\n--- ALL RECORDED STUDENTS ---");
        for (Student s : students) {
            double gpa = ResultProcessor.calculateGPA(s);
            System.out.printf("ID: %d | Name: %s | Dept: %s | Courses Registered: %d | GPA: %.2f\n",
                    s.getStudentId(), s.getName(), s.getDepartment(), s.getCourses().size(), gpa);
        }
    }

    private static void searchStudent() {
        try {
            System.out.print("Enter Student ID to Search: ");
            int id = Integer.parseInt(scanner.nextLine().trim());
            Student s = FileManager.searchStudent(id);

            if (s != null) {
                double gpa = ResultProcessor.calculateGPA(s);
                System.out.println("\n--- STUDENT FOUND ---");
                System.out.printf("ID: %d | Name: %s | Dept: %s | GPA: %.2f\n",
                        s.getStudentId(), s.getName(), s.getDepartment(), gpa);
                System.out.println("Registered Courses:");
                for (Course c : s.getCourses()) {
                    System.out.println(" - " + c.getCourseCode() + ": Score " + c.getScore() + " (" + c.getCreditUnits() + " units)");
                }
            } else {
                System.out.println(" Student not found with ID " + id);
            }
        } catch (NumberFormatException e) {
            System.out.println(" Error: Invalid ID format.");
        }
    }

    private static void updateStudent() {
        try {
            System.out.print("Enter Student ID to Update: ");
            int id = Integer.parseInt(scanner.nextLine().trim());
            Student s = FileManager.searchStudent(id);

            if (s == null) {
                System.out.println(" Student not found.");
                return;
            }

            System.out.print("Enter New Name: ");
            s.setName(scanner.nextLine().trim());
            System.out.print("Enter New Department: ");
            s.setDepartment(scanner.nextLine().trim());

            if (FileManager.updateStudent(s)) {
                System.out.println(" Student record updated successfully!");
            }
        } catch (NumberFormatException e) {
            System.out.println(" Error: Invalid input.");
        }
    }

    private static void deleteStudent() {
        try {
            System.out.print("Enter Student ID to Delete: ");
            int id = Integer.parseInt(scanner.nextLine().trim());
            if (FileManager.deleteStudent(id)) {
                System.out.println(" Record deleted successfully!");
            } else {
                System.out.println(" Student not found.");
            }
        } catch (NumberFormatException e) {
            System.out.println(" Error: Invalid ID.");
        }
    }
}