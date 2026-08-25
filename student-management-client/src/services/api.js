const API_BASE_URL = 'http://localhost:5000/api';

export const fetchAllStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/students`);
  if (!response.ok) {
    throw new Error(`Failed to fetch students. Server responded with status ${response.status}`);
  }
  return await response.json();
};