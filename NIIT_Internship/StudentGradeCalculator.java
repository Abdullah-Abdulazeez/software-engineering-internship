import java.util.Scanner;

public class StudentGradeCalculator {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   STUDENT GRADE CALCULATOR & REPORT      ");
        System.out.println("==========================================");

        System.out.print("Enter the number of students: ");
        int totalStudents = scanner.nextInt();

        String[] studentNames = new String[totalStudents];
        double[] scores = new double[totalStudents];
        char[] grades = new char[totalStudents];
        String[] remarks = new String[totalStudents];

        double totalScoreSum = 0;

        for (int i = 0; i < totalStudents; i++) {
            System.out.println("\n--- Student " + (i + 1) + " ---");
            
            scanner.nextLine(); // Clear scanner buffer
            System.out.print("Enter student name: ");
            studentNames[i] = scanner.nextLine();

            double score = -1;
            while (score < 0 || score > 100) {
                System.out.print("Enter score (0 - 100): ");
                if (scanner.hasNextDouble()) {
                    score = scanner.nextDouble();
                    if (score < 0 || score > 100) {
                        System.out.println("Invalid score! Please enter a value between 0 and 100.");
                    }
                } else {
                    System.out.println("Invalid input! Please enter a numeric score.");
                    scanner.next(); 
                }
            }

            scores[i] = score;
            totalScoreSum += score;

            if (score >= 70) {
                grades[i] = 'A';
                remarks[i] = "Excellent";
            } else if (score >= 60) {
                grades[i] = 'B';
                remarks[i] = "Very Good";
            } else if (score >= 50) {
                grades[i] = 'C';
                remarks[i] = "Good";
            } else if (score >= 45) {
                grades[i] = 'D';
                remarks[i] = "Fair";
            } else if (score >= 40) {
                grades[i] = 'E';
                remarks[i] = "Pass";
            } else {
                grades[i] = 'F';
                remarks[i] = "Fail";
            }
        }

        double classAverage = totalScoreSum / totalStudents;

        System.out.println("\n==========================================================");
        System.out.println("                     CLASS REPORT SUMMARY                 ");
        System.out.println("==========================================================");
        System.out.printf("%-20s | %-8s | %-6s | %-12s%n", "Name", "Score", "Grade", "Remark");
        System.out.println("----------------------------------------------------------");

        for (int i = 0; i < totalStudents; i++) {
            System.out.printf("%-20s | %-8.2f | %-6c | %-12s%n", 
                studentNames[i], scores[i], grades[i], remarks[i]);
        }

        System.out.println("----------------------------------------------------------");
        System.out.printf("Class Average Score: %.2f%n", classAverage);
        System.out.println("==========================================================");

        scanner.close();
    }
}