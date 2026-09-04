const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://localhost:5000/api';
  
const handleResponse = async (res) => {
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.message || `Error ${res.status}: Server request failed`);
  }
  return data;
};

export const fetchAllStudents = async () => {
  const res = await fetch(`${API_BASE_URL}/students`);
  return handleResponse(res);
};

export const createStudent = async (data) => {
  const res = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateStudent = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteStudent = async (id) => {
  const res = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const fetchAllCourses = async () => {
  const res = await fetch(`${API_BASE_URL}/courses`);
  return handleResponse(res);
};

export const createCourse = async (data) => {
  const res = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteCourse = async (id) => {
  const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};