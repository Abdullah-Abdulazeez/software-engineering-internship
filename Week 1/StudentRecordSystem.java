import java.util.ArrayList;
import java.util.Scanner;

// Model Class representing a single Student
class Student {
    private String id;
    private String name;
    private double score;
    private char grade;

    public Student(String id, String name, double score) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.grade = calculateGrade(score);
    }

    private char calculateGrade(double score) {
        if (score >= 70) return 'A';
        if (score >= 60) return 'B';
        if (score >= 50) return 'C';
        if (score >= 45) return 'D';
        if (score >= 40) return 'E';
        return 'F';
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public double getScore() { return score; }
    public char getGrade() { return grade; }

    @Override
    public String toString() {
        return String.format("%-10s | %-20s | %-8.2f | %-6c", id, name, score, grade);
    }
}

// Main Application Class handling System Operations
public class StudentRecordSystem {

    private static final ArrayList<Student> studentList = new ArrayList<>();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        boolean running = true;

        while (running) {
            displayMenu();
            System.out.print("Choose an option (1-5): ");
            
            if (scanner.hasNextInt()) {
                int choice = scanner.nextInt();
                scanner.nextLine(); // Clear buffer

                switch (choice) {
                    case 1 -> addStudent();
                    case 2 -> deleteStudent();
                    case 3 -> searchStudent();
                    case 4 -> displayAllStudents();
                    case 5 -> {
                        System.out.println("\nExiting system... Goodbye!");
                        running = false;
                    }
                    default -> System.out.println("Invalid option! Please select between 1 and 5.");
                }
            } else {
                System.out.println("Invalid input! Please enter a number.");
                scanner.next(); // Clear invalid token
            }
        }

        scanner.close();
    }

    private static void displayMenu() {
        System.out.println("\n==========================================");
        System.out.println("        STUDENT RECORD SYSTEM             ");
        System.out.println("==========================================");
        System.out.println("1. Add a Student");
        System.out.println("2. Delete a Student");
        System.out.println("3. Search for a Student");
        System.out.println("4. Display All Students");
        System.out.println("5. Exit");
        System.out.println("==========================================");
    }

    // 1. ADD STUDENT
    private static void addStudent() {
        System.out.println("\n--- Add New Student ---");
        
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine().trim();

        // Check if ID already exists
        for (Student s : studentList) {
            if (s.getId().equalsIgnoreCase(id)) {
                System.out.println("Error: A student with ID '" + id + "' already exists!");
                return;
            }
        }

        System.out.print("Enter Full Name: ");
        String name = scanner.nextLine().trim();

        double score = -1;
        while (score < 0 || score > 100) {
            System.out.print("Enter Score (0-100): ");
            if (scanner.hasNextDouble()) {
                score = scanner.nextDouble();
                if (score < 0 || score > 100) {
                    System.out.println("Invalid score! Must be between 0 and 100.");
                }
            } else {
                System.out.println("Invalid input! Enter a numeric value.");
                scanner.next();
            }
        }

        studentList.add(new Student(id, name, score));
        System.out.println("-> Student successfully added!");
    }

    // 2. DELETE STUDENT
    private static void deleteStudent() {
        System.out.println("\n--- Delete Student ---");
        if (studentList.isEmpty()) {
            System.out.println("No records found to delete.");
            return;
        }

        System.out.print("Enter Student ID to delete: ");
        String id = scanner.nextLine().trim();

        boolean removed = studentList.removeIf(student -> student.getId().equalsIgnoreCase(id));

        if (removed) {
            System.out.println("-> Student record deleted successfully!");
        } else {
            System.out.println("-> Student with ID '" + id + "' was not found.");
        }
    }

    // 3. SEARCH STUDENT
    private static void searchStudent() {
        System.out.println("\n--- Search Student ---");
        if (studentList.isEmpty()) {
            System.out.println("No records available to search.");
            return;
        }

        System.out.print("Enter Student ID or Name to search: ");
        String query = scanner.nextLine().trim().toLowerCase();

        boolean found = false;
        System.out.println("\n%-10s | %-20s | %-8s | %-6s".formatted("ID", "Name", "Score", "Grade"));
        System.out.println("--------------------------------------------------");

        for (Student s : studentList) {
            if (s.getId().toLowerCase().contains(query) || s.getName().toLowerCase().contains(query)) {
                System.out.println(s);
                found = true;
            }
        }

        if (!found) {
            System.out.println("No matching student found.");
        }
    }

    // 4. DISPLAY ALL STUDENTS
    private static void displayAllStudents() {
        System.out.println("\n--- All Student Records ---");
        if (studentList.isEmpty()) {
            System.out.println("No student records available.");
            return;
        }

        System.out.printf("%-10s | %-20s | %-8s | %-6s%n", "ID", "Name", "Score", "Grade");
        System.out.println("--------------------------------------------------");
        
        for (Student s : studentList) {
            System.out.println(s);
        }
        System.out.println("--------------------------------------------------");
        System.out.println("Total Students: " + studentList.size());
    }
}