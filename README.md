# StudySphere — Academic Learning, Assessment & Study Management Portal

A full-stack Academic LMS & Study Management Portal built as a college DBMS project, designed around a normalized 3NF relational database architecture with an Express.js REST API backend and a modern React/Tailwind frontend.

---

## 🏛️ System Architecture

```text
       React + Vite Frontend (Port 5173)
         (Tailwind CSS • Lucide • Recharts)
                       ↓  HTTP / REST
        Node.js + Express Backend (Port 5000)
         (JWT Auth • bcrypt • Route Handlers)
                       ↓  SQL Queries / Pool
          MySQL Relational Database
     (3NF Normalized Schema • Views • Stored Procs)
```

---

## 📁 Project Structure

```text
StudySphere/
├── frontend/                 # React 18 + Vite + Tailwind CSS Client
│   ├── src/
│   │   ├── components/       # Reusable UI (Navbar, Sidebar, StatCard, Badge, Modal, EmptyState)
│   │   ├── context/          # AuthContext with 1-click role switcher
│   │   ├── data/             # Relational Mock Dataset (B.Tech CSE Semester VI)
│   │   ├── layouts/          # Responsive AppLayout with mobile support
│   │   ├── pages/            # Student, Faculty, Admin, and Auth views
│   │   ├── services/         # Unified API client with automatic fallback
│   │   ├── App.jsx           # React Router v6 route configuration
│   │   ├── main.jsx          # Application entrypoint
│   │   └── index.css         # Tailwind directives & design tokens
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                  # Node.js + Express REST API Server
│   ├── config/               # MySQL pool & database initialization
│   ├── controllers/          # Business logic & DBMS queries
│   ├── middleware/           # JWT verification, Role authorization, Error handler
│   ├── models/               # In-memory relational schema fallback model
│   ├── routes/               # Modular Express API endpoints
│   ├── utils/                # JWT and JSON response helpers
│   ├── app.js                # Express app & middleware setup
│   ├── server.js             # Server startup entrypoint
│   ├── package.json
│   └── .env.example
│
├── database/                 # Complete DBMS Project SQL Assets
│   ├── schema.sql            # 19 Normalized Relational Tables (1NF, 2NF, 3NF)
│   ├── seed.sql              # Realistic B.Tech CSE Semester VI Seed Data
│   ├── queries.sql           # 10 Demonstration Evaluation Queries (JOINs, GROUP BY, HAVING, subqueries)
│   ├── views.sql             # 3 Reporting Views (Progress, Performance, Submissions)
│   ├── procedures.sql        # Stored Procedures (GetStudentPerformance, CalculateQuizScore)
│   └── README.md             # Normalization proofs & ER documentation
│
└── README.md
```

---

## 🚀 Quick Start Guide (Run from VS Code)

### 1. Start the Backend API Server
Open a terminal in VS Code:
```bash
cd backend
npm install
npm start
```
*The backend starts at `http://localhost:5000`. It will connect to MySQL if running or automatically operate in relational in-memory simulation mode.*

### 2. Start the Frontend Application
Open a second terminal in VS Code:
```bash
cd frontend
npm install
npm run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 🔑 Demo Login Accounts

| Role | Email | Password | Features Accessible |
|---|---|---|---|
| **Student** | `student@studysphere.edu` | `password123` | Dashboard, Courses, Resources, Assignments, Quizzes, Study Planner, Progress, Profile |
| **Faculty** | `faculty@studysphere.edu` | `password123` | Faculty Dashboard, My Courses, Student Submissions (Grading Modal), Student Roster |
| **Admin** | `admin@studysphere.edu` | `password123` | Admin Dashboard, Student Directory, Faculty Registry, Departments, Course Registry |

> **Evaluator Tip:** The sidebar includes an **Active Portal View** dropdown switcher allowing 1-click toggling between Student, Faculty, and Admin portals at any time!

---

## 🗄️ Relational Database (MySQL) Setup

To load the database directly into your local MySQL server:

```sql
-- In MySQL Shell or Workbench:
SOURCE database/schema.sql;
SOURCE database/seed.sql;
SOURCE database/views.sql;
SOURCE database/procedures.sql;

-- Run demonstration evaluation queries:
SOURCE database/queries.sql;
```

### Relational Schema Entities (19 Tables):
- `department`
- `user`
- `student`
- `faculty`
- `admin`
- `course`
- `enrollment`
- `module`
- `resource`
- `bookmark`
- `assignment`
- `submission`
- `quiz`
- `question`
- `quiz_option`
- `quiz_attempt`
- `student_answer`
- `study_task`
- `notification`
