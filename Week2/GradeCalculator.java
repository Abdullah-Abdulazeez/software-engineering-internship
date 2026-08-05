package Week2;
public class GradeCalculator {

    public static double convertScoreToPoint(double score) {
        if (score >= 70) return 5.0; 
        if (score >= 60) return 4.0; 
        if (score >= 50) return 3.0; 
        if (score >= 45) return 2.0; 
        if (score >= 40) return 1.0; 
        return 0.0;                  
    }

    public static String convertScoreToGrade(double score) {
        if (score >= 70) return "A";
        if (score >= 60) return "B";
        if (score >= 50) return "C";
        if (score >= 45) return "D";
        if (score >= 40) return "E";
        return "F";
    }
}