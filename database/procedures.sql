-- ============================================================================
-- StudySphere — Academic Learning, Assessment & Study Management Portal
-- Stored Procedures for Transactional Operations & Academic Analytics
-- ============================================================================

USE studysphere_db;

DELIMITER $$

-- ----------------------------------------------------------------------------
-- PROCEDURE 1: GetStudentPerformance
-- Returns a comprehensive performance summary for a given student ID
-- Calculates enrolled courses, average progress, assignments submitted,
-- evaluated count, average assignment percentage, and quiz accuracy.
-- ----------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS GetStudentPerformance$$
CREATE PROCEDURE GetStudentPerformance(IN p_student_id INT)
BEGIN
    -- Declare summary metrics
    DECLARE v_student_exists INT DEFAULT 0;
    
    -- Check student existence
    SELECT COUNT(*) INTO v_student_exists 
    FROM student 
    WHERE student_id = p_student_id;
    
    IF v_student_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student record not found for the given ID.';
    END IF;

    -- Result Set 1: Student Demographics & High-Level Metrics
    SELECT 
        s.student_id,
        s.roll_number,
        CONCAT(u.first_name, ' ', u.last_name) AS full_name,
        u.email,
        d.department_name,
        s.semester,
        s.cgpa,
        COUNT(DISTINCT e.course_id) AS enrolled_courses_count,
        ROUND(AVG(e.progress_percentage), 2) AS overall_avg_progress
    FROM student s
    JOIN user u ON s.user_id = u.user_id
    JOIN department d ON s.department_id = d.department_id
    LEFT JOIN enrollment e ON s.student_id = e.student_id AND e.status = 'ACTIVE'
    WHERE s.student_id = p_student_id
    GROUP BY s.student_id, s.roll_number, u.first_name, u.last_name, u.email, d.department_name, s.semester, s.cgpa;

    -- Result Set 2: Course-by-Course Progress Breakdown
    SELECT 
        c.course_code,
        c.course_name,
        c.credits,
        e.progress_percentage,
        COUNT(DISTINCT a.assignment_id) AS total_assignments,
        COUNT(DISTINCT sub.submission_id) AS submitted_assignments
    FROM enrollment e
    JOIN course c ON e.course_id = c.course_id
    LEFT JOIN assignment a ON c.course_id = a.course_id
    LEFT JOIN submission sub ON a.assignment_id = sub.assignment_id AND sub.student_id = p_student_id
    WHERE e.student_id = p_student_id
    GROUP BY c.course_id, c.course_code, c.course_name, c.credits, e.progress_percentage;

    -- Result Set 3: Quiz History & Accuracy
    SELECT 
        q.title AS quiz_title,
        c.course_code,
        qa.started_at,
        qa.score_obtained,
        qa.total_questions,
        qa.correct_count,
        qa.incorrect_count,
        ROUND((qa.score_obtained / NULLIF(q.total_marks, 0)) * 100, 1) AS score_percentage
    FROM quiz_attempt qa
    JOIN quiz q ON qa.quiz_id = q.quiz_id
    JOIN course c ON q.course_id = c.course_id
    WHERE qa.student_id = p_student_id AND qa.status = 'COMPLETED'
    ORDER BY qa.started_at DESC;

END$$

-- ----------------------------------------------------------------------------
-- PROCEDURE 2: CalculateQuizScore
-- Evaluates all student answers for an attempt, updates score_obtained,
-- marks correct/incorrect counts, and marks attempt as COMPLETED.
-- ----------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS CalculateQuizScore$$
CREATE PROCEDURE CalculateQuizScore(IN p_attempt_id INT)
BEGIN
    DECLARE v_correct_count INT DEFAULT 0;
    DECLARE v_incorrect_count INT DEFAULT 0;
    DECLARE v_total_questions INT DEFAULT 0;
    DECLARE v_score DECIMAL(5, 2) DEFAULT 0.00;

    -- 1. Update correctness flag for each submitted student answer
    UPDATE student_answer sa
    JOIN quiz_option qo ON sa.selected_option_id = qo.option_id
    SET sa.is_correct = qo.is_correct
    WHERE sa.attempt_id = p_attempt_id;

    -- 2. Aggregate correct and incorrect answers
    SELECT 
        COUNT(*),
        COALESCE(SUM(CASE WHEN sa.is_correct = TRUE THEN 1 ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN sa.is_correct = FALSE THEN 1 ELSE 0 END), 0)
    INTO 
        v_total_questions,
        v_correct_count,
        v_incorrect_count
    FROM student_answer sa
    WHERE sa.attempt_id = p_attempt_id;

    -- 3. Calculate score based on question marks
    SELECT COALESCE(SUM(q.marks), 0.00)
    INTO v_score
    FROM student_answer sa
    JOIN question q ON sa.question_id = q.question_id
    WHERE sa.attempt_id = p_attempt_id AND sa.is_correct = TRUE;

    -- 4. Finalize the quiz_attempt record
    UPDATE quiz_attempt
    SET 
        score_obtained = v_score,
        total_questions = v_total_questions,
        correct_count = v_correct_count,
        incorrect_count = v_incorrect_count,
        status = 'COMPLETED',
        completed_at = NOW()
    WHERE attempt_id = p_attempt_id;

    -- Return the updated attempt summary
    SELECT 
        attempt_id,
        quiz_id,
        student_id,
        score_obtained,
        total_questions,
        correct_count,
        incorrect_count,
        status,
        completed_at
    FROM quiz_attempt
    WHERE attempt_id = p_attempt_id;

END$$

DELIMITER ;
