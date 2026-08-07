package StudentManagement.src.util;

import StudentManagement.src.model.Student;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles reading and writing student records to the resources/students.csv file.
 */
public class StorageManager {
    private static final String FILE_PATH = "resources/students.csv";

    public static List<Student> loadRecords() {
        List<Student> students = new ArrayList<>();
        File file = new File(FILE_PATH);

        if (!file.exists()) {
            return students;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                Student student = Student.fromCSV(line);
                if (student != null) {
                    students.add(student);
                }
            }
        } catch (IOException e) {
            System.out.println("[Error] Failure loading records from disk: " + e.getMessage());
        }
        return students;
    }

    public static boolean saveRecords(List<Student> students) {
        File resourceDir = new File("resources");
        if (!resourceDir.exists()) {
            resourceDir.mkdirs();
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, false))) {
            for (Student s : students) {
                writer.write(s.toCSV());
                writer.newLine();
            }
            return true;
        } catch (IOException e) {
            System.out.println("[Error] Failure saving records to disk: " + e.getMessage());
            return false;
        }
    }
}