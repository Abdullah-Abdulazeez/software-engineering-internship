package Week2;

import java.util.List;

public class ResultProcessor {

    public static double calculateGPA(Student student) {
        List<Double> points = student.getGradePoints();
        List<Integer> units = student.getCreditUnits();

        if (points.isEmpty()) return 0.0;

        double totalQualityPoints = 0.0;
        int totalUnits = 0;

        for (int i = 0; i < points.size(); i++) {
            totalQualityPoints += points.get(i) * units.get(i);
            totalUnits += units.get(i);
        }

        return totalUnits == 0 ? 0.0 : totalQualityPoints / totalUnits;
    }
}