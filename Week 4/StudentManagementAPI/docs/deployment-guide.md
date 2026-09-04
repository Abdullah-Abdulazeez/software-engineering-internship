# Student Management System - Deployment Guide

## 1. Cloud Infrastructure & Hosting
* **Frontend:** Render Static Site / Vercel
* **Backend:** Render Web Service (Node.js Environment)
* **Database:** Aiven / Render Cloud MySQL

## 2. Database Provisioning
1. Create a managed MySQL instance on Aiven or Render.
2. Connect via MySQL Workbench or CLI using provided URI/SSL credentials.
3. Run schema initialization scripts:
   * `CREATE TABLE students (...)`
   * `CREATE TABLE courses (...)`
   * `CREATE TABLE users (...)`

## 3. Backend Deployment (Node.js / Express)
1. Link your GitHub repository to Render Web Services.
2. Set Root Directory to: `Week 4/StudentManagementAPI`.
3. Set Build Command to: `npm install`.
4. Set Start Command to: `node src/app.js`.
5. Configure Environment Variables:
   * `PORT`: `5000` (or leave default assigned port)
   * `DB_HOST`: `<CLOUD_HOST_URL>`
   * `DB_USER`: `<CLOUD_DB_USER>`
   * `DB_PASSWORD`: `<CLOUD_DB_PASSWORD>`
   * `DB_NAME`: `student_management`
   * `JWT_SECRET`: `<STRONG_PRODUCTION_SECRET>`
   * `NODE_ENV`: `production`

## 4. Frontend Deployment (React / Vite)
1. Inside `student-management-client/src/services/api.js`, update `API_BASE_URL` to point to the live hosted backend URL:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || '[https://your-backend.onrender.com/api](https://your-backend.onrender.com/api)';