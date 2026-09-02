# Internship Bug Tracking Register (BUGS.md)

### Bug ID: BUG-001
* **Title:** Database authentication failed on initial server connection
* **Severity:** High
* **Steps to Reproduce:**
  1. Start the API server via `node src/app.js`.
  2. Observe console database connection error `ER_ACCESS_DENIED_ERROR`.
* **Expected:** Server connects securely to MySQL database instance.
* **Actual:** Access denied for user 'root'@'localhost'.
* **Status:** Fixed
* **Resolution:** Synchronized root MySQL password within `.env` configuration.

---

### Bug ID: BUG-002
* **Title:** Unknown column 'student_id' in repository query execution
* **Severity:** High
* **Steps to Reproduce:**
  1. Dispatch `GET /api/students`.
  2. Observe SQL error `ER_BAD_FIELD_ERROR`.
* **Expected:** All student records queried by designated primary key.
* **Actual:** Database primary key schema diverged from column alias.
* **Status:** Fixed
* **Resolution:** Aligned database schema to primary key `student_id` with `AUTO_INCREMENT`.

---

### Bug ID: BUG-003
* **Title:** Client UI unstyled text layout with Tailwind CSS v4
* **Severity:** Medium
* **Steps to Reproduce:**
  1. Run `npm run dev` in `student-management-client`.
  2. Open browser at `http://localhost:5173`.
* **Expected:** Styled modern cards, header, and metrics grid.
* **Actual:** Raw unstyled Times New Roman text elements.
* **Status:** Fixed
* **Resolution:** Configured `@tailwindcss/vite` plugin inside `vite.config.js` and imported `@import "tailwindcss";` in `src/index.css`.

---

### Bug ID: BUG-004
* **Title:** Student form registration hangs indefinitely in "Saving..." state
* **Severity:** High
* **Steps to Reproduce:**
  1. Open student registration form.
  2. Input valid student details.
  3. Click "Register Student".
* **Expected:** Record persists to database, form clears, and button resets.
* **Actual:** Button state locked on "Saving...", promise unresolved in frontend[cite: 1].
* **Status:** Fixed[cite: 1]
* **Resolution:** Wrapped client-side form handler in a `try...catch...finally` construct to ensure `setSubmitting(false)` executes unconditionally, and aligned server JSON error response headers[cite: 1].
### Bug ID: BUG-005
* **Title:** Jest test suite timeout (5000ms) on database query execution (TC005)
* **Severity:** High
* **Steps to Reproduce:**
  1. Run automated test suite via `npm test`.
  2. Test execution reaches TC005 (`POST /api/auth/login`).
* **Expected:** Endpoint queries database, returns 401 Unauthorized within 50ms, and Jest exits cleanly.
* **Actual:** Request hangs indefinitely until Jest 5000ms runner timeout triggers with open handle `TCPSERVERWRAP`.
* **Status:** Fixed
* **Resolution:** Loaded `dotenv.config()` at the top of test runner to ensure database environment variables are available during test runtime, and added `pool.end()` inside `afterAll` hook to cleanly close lingering MySQL sockets.