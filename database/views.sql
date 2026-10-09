-- ============================================================================
-- StudySphere — Academic Learning, Assessment & Study Management Portal
-- Database Views for Simplified Reporting and Complex Query Encapsulation
-- ============================================================================

USE studysphere_db;

-- ----------------------------------------------------------------------------
-- VIEW 1: student_course_progress
-- Aggregates student enrollment progress, faculty name, and department
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW student_course_progress AS
SELECT 
    s.student_id,
    s.roll_number,
    CONCAT(su.first_name, ' ', su.last_name) AS student_name,
    su.email AS student_email,
    c.course_id,
    c.course_code,
    c.course_name,
    c.credits,
    d.department_name,
    CONCAT(fu.first_name, ' ', fu.last_name) AS faculty_name,
    e.enrollment_date,
    e.progress_percentage,
    e.status AS enrollment_status
FROM enrollment e
JOIN student s ON e.student_id = s.student_id
JOIN user su ON s.user_id = su.user_id
JOIN course c ON e.course_id = c.course_id
JOIN department d ON c.department_id = d.department_id
LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
LEFT JOIN user fu ON f.user_id = fu.user_id;

-- ----------------------------------------------------------------------------
-- VIEW 2: course_performance
-- Summarizes overall course metrics: enrolled count, average progress, 
-- assignments count, and quizzes count
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW course_performance AS
SELECT 
    c.course_id,
    c.course_code,
    c.course_name,
    c.credits,
    d.department_code,
    CONCAT(fu.first_name, ' ', fu.last_name) AS faculty_in_charge,
    COUNT(DISTINCT e.student_id) AS total_students_enrolled,
    ROUND(COALESCE(AVG(e.progress_percentage), 0), 2) AS avg_class_progress,
    COUNT(DISTINCT a.assignment_id) AS total_assignments,
    COUNT(DISTINCT q.quiz_id) AS total_quizzes,
    COUNT(DISTINCT r.resource_id) AS total_resources
FROM course c
JOIN department d ON c.department_id = d.department_id
LEFT JOIN faculty f ON c.faculty_id = f.faculty_id
LEFT JOIN user fu ON f.user_id = fu.user_id
LEFT JOIN enrollment e ON c.course_id = e.course_id
LEFT JOIN assignment a ON c.course_id = a.course_id
LEFT JOIN quiz q ON c.course_id = q.course_id
LEFT JOIN resource r ON c.course_id = r.course_id
GROUP BY c.course_id, c.course_code, c.course_name, c.credits, d.department_code, fu.first_name, fu.last_name;

-- ----------------------------------------------------------------------------
-- VIEW 3: assignment_submission_summary
-- Provides instructors and admins a real-time status of each assignment
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW assignment_submission_summary AS
SELECT 
    a.assignment_id,
    a.title AS assignment_title,
    c.course_code,
    c.course_name,
    a.due_date,
    a.maximum_marks,
    COUNT(DISTINCT e.student_id) AS total_eligible_students,
    COUNT(DISTINCT sub.student_id) AS total_submitted_count,
    COUNT(DISTINCT e.student_id) - COUNT(DISTINCT sub.student_id) AS pending_submission_count,
    SUM(CASE WHEN sub.status = 'EVALUATED' THEN 1 ELSE 0 END) AS evaluated_count,
    ROUND(AVG(sub.marks_obtained), 2) AS average_score
FROM assignment a
JOIN course c ON a.course_id = c.course_id
JOIN enrollment e ON c.course_id = e.course_id
LEFT JOIN submission sub ON a.assignment_id = sub.assignment_id AND sub.student_id = e.student_id
GROUP BY a.assignment_id, a.title, c.course_code, c.course_name, a.due_date, a.maximum_marks;
