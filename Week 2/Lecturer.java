public class Lecturer {
    private int lecturerId;
    private String name;
    private String department;

    // Constructor
    public Lecturer(int lecturerId, String name, String department) {
        this.lecturerId = lecturerId;
        this.name = name;
        this.department = department;
    }

    // Getters and Setters
    public int getLecturerId() { return lecturerId; }
    public void setLecturerId(int lecturerId) { this.lecturerId = lecturerId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    // Methods
    public void teachCourse(Course course) {
        System.out.println("Lecturer " + name + " is teaching " + course.getCourseTitle());
    }

    public void displayLecturerDetails() {
        System.out.println("Lecturer ID: " + lecturerId + " | Name: " + name + " | Department: " + department);
    }
}