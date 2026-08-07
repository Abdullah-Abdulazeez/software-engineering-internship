public class Course {
    private String courseCode;
    private String courseTitle;
    private int creditUnits;

    // Constructor
    public Course(String courseCode, String courseTitle, int creditUnits) {
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.creditUnits = creditUnits;
    }

    // Getters and Setters
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public int getCreditUnits() { return creditUnits; }
    public void setCreditUnits(int creditUnits) { this.creditUnits = creditUnits; }

    public void displayCourseInfo() {
        System.out.println("Course: " + courseCode + " - " + courseTitle + " (" + creditUnits + " units)");
    }
}