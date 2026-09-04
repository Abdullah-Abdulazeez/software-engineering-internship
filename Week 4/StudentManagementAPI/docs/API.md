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

---

**3. Production Test Results Matrix (`docs/production-test-results.md`)**

| Test Item | Endpoint / Feature | Expected Production Behavior[cite: 1] | Status[cite: 1] |
| :--- | :--- | :--- | :--- |
| **P-01: Health & Landing**[cite: 1] | `GET /` (Frontend)[cite: 1] | Single-page application renders navigation, metrics, and cards[cite: 1] | Pass |
| **P-02: Auth Registration**[cite: 1] | `POST /api/auth/register`[cite: 1] | Persists account with hashed password (`201 Created`)[cite: 1] | Pass |
| **P-03: Auth Login**[cite: 1] | `POST /api/auth/login`[cite: 1] | Issues signed JWT token (`200 OK`)[cite: 1] | Pass |
| **P-04: Student Listing**[cite: 1] | `GET /api/students`[cite: 1] | Fetches cloud database records via Bearer token[cite: 1] | Pass |
| **P-05: RBAC Route Lock**[cite: 1] | `DELETE /api/students/:id`[cite: 1] | Blocks requests from STAFF role (`403 Forbidden`)[cite: 1] | Pass |
| **P-06: Error Sanitization**[cite: 1] | Invalid route/query[cite: 1] | Returns sanitized JSON error without stack traces[cite: 1] | Pass |
