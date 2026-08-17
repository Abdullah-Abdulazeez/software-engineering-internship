Method	Endpoint	Request Body	Status         Code	Purpose
GET  /api/students  None     200      OK       Retrieve list of all registered students
GET  /api/students/{id}  None200    OK / 404 Not Found  Retrieve one specific student by ID
POST  /api/students  Student JSON Object201 Created / 400 Bad Request  Create/register a new student record
PUT  /api/students/{id}  Updated Student JSON200 OK / 404 Not Found / 400 Bad Request  Update full student profile by ID  
DELETE  /api/students/{id}  None200 OK / 404 Not Found  Remove student and associated enrollments  
