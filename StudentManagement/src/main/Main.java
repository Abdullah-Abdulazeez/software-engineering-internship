package StudentManagement.src.main;

import StudentManagement.src.model.Student;
import StudentManagement.src.service.StudentService;
import StudentManagement.src.util.InputValidator;

import java.util.List;
import java.util.Scanner;

/**
 * Entry point for running the Student Management Console Application.
 */
public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final StudentService studentService = new StudentService();

    public static void main(String[] args) {
        while (true) {
            displayMenu();
            int choice = InputValidator.readInt(scanner, "Select an option (1-8): ");

            switch (choice) {
                case 1: registerStudent(); break;
                case 2: viewAllStudents(); break;
                case 3: searchStudent(); break;
                case 4: editStudent(); break;
                case 5: deleteStudent(); break;
                case 6: saveRecords(); break;
                case 7: loadRecords(); break;
                case 8:
                    System.out.println("Exiting Student Management Application. Goodbye!");
                    return;
                default:
                    System.out.println("[Error] Please choose a number between 1 and 8.");
            }
        }
    }

    private static void displayMenu() {
        System.out.println("\n=============================================");
        System.out.println("      STUDENT MANAGEMENT CONSOLE SYSTEM");
        System.out.println("=============================================");
        System.out.println("1. Register Student");
        System.out.println("2. View All Students");
        System.out.println("3. Search Student");
        System.out.println("4. Edit Student Information");
        System.out.println("5. Delete Student");
        System.out.println("6. Save Records to Disk");
        System.out.println("7. Load Records from Disk");
        System.out.println("8. Exit Application");
        System.out.println("=============================================");
    }

    private static void registerStudent() {
        System.out.println("\n--- Register Student ---");
        int id = InputValidator.readInt(scanner, "Enter Student ID: ");

        if (studentService.findStudentById(id) != null) {
            System.out.println("[Error] A student with ID " + id + " already exists.");
            return;
        }

        String name = InputValidator.readNonEmptyString(scanner, "Enter Full Name: ");
        String email = InputValidator.readNonEmptyString(scanner, "Enter Email Address: ");
        String dept = InputValidator.readNonEmptyString(scanner, "Enter Department: ");
        int level = InputValidator.readInt(scanner, "Enter Academic Level (e.g., 100, 200, 300): ");

        Student student = new Student(id, name, email, dept, level);

        if (studentService.registerStudent(student)) {
            System.out.println(" Student registered and saved successfully!");
        } else {
            System.out.println("[Error] Failed to register student.");
        }
    }

    private static void viewAllStudents() {
        List<Student> students = studentService.getAllStudents();
        System.out.println("\n--- All Students (" + students.size() + ") ---");
        if (students.isEmpty()) {
            System.out.println("No records found.");
            return;
        }

        for (Student s : students) {
            System.out.println(s);
        }
    }

    private static void searchStudent() {
        System.out.println("\n--- Search Student ---");
        int id = InputValidator.readInt(scanner, "Enter Student ID: ");
        Student s = studentService.findStudentById(id);

        if (s != null) {
            System.out.println("\n[Record Found]");
            System.out.println("ID: " + s.getStudentId());
            System.out.println("Name: " + s.getName());
            System.out.println("Email: " + s.getEmail());
            System.out.println("Department: " + s.getDepartment());
            System.out.println("Level: " + s.getLevel());
        } else {
            System.out.println(" No student found with ID " + id);
        }
    }

    private static void editStudent() {
        System.out.println("\n--- Edit Student Information ---");
        int id = InputValidator.readInt(scanner, "Enter Student ID to Edit: ");
        Student s = studentService.findStudentById(id);

        if (s == null) {
            System.out.println(" No student found with ID " + id);
            return;
        }

        System.out.println("Current Profile: " + s);
        String newName = InputValidator.readNonEmptyString(scanner, "Enter New Name: ");
        String newEmail = InputValidator.readNonEmptyString(scanner, "Enter New Email: ");
        String newDept = InputValidator.readNonEmptyString(scanner, "Enter New Department: ");
        int newLevel = InputValidator.readInt(scanner, "Enter New Level: ");

        if (studentService.updateStudent(id, newName, newEmail, newDept, newLevel)) {
            System.out.println(" Student details updated successfully!");
        } else {
            System.out.println("[Error] Update failed.");
        }
    }

    private static void deleteStudent() {
        System.out.println("\n--- Delete Student Record ---");
        int id = InputValidator.readInt(scanner, "Enter Student ID to Delete: ");

        if (studentService.deleteStudent(id)) {
            System.out.println(" Student record successfully deleted!");
        } else {
            System.out.println(" No student found with ID " + id);
        }
    }

    private static void saveRecords() {
        if (studentService.saveToDisk()) {
            System.out.println(" All active records saved to disk (resources/students.csv).");
        } else {
            System.out.println("[Error] Could not save records.");
        }
    }

    private static void loadRecords() {
        studentService.reloadFromDisk();
        System.out.println(" Records successfully reloaded from disk.");
    }
}