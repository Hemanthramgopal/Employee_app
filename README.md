# EmployeePro — Employee Management System

A full-stack Employee Management web application built with **Node.js + Express + MongoDB + Vanilla JS**.

## Features
- ✅ Admin Register & Login (JWT Auth)
- ✅ Employee CRUD (Create, Read, Update, Delete)
- ✅ Search & Filter employees
- ✅ Dashboard with stats
- ✅ Pagination
- ✅ Ready for Vercel deployment

---

## Project Structure

```
employee-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── employees.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   └── public/
│       └── index.html
├── package.json
├── server.js          ← Vercel entry point
├── vercel.json
├── .env
└── .gitignore
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register admin |
| POST | /api/auth/login | Login admin |
| GET | /api/auth/me | Get current admin |

### Employees (Protected — requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/employees | List all (search, filter, paginate) |
| GET | /api/employees/stats | Dashboard stats |
| GET | /api/employees/:id | Get one employee |
| POST | /api/employees | Create employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |

---

## Run Locally

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Set environment variables
Edit `backend/.env`:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Start server
```bash
npm run dev
```

Open `http://localhost:5000` in your browser.

---

## Deploy to Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Import on Vercel
1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Select your GitHub repository
4. Click **"Import"**

### Step 3 — Set Environment Variables on Vercel
In the Vercel project settings → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://Vercel-Admin-atlas-amber-window:cppVsAh2WvqlrXLZ@atlas-amber-window.ekmg5ls.mongodb.net/?retryWrites=true&w=majority` |
| `JWT_SECRET` | `super_secret_jwt_key_2024_employee_pro` |

### Step 4 — Deploy
Click **"Deploy"** — Vercel will build and deploy automatically.

> ⚠️ **Important:** In MongoDB Atlas, go to **Network Access** and add `0.0.0.0/0` to allow connections from Vercel's servers.

---

## MongoDB Atlas Network Access (Required!)
1. Login to https://cloud.mongodb.com
2. Go to your cluster → **Network Access**
3. Click **"Add IP Address"**
4. Choose **"Allow Access from Anywhere"** → `0.0.0.0/0`
5. Click **Confirm**

This is required for Vercel serverless functions to connect to MongoDB.
# Employee_app
