REST (Representational State Transfer): An architectural style for building web APIs based on these core principles:  
        Statelessness: The server does not store the client’s session state between requests; every single request contains all information needed to process it.
        Resource-Based: Everything is treated as a identifiable resource accessed via clean URIs (e.g., /api/students/10 instead of /api/getStudentById?id=10).
        Standard HTTP Methods: Operations on resources are defined strictly by standard HTTP verbs.  
        Uniform Representation: Data is exchanged using standard formats, most commonly JSON (JavaScript Object Notation).  

HTTP Methods Reference
Method	    Purpose	            Idempotent?	    Typical Scenario
GET  Retrieve data from the server  Yes     Fetching all students or one student record  
POST  Create a new resource on the server  No   Registering a new student 
PUT  Replace/completely update an existing resource  Yes   Updating all fields of a student record 
PATCH  Partially update specific fields of a resource  No    Updating only the student's email or phone 
DELETE  Remove a resource from the server  Yes      Deleting a student by ID   