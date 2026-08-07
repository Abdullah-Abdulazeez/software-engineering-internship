package Week2;
import java.util.ArrayList;
import java.util.List;

public class Student {
    private int studentId;
    private String name;
    private String department;
    private List<Course> courses;

    public Student(int studentId, String name, String department) {
        this.studentId = studentId;
        this.name = name;
        this.department = department;
        this.courses = new ArrayList<>();
    }

    public int getStudentId() { return studentId; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public List<Course> getCourses() { return courses; }

    public void setName(String name) { this.name = name; }
    public void setDepartment(String department) { this.department = department; }

    public void addCourse(Course course) {
        this.courses.add(course);
    }

    // Convert student data & courses into a CSV line format:
    // ID,Name,Department,Course1Code:Score:Units;Course2Code:Score:Units
    public String toCSV() {
        StringBuilder sb = new StringBuilder();
        sb.append(studentId).append(",")
          .append(name).append(",")
          .append(department).append(",");

        for (int i = 0; i < courses.size(); i++) {
            Course c = courses.get(i);
            sb.append(c.getCourseCode()).append(":")
              .append(c.getScore()).append(":")
              .append(c.getCreditUnits());
            if (i < courses.size() - 1) sb.append(";");
        }
        return sb.toString();
    }

    // Reconstruct Student + Courses from a CSV line safely
    public static Student fromCSV(String csvLine) {
        if (csvLine == null || csvLine.trim().isEmpty()) {
            return null;
        }

        String[] parts = csvLine.split(",");
        
        // Ensure we have at least ID, Name, and Department
        if (parts.length < 3) {
            return null; // Skip malformed rows
        }

        int id = Integer.parseInt(parts[0].trim());
        String name = parts[1].trim();
        String dept = parts[2].trim();

        Student student = new Student(id, name, dept);

        // Check if course data exists in the 4th column (index 3)
        if (parts.length > 3 && !parts[3].trim().isEmpty()) {
            String[] courseTokens = parts[3].split(";");
            for (String token : courseTokens) {
                String[] details = token.split(":");
                if (details.length == 3) {
                    String code = details[0].trim();
                    double score = Double.parseDouble(details[1].trim());
                    int units = Integer.parseInt(details[2].trim());
                    student.addCourse(new Course(code, score, units));
                }
            }
        }
        return student;
    }
}