package Week2;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== STUDENT RESULT PROCESSING SYSTEM ===");
        
        int id = UtilityFunctions.readIntInput(scanner, "Enter Student ID: ");
        System.out.print("Enter Student Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Department: ");
        String dept = scanner.nextLine();

        Student student = new Student(id, name, dept);

        int numCourses = UtilityFunctions.readIntInput(scanner, "How many courses to enter? ");

        for (int i = 1; i <= numCourses; i++) {
            System.out.println("\n--- Course " + i + " ---");
            double score = UtilityFunctions.readScoreInput(scanner, "Enter score (0-100): ");
            int units = UtilityFunctions.readIntInput(scanner, "Enter credit units: ");

            double gradePoint = GradeCalculator.convertScoreToPoint(score);
            student.addResult(gradePoint, units);

            System.out.println("Recorded: Grade " + GradeCalculator.convertScoreToGrade(score) + 
                               " (" + gradePoint + " pts)");
        }

        System.out.println("\n=== SUMMARY RESULT ===");
        System.out.println("Student: " + student.getName() + " (ID: " + student.getStudentId() + ")");
        System.out.println("Department: " + student.getDepartment());
        double gpa = ResultProcessor.calculateGPA(student);
        System.out.printf("Final GPA: %.2f / 5.00\n", gpa);

        scanner.close();
    }
}