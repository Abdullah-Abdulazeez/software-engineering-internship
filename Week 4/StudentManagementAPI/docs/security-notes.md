# REST API Security & Architecture Notes

## 1. Layered Architecture Separation
- **Controller Layer:** Only handles HTTP parsing, route delegation, and response status formulation.
- **Service Layer:** Houses validation routines, duplicate checks, and domain logic.
- **Repository Layer:** Interfaces directly with MySQL using prepared statements.

## 2. API Security Protections
- **SQL Injection Defense:** All database statements execute parameterized queries via `mysql2/promise`.
- **Input Validation:** Enforces non-empty string constraints and RFC regex checks on email formats.
- **Data Protection:** Database credentials and system ports are isolated within `.env` and excluded via `.gitignore`.
- **Error Obfuscation:** Internal database engine error traces are logged privately in the server console and replaced with clean JSON error responses for the client.

## 3. Authentication vs. Authorization
- **Authentication:** Identifies the user requesting access (e.g., verifying credentials via token or password hash).
- **Authorization:** Dictates what resources or operations an authenticated user can interact with (e.g., read-only access vs. delete privileges).