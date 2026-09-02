Test ID  Test Scenario   Method & Endpoint   Expected Status                ExpectedResult
TC001    Register user with valid payload  POST /api/auth/register 201      Created  User account created with hashed password  
TC002      Register user with existing email  POST /api/auth/register  400 Bad Request  Error: Email already registered  
TC003    Register user with missing password  POST /api/auth/register  400 Bad RequestError: Name, email, and password required
TC004  Login with valid credentials  POST /api/auth/login  200 OK  Returns signed JWT bearer token
TC005  Login with incorrect password  POST /api/auth/login  401 Unauthorized  Error: Invalid email or password
TC006   Login with unregistered email  POST /api/auth/login  401 Unauthorized  Error: Invalid email or password
TC007  Retrieve students list without token  GET /api/students  401 Unauthorized  Access denied: No token provided  
TC008  Retrieve students list with invalid token  GET /api/students  403 Forbidden  Error: Invalid or expired token 
TC009  Retrieve students list with valid token  GET /api/students  200 OK Returns array of student objects
TC010  Retrieve student by non-existent ID  GET /api/students/9999  404 Not Found  Error: Student not found
TC011  Create student with valid data  POST /api/students  201 Created   Student record persisted to database
TC012  Create student with malformed email  POST /api/students  400 Bad Request  Error: Invalid email format 
TC013  Create student with duplicate email  POST /api/students  400 Bad Request  Error: Email already in use
TC014  Update student record with valid payload  PUT /api/students/:id  200 OK  Updated student details returned  
TC015  Update non-existent student record  PUT /api/students/9999  404 Not Found  Error: Student not found
TC016  Delete student with STAFF role token  DELETE /api/students/:id  403 Forbidden  Forbidden: Access restricted to ADMIN
TC017  Delete student with ADMIN role token  DELETE /api/students/:id  200 OK  Student record deleted from database  
TC018  Retrieve course catalogueGET /api/courses      200 OK        Returns array of courses
TC019 Create course with duplicate code POST /api/courses  400 Bad Request  Error: Course code already registered
TC020  Delete course with STAFF role token  DELETE /api/courses/:id  403 Forbidden  Forbidden: Access restricted to ADMIN  