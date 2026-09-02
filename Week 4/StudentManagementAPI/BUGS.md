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