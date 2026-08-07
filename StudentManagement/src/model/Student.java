package StudentManagement.src.model;

/**
 * Encapsulates core student profile attributes and CSV serialization logic.
 */
public class Student {
    private int studentId;
    private String name;
    private String email;
    private String department;
    private int level;

    public Student(int studentId, String name, String email, String department, int level) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.level = level;
    }

    // Getters and Setters
    public int getStudentId() { return studentId; }
    public void setStudentId(int studentId) { this.studentId = studentId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    /**
     * Converts a Student instance into a CSV line format: ID,Name,Email,Department,Level
     */
    public String toCSV() {
        return studentId + "," + name + "," + email + "," + department + "," + level;
    }

    /**
     * Reconstructs a Student instance from a CSV line.
     */
    public static Student fromCSV(String csvLine) {
        if (csvLine == null || csvLine.trim().isEmpty()) {
            return null;
        }

        String[] parts = csvLine.split(",");
        if (parts.length < 5) {
            return null; // Skip invalid or incomplete lines
        }

        try {
            int id = Integer.parseInt(parts[0].trim());
            String name = parts[1].trim();
            String email = parts[2].trim();
            String dept = parts[3].trim();
            int level = Integer.parseInt(parts[4].trim());

            return new Student(id, name, email, dept, level);
        } catch (Exception e) {
            return null; // Skip malformed records
        }
    }

    @Override
    public String toString() {
        return String.format("ID: %-6d | Name: %-18s | Email: %-22s | Dept: %-15s | Level: %d",
                studentId, name, email, department, level);
    }
}
