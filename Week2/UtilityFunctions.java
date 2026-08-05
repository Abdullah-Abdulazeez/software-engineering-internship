package Week2;

import java.util.Scanner;

public class UtilityFunctions {

    public static int readIntInput(Scanner scanner, String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                int input = Integer.parseInt(scanner.nextLine().trim());
                if (input < 0) {
                    throw new IllegalArgumentException("Value cannot be negative.");
                }
                return input;
            } catch (NumberFormatException e) {
                System.out.println(" Error: Invalid integer format. Please enter a valid number.");
            } catch (IllegalArgumentException e) {
                System.out.println(" Error: " + e.getMessage());
            }
        }
    }

    public static double readScoreInput(Scanner scanner, String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                double score = Double.parseDouble(scanner.nextLine().trim());
                if (score < 0 || score > 100) {
                    throw new IllegalArgumentException("Score must be between 0 and 100.");
                }
                return score;
            } catch (NumberFormatException e) {
                System.out.println(" Error: Invalid number format. Please enter a numeric score.");
            } catch (IllegalArgumentException e) {
                System.out.println(" Error: " + e.getMessage());
            }
        }
    }
}