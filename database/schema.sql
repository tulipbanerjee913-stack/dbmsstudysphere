-- ============================================================================
-- StudySphere — Academic Learning, Assessment & Study Management Portal
-- Relational Database Schema (MySQL 8.0+)
-- Architecture: 1NF, 2NF, 3NF Compliant
-- ============================================================================

DROP DATABASE IF EXISTS studysphere_db;
CREATE DATABASE studysphere_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE studysphere_db;

-- ----------------------------------------------------------------------------
-- 1. DEPARTMENT Table
-- Stores academic departments within the institution
-- ----------------------------------------------------------------------------
CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(10) NOT NULL UNIQUE,
    department_name VARCHAR(100) NOT NULL,
    head_of_department VARCHAR(100),
    contact_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. USER Table
-- Base table for authentication and user identities across all roles
-- ----------------------------------------------------------------------------
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    avatar_url VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role),
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. STUDENT Table
-- Specialization table for students (1:1 with USER where role = 'STUDENT')
-- ----------------------------------------------------------------------------
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    department_id INT NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    academic_year VARCHAR(10) NOT NULL,
    cgpa DECIMAL(3, 2) DEFAULT 0.00 CHECK (cgpa >= 0.00 AND cgpa <= 10.00),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE RESTRICT,
    INDEX idx_student_dept (department_id),
    INDEX idx_student_roll (roll_number)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. FACULTY Table
-- Specialization table for faculty members (1:1 with USER where role = 'FACULTY')
-- ----------------------------------------------------------------------------
CREATE TABLE faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    employee_code VARCHAR(20) NOT NULL UNIQUE,
    department_id INT NOT NULL,
    designation VARCHAR(60) NOT NULL,
    qualification VARCHAR(100),
    office_room VARCHAR(30),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE RESTRICT,
    INDEX idx_faculty_dept (department_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. ADMIN Table
-- Specialization table for administrators (1:1 with USER where role = 'ADMIN')
-- ----------------------------------------------------------------------------
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    admin_code VARCHAR(20) NOT NULL UNIQUE,
    office_location VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 6. COURSE Table
-- Academic courses offered by departments, instructed by faculty
-- ----------------------------------------------------------------------------
CREATE TABLE course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(15) NOT NULL UNIQUE,
    course_name VARCHAR(150) NOT NULL,
    description TEXT,
    credits INT NOT NULL CHECK (credits BETWEEN 1 AND 6),
    department_id INT NOT NULL,
    faculty_id INT,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    academic_session VARCHAR(20) NOT NULL DEFAULT 'Spring 2026',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE RESTRICT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL,
    INDEX idx_course_dept (department_id),
    INDEX idx_course_faculty (faculty_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 7. ENROLLMENT Table
-- Junction table between Student and Course (M:N Relationship)
-- ----------------------------------------------------------------------------
CREATE TABLE enrollment (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    status ENUM('ACTIVE', 'COMPLETED', 'DROPPED') NOT NULL DEFAULT 'ACTIVE',
    progress_percentage DECIMAL(5, 2) NOT NULL DEFAULT 0.00 CHECK (progress_percentage BETWEEN 0 AND 100),
    final_grade VARCHAR(5),
    UNIQUE KEY uq_student_course (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    INDEX idx_enrollment_student (student_id),
    INDEX idx_enrollment_course (course_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 8. MODULE Table
-- Course curriculum breakdown into structured units
-- ----------------------------------------------------------------------------
CREATE TABLE module (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_number INT NOT NULL,
    module_title VARCHAR(150) NOT NULL,
    description TEXT,
    estimated_hours INT DEFAULT 8,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE KEY uq_course_module_num (course_id, module_number),
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    INDEX idx_module_course (course_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 9. RESOURCE Table
-- Learning resources associated with a module/course
-- ----------------------------------------------------------------------------
CREATE TABLE resource (
    resource_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_id INT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    resource_type ENUM('Notes', 'PDF', 'Video', 'Link', 'Previous Year Paper') NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    file_size_kb INT DEFAULT 0,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES module(module_id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES faculty(faculty_id) ON DELETE RESTRICT,
    INDEX idx_resource_course (course_id),
    INDEX idx_resource_type (resource_type)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 10. BOOKMARK Table
-- Student-specific saved resources for quick revision
-- ----------------------------------------------------------------------------
CREATE TABLE bookmark (
    bookmark_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    resource_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_student_resource_bookmark (student_id, resource_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resource(resource_id) ON DELETE CASCADE,
    INDEX idx_bookmark_student (student_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 11. ASSIGNMENT Table
-- Course/Module homework, lab assignments, and project deliverables
-- ----------------------------------------------------------------------------
CREATE TABLE assignment (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_id INT,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    maximum_marks INT NOT NULL DEFAULT 100 CHECK (maximum_marks > 0),
    weightage_percent INT DEFAULT 10 CHECK (weightage_percent BETWEEN 0 AND 100),
    due_date DATETIME NOT NULL,
    allow_late_submission BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES module(module_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES faculty(faculty_id) ON DELETE RESTRICT,
    INDEX idx_assignment_course (course_id),
    INDEX idx_assignment_due (due_date)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 12. SUBMISSION Table
-- Student work submitted against an assignment
-- ----------------------------------------------------------------------------
CREATE TABLE submission (
    submission_id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    submission_text TEXT,
    file_attachment_url VARCHAR(255),
    submitted_at DATETIME NOT NULL,
    status ENUM('SUBMITTED', 'EVALUATED', 'LATE') NOT NULL DEFAULT 'SUBMITTED',
    marks_obtained DECIMAL(5, 2) DEFAULT NULL,
    feedback TEXT,
    graded_by INT DEFAULT NULL,
    graded_at DATETIME DEFAULT NULL,
    UNIQUE KEY uq_student_assignment (assignment_id, student_id),
    FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES faculty(faculty_id) ON DELETE SET NULL,
    INDEX idx_submission_student (student_id),
    INDEX idx_submission_status (status)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 13. QUIZ Table
-- Structured multiple choice quizzes
-- ----------------------------------------------------------------------------
CREATE TABLE quiz (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_id INT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL DEFAULT 20 CHECK (duration_minutes > 0),
    total_marks INT NOT NULL DEFAULT 20,
    passing_marks INT NOT NULL DEFAULT 8,
    due_date DATETIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES module(module_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES faculty(faculty_id) ON DELETE RESTRICT,
    INDEX idx_quiz_course (course_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 14. QUESTION Table
-- Multiple choice questions belonging to a quiz
-- ----------------------------------------------------------------------------
CREATE TABLE question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_number INT NOT NULL,
    question_text TEXT NOT NULL,
    explanation TEXT,
    marks DECIMAL(3, 1) NOT NULL DEFAULT 1.0,
    UNIQUE KEY uq_quiz_question_num (quiz_id, question_number),
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE,
    INDEX idx_question_quiz (quiz_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 15. QUIZ_OPTION Table
-- Options for each multiple choice question
-- ----------------------------------------------------------------------------
CREATE TABLE quiz_option (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_label CHAR(1) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE KEY uq_question_option_label (question_id, option_label),
    FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
    INDEX idx_option_question (question_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 16. QUIZ_ATTEMPT Table
-- Records a student taking a quiz session
-- ----------------------------------------------------------------------------
CREATE TABLE quiz_attempt (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    student_id INT NOT NULL,
    started_at DATETIME NOT NULL,
    completed_at DATETIME DEFAULT NULL,
    score_obtained DECIMAL(5, 2) DEFAULT 0.00,
    total_questions INT NOT NULL DEFAULT 0,
    correct_count INT NOT NULL DEFAULT 0,
    incorrect_count INT NOT NULL DEFAULT 0,
    status ENUM('IN_PROGRESS', 'COMPLETED', 'ABANDONED') NOT NULL DEFAULT 'IN_PROGRESS',
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    INDEX idx_attempt_student (student_id),
    INDEX idx_attempt_quiz (quiz_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 17. STUDENT_ANSWER Table
-- Granular responses chosen by a student during a quiz attempt
-- ----------------------------------------------------------------------------
CREATE TABLE student_answer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option_id INT,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempt(attempt_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES quiz_option(option_id) ON DELETE SET NULL,
    UNIQUE KEY uq_attempt_question (attempt_id, question_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 18. STUDY_TASK Table
-- Personal study planner tasks for students
-- ----------------------------------------------------------------------------
CREATE TABLE study_task (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT,
    title VARCHAR(150) NOT NULL,
    topic VARCHAR(100),
    priority ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM',
    due_date DATE NOT NULL,
    estimated_duration_minutes INT DEFAULT 45,
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE SET NULL,
    INDEX idx_task_student (student_id),
    INDEX idx_task_status (status),
    INDEX idx_task_due (due_date)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 19. NOTIFICATION Table
-- System and academic alert notifications for users
-- ----------------------------------------------------------------------------
CREATE TABLE notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('DEADLINE', 'GRADE', 'ANNOUNCEMENT', 'SYSTEM') NOT NULL DEFAULT 'ANNOUNCEMENT',
    link_url VARCHAR(255),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    INDEX idx_notification_user (user_id, is_read)
) ENGINE=InnoDB;
