# StudySphere Database Architecture & Relational Design

This documentation provides the theoretical database specifications, relational normalization proofs (1NF, 2NF, 3NF), and execution guides for the **StudySphere** DBMS College Project.

---

## 1. Entity-Relationship Overview

StudySphere is modeled around **19 relational entities**:

1. **`department`**: Core academic division (`department_id` PK, `department_code` UNIQUE).
2. **`user`**: Unified authentication credentials and identity (`user_id` PK, `email` UNIQUE, `role` ENUM).
3. **`student`**: Student profiles (`student_id` PK, `user_id` FK, `roll_number` UNIQUE).
4. **`faculty`**: Academic faculty profiles (`faculty_id` PK, `user_id` FK, `employee_code` UNIQUE).
5. **`admin`**: Administrative staff (`admin_id` PK, `user_id` FK, `admin_code` UNIQUE).
6. **`course`**: Subjects offered (`course_id` PK, `course_code` UNIQUE, `department_id` FK, `faculty_id` FK).
7. **`enrollment`**: Many-to-Many junction between `student` and `course` (`(student_id, course_id)` UNIQUE).
8. **`module`**: Course syllabus modules (`module_id` PK, `course_id` FK, `(course_id, module_number)` UNIQUE).
9. **`resource`**: Course learning materials (`resource_id` PK, `course_id` FK, `module_id` FK, `uploaded_by` FK).
10. **`bookmark`**: Student saved resources (`bookmark_id` PK, `(student_id, resource_id)` UNIQUE).
11. **`assignment`**: Tasks created by faculty (`assignment_id` PK, `course_id` FK, `created_by` FK).
12. **`submission`**: Student deliverables (`submission_id` PK, `(assignment_id, student_id)` UNIQUE).
13. **`quiz`**: Timed tests (`quiz_id` PK, `course_id` FK, `created_by` FK).
14. **`question`**: Multiple choice questions (`question_id` PK, `quiz_id` FK, `(quiz_id, question_number)` UNIQUE).
15. **`quiz_option`**: Options for questions (`option_id` PK, `question_id` FK, `(question_id, option_label)` UNIQUE).
16. **`quiz_attempt`**: Student test sessions (`attempt_id` PK, `quiz_id` FK, `student_id` FK).
17. **`student_answer`**: Selected choices in attempts (`answer_id` PK, `(attempt_id, question_id)` UNIQUE).
18. **`study_task`**: Personal student planner items (`task_id` PK, `student_id` FK, `course_id` FK).
19. **`notification`**: Academic and alert notifications (`notification_id` PK, `user_id` FK).

---

## 2. Normalization Analysis (1NF, 2NF, 3NF)

### First Normal Form (1NF)
- **Criterion**: Every attribute contains only atomic (indivisible) values; no repeating groups or multivalued arrays.
- **Verification**:
  - Full names are separated into `first_name` and `last_name`.
  - Quiz options are decomposed into a dedicated `quiz_option` table rather than comma-separated lists or JSON strings.
  - Multi-valued enrollments and submissions are modeled through normalized junction tables with unique primary/composite keys.

### Second Normal Form (2NF)
- **Criterion**: Must be in 1NF, and every non-prime attribute must be fully functionally dependent on the entire primary key (no partial dependencies on composite keys).
- **Verification**:
  - In `enrollment(student_id, course_id)`, non-key attributes (`progress_percentage`, `enrollment_date`, `status`) depend on the specific student-course pair. Student attributes (`cgpa`, `roll_number`) are stored in `student`, and course credits are stored in `course`.
  - In `submission(assignment_id, student_id)`, `submitted_at` and `marks_obtained` depend on both the student and the assignment. Assignment details (`due_date`, `maximum_marks`) reside strictly in `assignment`.

### Third Normal Form (3NF)
- **Criterion**: Must be in 2NF, and no non-prime attribute may be transitively dependent on the primary key ($X \rightarrow Y$ must satisfy either $X$ is a superkey or $Y$ is a prime attribute).
- **Verification**:
  - `course` references `department_id` instead of storing `department_name` and `head_of_department` directly.
  - `student` and `faculty` reference `user_id`, eliminating transitive user credential dependencies.
  - `resource` stores `uploaded_by` (faculty ID) without redundantly repeating faculty designations or names.

---

## 3. Relational Database Integrity & Constraints

- **Primary Keys**: Auto-incrementing surrogate integer keys across all tables for efficient B-tree indexing.
- **Candidate & Unique Keys**:
  - `user(email)`
  - `student(roll_number)`
  - `course(course_code)`
  - `department(department_code)`
  - `enrollment(student_id, course_id)`
  - `submission(assignment_id, student_id)`
  - `module(course_id, module_number)`
  - `quiz_option(question_id, option_label)`
- **Foreign Keys & Referential Integrity**:
  - Cascade Deletions: Cascaded cleanly where parent owns child (`course` $\rightarrow$ `module` $\rightarrow$ `resource`, `user` $\rightarrow$ `student`).
  - Restrict/Set Null: Preserved on audit references (e.g. `course.faculty_id` `ON DELETE SET NULL`, `course.department_id` `ON DELETE RESTRICT`).
- **Check Constraints**:
  - `student.cgpa BETWEEN 0.00 AND 10.00`
  - `enrollment.progress_percentage BETWEEN 0 AND 100`
  - `assignment.maximum_marks > 0`
  - `quiz.duration_minutes > 0`

---

## 4. How to Execute in MySQL

```bash
# 1. Login to MySQL
mysql -u root -p

# 2. Source the schema
source c:/embedded project/singlestackrtos/StudySphere/database/schema.sql;

# 3. Source the seed data
source c:/embedded project/singlestackrtos/StudySphere/database/seed.sql;

# 4. Source the views and stored procedures
source c:/embedded project/singlestackrtos/StudySphere/database/views.sql;
source c:/embedded project/singlestackrtos/StudySphere/database/procedures.sql;

# 5. Run demonstration queries
source c:/embedded project/singlestackrtos/StudySphere/database/queries.sql;
```
