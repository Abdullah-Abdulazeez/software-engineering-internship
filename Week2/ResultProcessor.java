package Week2;
public class ResultProcessor {
    public static double calculateGPA(Student student) {
        if (student.getCourses().isEmpty()) return 0.0;

        double totalQualityPoints = 0.0;
        int totalUnits = 0;

        for (Course c : student.getCourses()) {
            double gradePoint = GradeCalculator.convertScoreToPoint(c.getScore());
            totalQualityPoints += gradePoint * c.getCreditUnits();
            totalUnits += c.getCreditUnits();
        }

        return totalUnits == 0 ? 0.0 : totalQualityPoints / totalUnits;
    }
}