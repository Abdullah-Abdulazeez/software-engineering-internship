package Week2;
import java.util.ArrayList;
import java.util.List;

public class Student {
    private int studentId;
    private String name;
    private String department;
    private List<Double> gradePoints;
    private List<Integer> creditUnits;

    public Student(int studentId, String name, String department) {
        this.studentId = studentId;
        this.name = name;
        this.department = department;
        this.gradePoints = new ArrayList<>();
        this.creditUnits = new ArrayList<>();
    }

    public int getStudentId() { return studentId; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public List<Double> getGradePoints() { return gradePoints; }
    public List<Integer> getCreditUnits() { return creditUnits; }

    public void addResult(double gradePoint, int units) {
        this.gradePoints.add(gradePoint);
        this.creditUnits.add(units);
    }
}