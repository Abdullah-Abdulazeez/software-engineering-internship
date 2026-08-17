+-------------------------------------------------------------+
|                      CLIENT LAYER                           |
|       (Web Browser / Mobile Client / Postman)               |
+-------------------------------------------------------------+
                              |
                              |  HTTP Request (GET, POST, PUT, DELETE)
                              |  Payload: JSON / Query Params
                              v
+-------------------------------------------------------------+
|                      SERVER LAYER                           |
|  +-------------------------------------------------------+  |
|  |                 Express / Spring Boot                 |  |
|  |  [Router / Controller] -> Route mapping & validation  |  |
|  |  [Service Layer]       -> Business logic & rules      |  |
|  |  [Repository Layer]    -> Parameterized DB queries    |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
                              |
                              |  SQL Queries (TCP Connection Pool)
                              v
+-------------------------------------------------------------+
|                     DATABASE LAYER                          |
|             (MySQL: student_management DB)                  |
+-------------------------------------------------------------+