-- ============================================================================
-- StudySphere — Academic Learning, Assessment & Study Management Portal
-- Demonstration SQL Queries for College DBMS Project Evaluation
-- Concepts Demonstrated:
--  - Multi-table INNER JOIN, LEFT JOIN
--  - Aggregate Functions (COUNT, AVG, SUM, MAX, MIN)
--  - GROUP BY and HAVING Clauses
--  - Subqueries (Scalar, Correlated, IN, NOT EXISTS)
--  - Conditional Logic (CASE WHEN)
-- ============================================================================

USE studysphere_db;

-- ----------------------------------------------------------------------------
-- QUERY 1: List all students enrolled in a specific course (CS301 - DBMS)
-- Demonstrates: 3-table INNER JOIN, ORDER BY
-- ----------------------------------------------------------------------------
SELECT 
    s.roll_number,
    CONCAT(u.first_name, ' ', u.last_name) AS student_name,
    u.email,
    s.semester,
    e.enrollment_date,
    e.progress_percentage
FROM enrollment e
JOIN student s ON e.student_id = s.student_id
JOIN user u ON s.user_id = u.user_id
JOIN course c ON e.course_id = c.course_id
WHERE c.course_code = 'CS301' AND e.status = 'ACTIVE'
ORDER BY s.roll_number ASC;

-- ----------------------------------------------------------------------------
-- QUERY 2: Courses taught by faculty with department details
-- Demonstrates: Multi-table JOIN with string concatenation
-- ----------------------------------------------------------------------------
SELECT 
    f.employee_code,
    CONCAT(u.first_name, ' ', u.last_name) AS faculty_name,
    f.designation,
    d.department_code,
    c.course_code,
    c.course_name,
    c.credits,
    c.academic_session
FROM course c
JOIN faculty f ON c.faculty_id = f.faculty_id
JOIN user u ON f.user_id = u.user_id
JOIN department d ON c.department_id = d.department_id
ORDER BY faculty_name, c.course_code;

-- ----------------------------------------------------------------------------
-- QUERY 3: Find students who have NOT submitted a specific assignment
-- Demonstrates: NOT EXISTS with Correlated Subquery (Crucial DBMS Concept)
-- ----------------------------------------------------------------------------
SELECT 
    s.student_id,
    s.roll_number,
    CONCAT(u.first_name, ' ', u.last_name) AS student_name,
    c.course_code,
    a.title AS pending_assignment,
    a.due_date
FROM enrollment e
JOIN student s ON e.student_id = s.student_id
JOIN user u ON s.user_id = u.user_id
JOIN course c ON e.course_id = c.course_id
JOIN assignment a ON c.course_id = a.course_id
WHERE a.assignment_id = 1
  AND NOT EXISTS (
      SELECT 1 
      FROM submission sub 
      WHERE sub.assignment_id = a.assignment_id 
        AND sub.student_id = s.student_id
  );

-- ----------------------------------------------------------------------------
-- QUERY 4: Course-wise Enrollment Statistics with Faculty and Credit breakdown
-- Demonstrates: LEFT JOIN, COUNT, GROUP BY
-- ----------------------------------------------------------------------------
SELECT 
    c.course_code,
    c.course_name,
    CONCAT(u.first_name, ' ', u.last_name) AS faculty_in_charge,
    c.credits,
    COUNT(e.student_id) AS total_enrolled_students,
    ROUND(AVG(e.progress_percentage), 2) AS average_student_progress
FROM course c
LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
LEFT JOIN user u ON f.user_id = u.user_id
LEFT JOIN enrollment e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_code, c.course_name, u.first_name, u.last_name, c.credits
ORDER BY total_enrolled_students DESC;

-- ----------------------------------------------------------------------------
-- QUERY 5: Assignment Submission Summary with Graded vs Pending Counts
-- Demonstrates: Conditional Aggregation (SUM with CASE WHEN)
-- ----------------------------------------------------------------------------
SELECT 
    c.course_code,
    a.assignment_id,
    a.title AS assignment_title,
    a.maximum_marks,
    a.due_date,
    COUNT(sub.submission_id) AS total_submissions,
    SUM(CASE WHEN sub.status = 'EVALUATED' THEN 1 ELSE 0 END) AS evaluated_submissions,
    SUM(CASE WHEN sub.status IN ('SUBMITTED', 'LATE') THEN 1 ELSE 0 END) AS pending_evaluation,
    ROUND(AVG(sub.marks_obtained), 2) AS average_marks_obtained
FROM assignment a
JOIN course c ON a.course_id = c.course_id
LEFT JOIN submission sub ON a.assignment_id = sub.assignment_id
GROUP BY c.course_code, a.assignment_id, a.title, a.maximum_marks, a.due_date
ORDER BY c.course_code, a.due_date;

-- ----------------------------------------------------------------------------
-- QUERY 6: Average Quiz Performance by Course and Quiz
-- Demonstrates: Multiple Table Aggregation, AVG, MIN, MAX
-- ----------------------------------------------------------------------------
SELECT 
    c.course_code,
    q.title AS quiz_title,
    q.total_marks,
    COUNT(qa.attempt_id) AS total_attempts,
    ROUND(AVG(qa.score_obtained), 2) AS average_score,
    MAX(qa.score_obtained) AS highest_score,
    MIN(qa.score_obtained) AS lowest_score
FROM quiz q
JOIN course c ON q.course_id = c.course_id
LEFT JOIN quiz_attempt qa ON q.quiz_id = qa.quiz_id
GROUP BY c.course_code, q.quiz_id, q.title, q.total_marks;

-- ----------------------------------------------------------------------------
-- QUERY 7: Highest-Performing Students based on CGPA and Assignment Scores
-- Demonstrates: Nested subqueries with filtering and ranking
-- ----------------------------------------------------------------------------
SELECT 
    s.roll_number,
    CONCAT(u.first_name, ' ', u.last_name) AS student_name,
    s.cgpa,
    d.department_code,
    COUNT(DISTINCT e.course_id) AS active_courses,
    ROUND(AVG(sub.marks_obtained), 2) AS avg_assignment_marks
FROM student s
JOIN user u ON s.user_id = u.user_id
JOIN department d ON s.department_id = d.department_id
JOIN enrollment e ON s.student_id = e.student_id
LEFT JOIN submission sub ON s.student_id = sub.student_id AND sub.status = 'EVALUATED'
GROUP BY s.student_id, s.roll_number, u.first_name, u.last_name, s.cgpa, d.department_code
HAVING s.cgpa >= 8.50
ORDER BY s.cgpa DESC;

-- ----------------------------------------------------------------------------
-- QUERY 8: Most Bookmarked Resources across the Platform
-- Demonstrates: GROUP BY with COUNT and HAVING threshold
-- ----------------------------------------------------------------------------
SELECT 
    r.resource_id,
    r.title AS resource_title,
    r.resource_type,
    c.course_code,
    m.module_title,
    COUNT(b.bookmark_id) AS bookmark_count
FROM resource r
JOIN course c ON r.course_id = c.course_id
LEFT JOIN module m ON r.module_id = m.module_id
LEFT JOIN bookmark b ON r.resource_id = b.resource_id
GROUP BY r.resource_id, r.title, r.resource_type, c.course_code, m.module_title
ORDER BY bookmark_count DESC;

-- ----------------------------------------------------------------------------
-- QUERY 9: Courses with Below-Average Overall Student Progress
-- Demonstrates: Subquery in HAVING clause comparing against global average
-- ----------------------------------------------------------------------------
SELECT 
    c.course_code,
    c.course_name,
    ROUND(AVG(e.progress_percentage), 2) AS course_avg_progress
FROM course c
JOIN enrollment e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_code, c.course_name
HAVING AVG(e.progress_percentage) < (
    SELECT AVG(progress_percentage) FROM enrollment
)
ORDER BY course_avg_progress ASC;

-- ----------------------------------------------------------------------------
-- QUERY 10: Student Study Task Completion Rate Breakdown
-- Demonstrates: Complex Percentage Calculation & Multiple CASE Statements
-- ----------------------------------------------------------------------------
SELECT 
    s.roll_number,
    CONCAT(u.first_name, ' ', u.last_name) AS student_name,
    COUNT(t.task_id) AS total_study_tasks,
    SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_tasks,
    SUM(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 ELSE 0 END) AS in_progress_tasks,
    SUM(CASE WHEN t.status = 'PENDING' THEN 1 ELSE 0 END) AS pending_tasks,
    ROUND(
        (SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END) / NULLIF(COUNT(t.task_id), 0)) * 100, 
        1
    ) AS completion_percentage
FROM student s
JOIN user u ON s.user_id = u.user_id
LEFT JOIN study_task t ON s.student_id = t.student_id
GROUP BY s.student_id, s.roll_number, u.first_name, u.last_name;
