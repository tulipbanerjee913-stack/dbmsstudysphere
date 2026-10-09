import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layouts/AppLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Student Pages
import { DashboardPage } from './pages/student/DashboardPage';
import { CoursesPage } from './pages/student/CoursesPage';
import { CourseDetailsPage } from './pages/student/CourseDetailsPage';
import { ResourcesPage } from './pages/student/ResourcesPage';
import { AssignmentsPage } from './pages/student/AssignmentsPage';
import { AssignmentDetailsPage } from './pages/student/AssignmentDetailsPage';
import { QuizzesPage } from './pages/student/QuizzesPage';
import { QuizAttemptPage } from './pages/student/QuizAttemptPage';
import { StudyPlannerPage } from './pages/student/StudyPlannerPage';
import { ProgressPage } from './pages/student/ProgressPage';
import { ProfilePage } from './pages/student/ProfilePage';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyCourses } from './pages/faculty/FacultyCourses';
import { FacultySubmissions } from './pages/faculty/FacultySubmissions';
import { FacultyStudents } from './pages/faculty/FacultyStudents';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminFaculty } from './pages/admin/AdminFaculty';
import { AdminDepartments } from './pages/admin/AdminDepartments';
import { AdminCourses } from './pages/admin/AdminCourses';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Application Routes under AppLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Index redirects to student dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Student Routes */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/:id" element={<CourseDetailsPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="assignments/:id" element={<AssignmentDetailsPage />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="quizzes/:id" element={<QuizAttemptPage />} />
            <Route path="study-planner" element={<StudyPlannerPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="profile" element={<ProfilePage />} />

            {/* Faculty Routes */}
            <Route path="faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="faculty/courses" element={<FacultyCourses />} />
            <Route path="faculty/submissions" element={<FacultySubmissions />} />
            <Route path="faculty/students" element={<FacultyStudents />} />

            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/students" element={<AdminStudents />} />
            <Route path="admin/faculty" element={<AdminFaculty />} />
            <Route path="admin/departments" element={<AdminDepartments />} />
            <Route path="admin/courses" element={<AdminCourses />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
