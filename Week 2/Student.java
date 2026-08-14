import java.util.ArrayList;
import java.util.List;

public class Student {
    private int studentId;
    private String studentName;
    private String courseOffered;
    private int studentLevel;
    
    // Attributes for GPA calculation
    private List<Double> grades;
    private List<Integer> courseUnits;

    // Constructor matching new Student(1001, "Alex Morgan", "Computer Science", 200)
    public Student(int studentId, String studentName, String courseOffered, int studentLevel) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseOffered = courseOffered;
        this.studentLevel = studentLevel;
        this.grades = new ArrayList<>();
        this.courseUnits = new ArrayList<>();
    }

    // Getters and Setters
    public int getStudentId() { return studentId; }
    public void setStudentId(int studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCourseOffered() { return courseOffered; }
    public void setCourseOffered(String courseOffered) { this.courseOffered = courseOffered; }

    public int getStudentLevel() { return studentLevel; }
    public void setStudentLevel(int studentLevel) { this.studentLevel = studentLevel; }

    // Adds a grade point (0.0 - 4.0) and credit units
    public void addCourseGrade(double gradePoint, int creditUnits) {
        if (gradePoint >= 0.0 && gradePoint <= 4.0) {
            this.grades.add(gradePoint);
            this.courseUnits.add(creditUnits);
        } else {
            System.out.println("Invalid grade point. Must be between 0.0 and 4.0.");
        }
    }

    // Calculates GPA based on accumulated grades and units
    public double calculateGPA() {
        if (grades.isEmpty()) {
            return 0.0;
        }

        double totalQualityPoints = 0.0;
        int totalUnits = 0;

        for (int i = 0; i < grades.size(); i++) {
            totalQualityPoints += grades.get(i) * courseUnits.get(i);
            totalUnits += courseUnits.get(i);
        }

        return totalUnits == 0 ? 0.0 : totalQualityPoints / totalUnits;
    }

    // Displays profile
    public void displayStudentProfile() {
        System.out.println("ID: " + studentId + " | Name: " + studentName + 
                           " | Major: " + courseOffered + " | Level: " + studentLevel + 
                           " | GPA: " + String.format("%.2f", calculateGPA()));
    }
}