# Student Management REST API - Endpoint Documentation

## Students Endpoints

### 1. Retrieve All Students
- **Method:** `GET`
- **Endpoint:** `/api/students`
- **Request Body:** None
- **Success Status:** `200 OK`
- **Response:**
```json
[
  {
    "id": 1,
    "firstName": "Ahmed",
    "lastName": "Bello",
    "email": "ahmed@example.com",
    "phone": "08012345678"
  }
]