package Week2;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileManager {
    private static final String FILE_NAME = "students.csv";

    public static void saveStudent(Student student) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME, true))) {
            writer.write(student.toCSV());
            writer.newLine();
            System.out.println(" Record saved successfully to " + FILE_NAME);
        } catch (IOException e) {
            System.out.println(" Error writing to file: " + e.getMessage());
        }
    }

    public static List<Student> loadAllStudents() {
        List<Student> students = new ArrayList<>();
        File file = new File(FILE_NAME);
        if (!file.exists()) return students;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Ignore completely empty lines
                if (line.trim().isEmpty()) continue;

                Student student = Student.fromCSV(line);
                if (student != null) {
                    students.add(student);
                }
            }
        } catch (IOException e) {
            System.out.println(" Error reading file: " + e.getMessage());
        }
        return students;
    }

    public static Student searchStudent(int studentId) {
        for (Student s : loadAllStudents()) {
            if (s.getStudentId() == studentId) return s;
        }
        return null;
    }

    public static boolean deleteStudent(int studentId) {
        List<Student> students = loadAllStudents();
        boolean removed = students.removeIf(s -> s.getStudentId() == studentId);
        if (removed) rewriteFile(students);
        return removed;
    }

    public static boolean updateStudent(Student updatedStudent) {
        List<Student> students = loadAllStudents();
        boolean found = false;

        for (int i = 0; i < students.size(); i++) {
            if (students.get(i).getStudentId() == updatedStudent.getStudentId()) {
                students.set(i, updatedStudent);
                found = true;
                break;
            }
        }

        if (found) rewriteFile(students);
        return found;
    }

    private static void rewriteFile(List<Student> students) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME, false))) {
            for (Student s : students) {
                writer.write(s.toCSV());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println(" Error rewriting file: " + e.getMessage());
        }
    }
}