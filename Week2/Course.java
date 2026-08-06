package Week2;
public class Course {
    private String courseCode;
    private double score;
    private int creditUnits;

    public Course(String courseCode, double score, int creditUnits) {
        this.courseCode = courseCode;
        this.score = score;
        this.creditUnits = creditUnits;
    }

    public String getCourseCode() { return courseCode; }
    public double getScore() { return score; }
    public int getCreditUnits() { return creditUnits; }
}