package StudentManagement.src.service;


import StudentManagement.src.model.Student;
import StudentManagement.src.util.StorageManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Handles all business logic for managing students in memory and syncing with disk storage.
 */
public class StudentService {
    private List<Student> studentList;

    public StudentService() {
        this.studentList = StorageManager.loadRecords();
    }

    public boolean registerStudent(Student student) {
        if (findStudentById(student.getStudentId()) != null) {
            return false; // Student ID already exists
        }
        studentList.add(student);
        return StorageManager.saveRecords(studentList);
    }

    public List<Student> getAllStudents() {
        return new ArrayList<>(studentList);
    }

    public Student findStudentById(int id) {
        for (Student s : studentList) {
            if (s.getStudentId() == id) {
                return s;
            }
        }
        return null;
    }

    public boolean updateStudent(int id, String newName, String newEmail, String newDept, int newLevel) {
        Student s = findStudentById(id);
        if (s != null) {
            s.setName(newName);
            s.setEmail(newEmail);
            s.setDepartment(newDept);
            s.setLevel(newLevel);
            return StorageManager.saveRecords(studentList);
        }
        return false;
    }

    public boolean deleteStudent(int id) {
        boolean removed = studentList.removeIf(s -> s.getStudentId() == id);
        if (removed) {
            StorageManager.saveRecords(studentList);
        }
        return removed;
    }

    public boolean saveToDisk() {
        return StorageManager.saveRecords(studentList);
    }

    public void reloadFromDisk() {
        this.studentList = StorageManager.loadRecords();
    }
}
