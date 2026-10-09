-- ============================================================================
-- StudySphere — Academic Learning, Assessment & Study Management Portal
-- Database Seed Data (Indian Engineering College - B.Tech CSE Semester VI)
-- ============================================================================

USE studysphere_db;

-- Clear previous data in reverse foreign key order
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE notification;
TRUNCATE TABLE study_task;
TRUNCATE TABLE student_answer;
TRUNCATE TABLE quiz_attempt;
TRUNCATE TABLE quiz_option;
TRUNCATE TABLE question;
TRUNCATE TABLE quiz;
TRUNCATE TABLE submission;
TRUNCATE TABLE assignment;
TRUNCATE TABLE bookmark;
TRUNCATE TABLE resource;
TRUNCATE TABLE module;
TRUNCATE TABLE enrollment;
TRUNCATE TABLE course;
TRUNCATE TABLE admin;
TRUNCATE TABLE faculty;
TRUNCATE TABLE student;
TRUNCATE TABLE user;
TRUNCATE TABLE department;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. Insert DEPARTMENTS
-- ----------------------------------------------------------------------------
INSERT INTO department (department_id, department_code, department_name, head_of_department, contact_email) VALUES
(1, 'CSE', 'Computer Science and Engineering', 'Prof. A', 'hod.cse@studysphere.edu'),
(2, 'ECE', 'Electronics and Communication Engineering', 'Prof. B', 'hod.ece@studysphere.edu'),
(3, 'IT', 'Information Technology', 'Prof. C', 'hod.it@studysphere.edu'),
(4, 'MECH', 'Mechanical Engineering', 'Prof. D', 'hod.mech@studysphere.edu');

-- ----------------------------------------------------------------------------
-- 2. Insert USERS
-- (All default passwords hashed with bcrypt for 'password123')
-- ----------------------------------------------------------------------------
INSERT INTO user (user_id, email, password_hash, first_name, last_name, role, avatar_url, is_active) VALUES
-- Students
(1, 'student@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Tulip', 'Banerjee', 'STUDENT', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', TRUE),
(2, 'aarav.sharma@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Aarav', 'Sharma', 'STUDENT', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', TRUE),
(3, 'priya.nair@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Priya', 'Nair', 'STUDENT', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', TRUE),
-- Faculty
(4, 'faculty@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Prof.', 'A', 'FACULTY', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', TRUE),
(5, 'prof.b@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Prof.', 'B', 'FACULTY', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', TRUE),
(6, 'prof.c@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Prof.', 'C', 'FACULTY', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', TRUE),
-- Admin
(7, 'admin@studysphere.edu', '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', 'Academic', 'Dean', 'ADMIN', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', TRUE);

-- ----------------------------------------------------------------------------
-- 3. Insert STUDENTS
-- ----------------------------------------------------------------------------
INSERT INTO student (student_id, user_id, roll_number, department_id, semester, academic_year, cgpa) VALUES
(1, 1, '25BCE0499', 1, 6, '2022-2026', 8.92),
(2, 2, '21BCSE015', 1, 6, '2022-2026', 8.45),
(3, 3, '21BCSE078', 1, 6, '2022-2026', 9.10);

-- ----------------------------------------------------------------------------
-- 4. Insert FACULTY
-- ----------------------------------------------------------------------------
INSERT INTO faculty (faculty_id, user_id, employee_code, department_id, designation, qualification, office_room) VALUES
(1, 4, 'FAC-CSE-012', 1, 'Associate Professor', 'Ph.D. in Computer Science', 'Cabin 304, Tech Block'),
(2, 5, 'FAC-CSE-008', 1, 'Assistant Professor (Senior Grade)', 'M.S. & Ph.D. in Computer Engineering', 'Cabin 309, Tech Block'),
(3, 6, 'FAC-CSE-019', 1, 'Professor', 'Ph.D. in Distributed Systems', 'Cabin 202, Admin Wing');

-- ----------------------------------------------------------------------------
-- 5. Insert ADMIN
-- ----------------------------------------------------------------------------
INSERT INTO admin (admin_id, user_id, admin_code, office_location) VALUES
(1, 7, 'ADM-OFFICE-01', 'Academic Dean Office, Central Block');

-- ----------------------------------------------------------------------------
-- 6. Insert COURSES
-- ----------------------------------------------------------------------------
INSERT INTO course (course_id, course_code, course_name, description, credits, department_id, faculty_id, semester, academic_session, is_active) VALUES
(1, 'CS301', 'Database Management Systems', 'Comprehensive foundation covering relational model, SQL, normalization (1NF-3NF/BCNF), transactions (ACID), indexing, and concurrency control.', 4, 1, 1, 6, 'Spring 2026', TRUE),
(2, 'CS302', 'Operating Systems', 'Deep dive into process management, CPU scheduling algorithms, virtual memory paging, multithreading, synchronization deadlocks, and file systems.', 4, 1, 2, 6, 'Spring 2026', TRUE),
(3, 'CS303', 'Computer Networks', 'OSI and TCP/IP protocol suites, IP addressing, subnetting, routing protocols (OSPF, BGP), TCP flow & congestion control, and application layer protocols.', 3, 1, 3, 6, 'Spring 2026', TRUE),
(4, 'CS304', 'Data Structures & Algorithms', 'Advanced algorithm design: dynamic programming, graph algorithms (Dijkstra, Bellman-Ford), greedy methods, trees, and computational complexity.', 4, 1, 1, 6, 'Spring 2026', TRUE),
(5, 'CS305', 'Object Oriented Programming with Java', 'Enterprise Java paradigms: OOP principles, collections framework, exception handling, multithreading, JDBC connectivity, and design patterns.', 3, 1, 2, 6, 'Spring 2026', TRUE);

-- ----------------------------------------------------------------------------
-- 7. Insert ENROLLMENTS
-- ----------------------------------------------------------------------------
INSERT INTO enrollment (enrollment_id, student_id, course_id, enrollment_date, status, progress_percentage, final_grade) VALUES
-- Tulip (Student 1) enrolled in all 5 courses
(1, 1, 1, '2026-01-10', 'ACTIVE', 85.00, NULL),
(2, 1, 2, '2026-01-10', 'ACTIVE', 78.00, NULL),
(3, 1, 3, '2026-01-10', 'ACTIVE', 72.00, NULL),
(4, 1, 4, '2026-01-10', 'ACTIVE', 90.00, NULL),
(5, 1, 5, '2026-01-10', 'ACTIVE', 65.00, NULL),
-- Aarav (Student 2)
(6, 2, 1, '2026-01-10', 'ACTIVE', 70.00, NULL),
(7, 2, 2, '2026-01-10', 'ACTIVE', 65.00, NULL),
(8, 2, 3, '2026-01-10', 'ACTIVE', 80.00, NULL),
-- Priya (Student 3)
(9, 3, 1, '2026-01-10', 'ACTIVE', 95.00, NULL),
(10, 3, 2, '2026-01-10', 'ACTIVE', 92.00, NULL),
(11, 3, 4, '2026-01-10', 'ACTIVE', 88.00, NULL);

-- ----------------------------------------------------------------------------
-- 8. Insert MODULES (2 per course = 10 modules)
-- ----------------------------------------------------------------------------
INSERT INTO module (module_id, course_id, module_number, module_title, description, estimated_hours, is_published) VALUES
-- CS301 DBMS Modules
(1, 1, 1, 'Relational Model, ER Diagrams & SQL Foundations', 'Entity-Relationship modeling, relational algebra operators, DDL, DML queries, and integrity constraints.', 12, TRUE),
(2, 1, 2, 'Database Normalization & Transaction Processing', 'Functional dependencies, 1NF, 2NF, 3NF, BCNF, ACID transactions, serializability, and 2-Phase Locking.', 14, TRUE),
-- CS302 OS Modules
(3, 2, 1, 'Process Management & CPU Scheduling', 'Process control blocks, fork(), context switching, preemptive vs non-preemptive scheduling (FCFS, SJF, RR).', 10, TRUE),
(4, 2, 2, 'Process Synchronization & Virtual Memory', 'Semaphores, mutexes, dining philosophers problem, paging, page replacement (LRU, FIFO), and thrashing.', 14, TRUE),
-- CS303 CN Modules
(5, 3, 1, 'Data Link Layer & Network Layer Architecture', 'Framing, error detection (CRC), CSMA/CD, IPv4/IPv6 addressing, VLSM subnetting, and routing tables.', 12, TRUE),
(6, 3, 2, 'Transport & Application Layer Protocols', 'TCP 3-way handshake, sliding window, congestion control, UDP, DNS resolution, and HTTP/HTTPS handshake.', 10, TRUE),
-- CS304 DSA Modules
(7, 4, 1, 'Graph Theory & Shortest Path Algorithms', 'BFS, DFS, topological sorting, Dijkstra single-source shortest path, Prim and Kruskal MST algorithms.', 12, TRUE),
(8, 4, 2, 'Dynamic Programming & Divide-and-Conquer', 'Memoization vs tabulation, 0/1 Knapsack, Longest Common Subsequence, matrix chain multiplication.', 14, TRUE),
-- CS305 OOP Modules
(9, 5, 1, 'Core Java OOP & Exception Architecture', 'Encapsulation, inheritance hierarchies, abstract classes, interfaces, checked vs unchecked exceptions.', 10, TRUE),
(10, 5, 2, 'Java Collections Framework & Concurrency', 'List, Set, Map implementations, Generics, Thread life cycle, synchronization blocks, and ExecutorService.', 12, TRUE);

-- ----------------------------------------------------------------------------
-- 9. Insert RESOURCES (15 resources across courses & types)
-- ----------------------------------------------------------------------------
INSERT INTO resource (resource_id, course_id, module_id, title, description, resource_type, file_url, file_size_kb, uploaded_by, created_at) VALUES
(1, 1, 1, 'Lecture 01-04: Relational Algebra & Calculus Slides', 'Comprehensive PDF slides explaining projection, selection, Cartesian product, and Theta join.', 'PDF', 'https://studysphere.edu/res/dbms/relational_algebra.pdf', 3420, 1, '2026-01-15 10:00:00'),
(2, 1, 1, 'Handwritten Study Notes on SQL Joins & Subqueries', 'Handwritten quick-revision notes with sample schemas and query visualizations.', 'Notes', 'https://studysphere.edu/res/dbms/sql_joins_notes.pdf', 1850, 1, '2026-01-18 11:30:00'),
(3, 1, 2, 'Lecture Recording: Decomposition & 3NF vs BCNF', 'In-depth 50-minute video walkthrough of Armstrong axioms and lossless join decomposition.', 'Video', 'https://www.youtube.com/watch?v=example_dbms_3nf', 0, 1, '2026-02-01 14:15:00'),
(4, 1, 2, 'End-Semester Previous Year Paper (2024 & 2025 Solved)', 'Previous year university semester examination questions solved with step-by-step proofs.', 'Previous Year Paper', 'https://studysphere.edu/res/dbms/pyq_2024_2025.pdf', 4200, 1, '2026-02-10 09:00:00'),
(5, 1, 2, 'Interactive SQL & Relational Normalizer Tool', 'Web-based visual normalization calculator and relational algebra playground.', 'Link', 'https://db-normalizer.example.org', 0, 1, '2026-02-12 16:45:00'),

(6, 2, 3, 'CPU Scheduling Algorithms Comparison Cheat Sheet', 'Comparison table of turnaround time and waiting time formulas across FCFS, SJF, and Round Robin.', 'PDF', 'https://studysphere.edu/res/os/cpu_scheduling_cheatsheet.pdf', 1240, 2, '2026-01-20 09:30:00'),
(7, 2, 4, 'Dining Philosophers & Classical Synchronization Notes', 'Detailed solution notes covering semaphores, mutex locks, and deadlock condition elimination.', 'Notes', 'https://studysphere.edu/res/os/synchronization_notes.pdf', 2100, 2, '2026-02-05 15:00:00'),
(8, 2, 4, 'Video Demo: Page Replacement Algorithms in Linux', 'Video demonstrating LRU vs FIFO page faults simulation with trace files.', 'Video', 'https://www.youtube.com/watch?v=example_os_paging', 0, 2, '2026-02-15 11:20:00'),
(9, 2, 4, 'OS End-Sem PYQ Papers with Solutions (2022-2025)', 'Official 4-year compiled questions on virtual memory, paging, and deadlocks.', 'Previous Year Paper', 'https://studysphere.edu/res/os/os_endsem_pyq.pdf', 5100, 2, '2026-02-18 10:10:00'),

(10, 3, 5, 'Subnetting & VLSM Complete Practical Guide', 'Step-by-step guide with 25 solved subnet mask and CIDR notation calculation problems.', 'PDF', 'https://studysphere.edu/res/cn/subnetting_vlsm_guide.pdf', 2890, 3, '2026-01-22 13:00:00'),
(11, 3, 6, 'Interactive Wireshark TCP 3-Way Handshake Lab', 'Packet capture trace download link with step-by-step Wireshark inspection protocol.', 'Link', 'https://wireshark-labs.example.edu/tcp-analysis', 0, 3, '2026-02-08 14:00:00'),
(12, 3, 6, 'Computer Networks Solved Question Bank (2025)', 'University model test paper covering routing protocols (RIP, OSPF, BGP) and TCP congestion.', 'Previous Year Paper', 'https://studysphere.edu/res/cn/cn_solved_bank_2025.pdf', 3800, 3, '2026-02-20 16:30:00'),

(13, 4, 7, 'Dijkstra and MST Graph Algorithms Reference Notes', 'Proof of correctness and complexity analysis for Dijkstra and Prim-Kruskal algorithms.', 'Notes', 'https://studysphere.edu/res/dsa/graph_algorithms_notes.pdf', 1950, 1, '2026-01-25 11:00:00'),
(14, 4, 8, 'Dynamic Programming Patterns & Tabulation Guide', 'PDF booklet of 14 standard DP archetypes: knapsack, grid paths, interval DP, bitmasking.', 'PDF', 'https://studysphere.edu/res/dsa/dp_patterns_guide.pdf', 4500, 1, '2026-02-14 17:00:00'),

(15, 5, 10, 'Java Multithreading & Concurrency Deep Dive', 'Slide deck explaining Thread pools, Synchronized blocks, ReentrantLock, and Deadlocks in JVM.', 'PDF', 'https://studysphere.edu/res/java/concurrency_deep_dive.pdf', 3100, 2, '2026-02-12 10:45:00');

-- ----------------------------------------------------------------------------
-- 10. Insert BOOKMARKS (Student 1 Tulip's bookmarks)
-- ----------------------------------------------------------------------------
INSERT INTO bookmark (bookmark_id, student_id, resource_id) VALUES
(1, 1, 2), -- Handwritten Study Notes on SQL Joins
(2, 1, 4), -- DBMS PYQ 2024-2025
(3, 1, 6), -- CPU Scheduling Cheat Sheet
(4, 1, 10); -- Subnetting & VLSM Guide

-- ----------------------------------------------------------------------------
-- 11. Insert ASSIGNMENTS (8 assignments across courses)
-- ----------------------------------------------------------------------------
INSERT INTO assignment (assignment_id, course_id, module_id, title, description, maximum_marks, weightage_percent, due_date, allow_late_submission, created_by) VALUES
(1, 1, 1, 'Assignment 1: Complex SQL Queries & Relational Algebra', 'Write relational algebra expressions and MySQL queries for university database schema with nested GROUP BY and HAVING clauses.', 100, 10, '2026-03-20 23:59:00', TRUE, 1),
(2, 1, 2, 'Assignment 2: Schema Normalization to 3NF & BCNF', 'Analyze a set of functional dependencies for a healthcare management schema. Decompose into 3NF and verify lossless join property.', 100, 10, '2026-03-25 23:59:00', FALSE, 1),
(3, 2, 3, 'Assignment 1: CPU Scheduling Simulator in C/C++', 'Implement Preemptive SJF and Round Robin (Quantum = 4ms) scheduling simulator. Calculate average turnaround time and waiting time.', 50, 10, '2026-03-18 23:59:00', TRUE, 2),
(4, 2, 4, 'Assignment 2: Deadlock Avoidance with Banker Algorithm', 'Program the Banker algorithm in C/C++ to verify whether a given resource-allocation state is safe. Find the safe execution sequence.', 50, 10, '2026-03-28 23:59:00', TRUE, 2),
(5, 3, 5, 'Assignment 1: CIDR Subnetting & Packet Routing Design', 'Given classless IP block 192.168.10.0/24, design 4 distinct subnets for college campus departments with minimum waste IP allocation.', 100, 10, '2026-03-15 23:59:00', TRUE, 3),
(6, 3, 6, 'Assignment 2: Wireshark Packet Inspection Analysis', 'Capture TCP packets during an HTTPS handshake. Identify SYN, SYN-ACK, ACK, and TLS ClientHello records with sequence numbers.', 100, 10, '2026-04-02 23:59:00', TRUE, 3),
(7, 4, 7, 'Assignment 1: Dijkstra Shortest Path Implementation', 'Implement Dijkstra algorithm using min-priority heap in C++ or Python. Benchmark against dense matrix graph representations.', 100, 15, '2026-03-12 23:59:00', FALSE, 1),
(8, 5, 9, 'Assignment 1: Banking Transaction Simulator with Exceptions', 'Build an object-oriented Java console application handling InsufficientFundsException and AccountNotFoundException.', 50, 10, '2026-03-14 23:59:00', TRUE, 2);

-- ----------------------------------------------------------------------------
-- 12. Insert SUBMISSIONS (for Student 1 Tulip across statuses)
-- ----------------------------------------------------------------------------
INSERT INTO submission (submission_id, assignment_id, student_id, submission_text, file_attachment_url, submitted_at, status, marks_obtained, feedback, graded_by, graded_at) VALUES
-- Evaluated assignment (Assignment 7 - DSA Dijkstra)
(1, 7, 1, 'Implemented min-heap priority queue with O((V+E) log V) time complexity. Code and test cases attached.', 'https://studysphere.edu/uploads/25BCE0499_assign7.zip', '2026-03-11 20:30:00', 'EVALUATED', 95.00, 'Excellent implementation. Heap operations and edge relaxation logic are well documented.', 1, '2026-03-13 14:00:00'),
-- Evaluated assignment (Assignment 8 - Java Banking)
(2, 8, 1, 'Custom exception hierarchy implemented with synchronized balance deduction methods.', 'https://studysphere.edu/uploads/25BCE0499_assign8.zip', '2026-03-13 18:45:00', 'EVALUATED', 48.00, 'Clean OOP design and comprehensive unit tests.', 2, '2026-03-15 11:30:00'),
-- Submitted assignment awaiting evaluation (Assignment 5 - CN Subnetting)
(3, 5, 1, 'Completed CIDR calculations and routing table table design for 4 subnets.', 'https://studysphere.edu/uploads/25BCE0499_assign5.pdf', '2026-03-14 22:10:00', 'SUBMITTED', NULL, NULL, NULL, NULL),
-- Late submission awaiting grading (Assignment 3 - OS CPU Scheduling)
(4, 3, 1, 'Simulated Round Robin and SJF with Gantt chart generation.', 'https://studysphere.edu/uploads/25BCE0499_assign3.cpp', '2026-03-19 02:15:00', 'LATE', NULL, NULL, NULL, NULL);

-- Assignments 1, 2, 4, 6 remain PENDING for Tulip!

-- ----------------------------------------------------------------------------
-- 13. Insert QUIZZES (5 quizzes)
-- ----------------------------------------------------------------------------
INSERT INTO quiz (quiz_id, course_id, module_id, title, description, duration_minutes, total_marks, passing_marks, due_date, is_active, created_by) VALUES
(1, 1, 1, 'Quiz 1: Relational Algebra & SQL Mastery', 'Test your knowledge on relational operators, Cartesian product, natural join, and correlated subqueries.', 15, 10, 5, '2026-03-22 23:59:00', TRUE, 1),
(2, 1, 2, 'Quiz 2: Normalization & Transaction ACID Properties', 'Assessment on identifying highest normal form, functional dependencies, and serializability.', 20, 10, 5, '2026-03-29 23:59:00', TRUE, 1),
(3, 2, 3, 'Quiz 1: OS Processes, Threads & Scheduling', 'Multiple choice questions on fork() semantics, context switching, and scheduling metrics.', 15, 10, 5, '2026-03-24 23:59:00', TRUE, 2),
(4, 3, 5, 'Quiz 1: IP Addressing, Subnetting & Framing', 'Evaluate proficiency in subnet masks, CIDR prefix matching, and CRC parity checks.', 15, 10, 5, '2026-03-26 23:59:00', TRUE, 3),
(5, 4, 7, 'Quiz 1: Graph Traversal & Shortest Path Algorithms', 'Test algorithmic intuition on BFS vs DFS properties, negative edge weights, and MST algorithms.', 20, 10, 5, '2026-03-15 23:59:00', TRUE, 1);

-- ----------------------------------------------------------------------------
-- 14. Insert QUESTIONS & QUIZ OPTIONS (20 questions with 4 options each)
-- ----------------------------------------------------------------------------
-- Quiz 1 Questions (DBMS)
INSERT INTO question (question_id, quiz_id, question_number, question_text, explanation, marks) VALUES
(1, 1, 1, 'Which relational algebra operation is equivalent to a Cartesian product followed by a selection condition?', 'A Theta Join is formally defined as a Cartesian Product followed by a Selection operation with condition theta.', 1.0),
(2, 1, 2, 'In SQL, which clause is specifically used to filter groups created by the GROUP BY clause?', 'The HAVING clause filters aggregated groups, whereas WHERE filters individual rows before grouping.', 1.0),
(3, 1, 3, 'Which of the following relational algebra operators is NOT a fundamental (primitive) operator?', 'Natural Join is a derived operator combining Cartesian product, selection, and projection.', 1.0),
(4, 1, 4, 'What is the maximum number of superkeys for a relation with n attributes having a single candidate key with 1 attribute?', 'If one attribute is the candidate key, any superset of this attribute is a superkey, yielding 2^(n-1) superkeys.', 1.0);

INSERT INTO quiz_option (question_id, option_label, option_text, is_correct) VALUES
(1, 'A', 'Natural Join', FALSE), (1, 'B', 'Theta Join', TRUE), (1, 'C', 'Projection', FALSE), (1, 'D', 'Union', FALSE),
(2, 'A', 'WHERE', FALSE), (2, 'B', 'ORDER BY', FALSE), (2, 'C', 'HAVING', TRUE), (2, 'D', 'FILTER', FALSE),
(3, 'A', 'Selection', FALSE), (3, 'B', 'Projection', FALSE), (3, 'C', 'Cartesian Product', FALSE), (3, 'D', 'Natural Join', TRUE),
(4, 'A', '2^n', FALSE), (4, 'B', '2^(n-1)', TRUE), (4, 'C', 'n!', FALSE), (4, 'D', '2^(n-2)', FALSE);

-- Quiz 2 Questions (DBMS Normalization)
INSERT INTO question (question_id, quiz_id, question_number, question_text, explanation, marks) VALUES
(5, 2, 1, 'A relation R is in 2NF if it is in 1NF and what other condition holds?', '2NF requires no partial dependency, meaning every non-prime attribute must be fully functionally dependent on every candidate key.', 1.0),
(6, 2, 2, 'Which normal form guarantees both dependency preservation and lossless join decomposition in all cases?', '3NF always guarantees both lossless join and dependency preservation, whereas BCNF may not preserve dependencies.', 1.0),
(7, 2, 3, 'Which property of ACID ensures that concurrent transactions do not interfere with each other?', 'Isolation ensures that concurrently executing transactions cannot view each other intermediate uncommitted states.', 1.0),
(8, 2, 4, 'In Two-Phase Locking (2PL), what occurs during the shrinking phase?', 'In the shrinking phase of 2PL, a transaction may only release locks and cannot obtain any new locks.', 1.0);

INSERT INTO quiz_option (question_id, option_label, option_text, is_correct) VALUES
(5, 'A', 'Every determinant is a candidate key', FALSE), (5, 'B', 'No non-prime attribute is partially dependent on any candidate key', TRUE), (5, 'C', 'No transitive dependencies exist', FALSE), (5, 'D', 'All attributes are atomic', FALSE),
(6, 'A', 'BCNF', FALSE), (6, 'B', '3NF', TRUE), (6, 'C', '4NF', FALSE), (6, 'D', '5NF', FALSE),
(7, 'A', 'Atomicity', FALSE), (7, 'B', 'Consistency', FALSE), (7, 'C', 'Isolation', TRUE), (7, 'D', 'Durability', FALSE),
(8, 'A', 'Locks can only be acquired', FALSE), (8, 'B', 'Locks can only be released', TRUE), (8, 'C', 'Locks can be both acquired and released', FALSE), (8, 'D', 'Transactions are committed automatically', FALSE);

-- Quiz 3 Questions (Operating Systems)
INSERT INTO question (question_id, quiz_id, question_number, question_text, explanation, marks) VALUES
(9, 3, 1, 'What is the return value of fork() in the parent process upon successful creation of a child?', 'fork() returns the PID of the newly created child process to the parent, and returns 0 to the child.', 1.0),
(10, 3, 2, 'Which CPU scheduling algorithm is provably optimal in terms of minimizing average waiting time?', 'Shortest Job First (SJF) is provably optimal for minimizing average waiting time when burst times are known in advance.', 1.0),
(11, 3, 3, 'What problem arises when a process is perpetually denied CPU allocation because higher-priority jobs keep arriving?', 'Starvation occurs when a runnable process is indefinitely delayed from obtaining a required resource.', 1.0),
(12, 3, 4, 'Which technique is used to prevent starvation in priority scheduling?', 'Aging gradually increases the priority of processes that wait in the system for a long time.', 1.0);

INSERT INTO quiz_option (question_id, option_label, option_text, is_correct) VALUES
(9, 'A', '0', FALSE), (9, 'B', 'Child PID', TRUE), (9, 'C', '-1', FALSE), (9, 'D', '1', FALSE),
(10, 'A', 'FCFS', FALSE), (10, 'B', 'Round Robin', FALSE), (10, 'C', 'Shortest Job First (SJF)', TRUE), (10, 'D', 'Priority Scheduling', FALSE),
(11, 'A', 'Deadlock', FALSE), (11, 'B', 'Starvation', TRUE), (11, 'C', 'Thrashing', FALSE), (11, 'D', 'Paging', FALSE),
(12, 'A', 'Compaction', FALSE), (12, 'B', 'Aging', TRUE), (12, 'C', 'Swapping', FALSE), (12, 'D', 'Paging', FALSE);

-- Quiz 4 Questions (Computer Networks)
INSERT INTO question (question_id, quiz_id, question_number, question_text, explanation, marks) VALUES
(13, 4, 1, 'What is the broadcast address for the subnet 192.168.1.32/27?', 'A /27 subnet mask has 32 IP addresses (block size 32). The subnet range is .32 to .63, so .63 is the broadcast address.', 1.0),
(14, 4, 2, 'Which layer in the OSI model is responsible for end-to-end reliability and flow control?', 'The Transport layer is responsible for end-to-end communication, flow control, and error recovery.', 1.0),
(15, 4, 3, 'What is the size of the MAC address in bytes?', 'A MAC (Media Access Control) address is 48 bits, which equals 6 bytes.', 1.0),
(16, 4, 4, 'Which protocol resolves an IP address to a physical MAC address on a local area network?', 'Address Resolution Protocol (ARP) translates an IPv4 address to the associated physical hardware MAC address.', 1.0);

INSERT INTO quiz_option (question_id, option_label, option_text, is_correct) VALUES
(13, 'A', '192.168.1.31', FALSE), (13, 'B', '192.168.1.63', TRUE), (13, 'C', '192.168.1.64', FALSE), (13, 'D', '192.168.1.255', FALSE),
(14, 'A', 'Network Layer', FALSE), (14, 'B', 'Data Link Layer', FALSE), (14, 'C', 'Transport Layer', TRUE), (14, 'D', 'Session Layer', FALSE),
(15, 'A', '4 bytes', FALSE), (15, 'B', '6 bytes', TRUE), (15, 'C', '8 bytes', FALSE), (15, 'D', '16 bytes', FALSE),
(16, 'A', 'DNS', FALSE), (16, 'B', 'DHCP', FALSE), (16, 'C', 'ARP', TRUE), (16, 'D', 'ICMP', FALSE);

-- Quiz 5 Questions (DSA Graph Algorithms)
INSERT INTO question (question_id, quiz_id, question_number, question_text, explanation, marks) VALUES
(17, 5, 1, 'Dijkstra shortest path algorithm may fail to produce correct results in the presence of what?', 'Dijkstra assumes greedy non-decreasing edge relaxations and can fail or loop infinitely if negative weight edges exist.', 1.0),
(18, 5, 2, 'What data structure is utilized in Prim algorithm to efficiently select the minimum weight edge?', 'A Min-Priority Queue (Min-Heap) provides O(log V) retrieval of the minimum crossing edge.', 1.0),
(19, 5, 3, 'What is the time complexity of Breadth-First Search (BFS) on an adjacency list representation with V vertices and E edges?', 'BFS visits each vertex once and traverses each incident edge, giving O(V + E) complexity.', 1.0),
(20, 5, 4, 'Which algorithm finds single-source shortest paths in graphs with negative weight edges, assuming no negative weight cycles?', 'Bellman-Ford operates by relaxing all edges |V|-1 times, handling negative edge weights correctly.', 1.0);

INSERT INTO quiz_option (question_id, option_label, option_text, is_correct) VALUES
(17, 'A', 'Cycles', FALSE), (17, 'B', 'Negative weight edges', TRUE), (17, 'C', 'Disconnected vertices', FALSE), (17, 'D', 'Directed edges', FALSE),
(18, 'A', 'Stack', FALSE), (18, 'B', 'Min-Priority Queue (Heap)', TRUE), (18, 'C', 'Binary Search Tree', FALSE), (18, 'D', 'Hash Table', FALSE),
(19, 'A', 'O(V^2)', FALSE), (19, 'B', 'O(V + E)', TRUE), (19, 'C', 'O(V * E)', FALSE), (19, 'D', 'O(E log V)', FALSE),
(20, 'A', 'Dijkstra', FALSE), (20, 'B', 'Kruskal', FALSE), (20, 'C', 'Bellman-Ford', TRUE), (20, 'D', 'Floyd-Warshall', FALSE);

-- ----------------------------------------------------------------------------
-- 15. Insert QUIZ ATTEMPTS & ANSWERS (Tulip took Quiz 5 and scored 4/4)
-- ----------------------------------------------------------------------------
INSERT INTO quiz_attempt (attempt_id, quiz_id, student_id, started_at, completed_at, score_obtained, total_questions, correct_count, incorrect_count, status) VALUES
(1, 5, 1, '2026-03-14 15:00:00', '2026-03-14 15:11:30', 4.00, 4, 4, 0, 'COMPLETED');

INSERT INTO student_answer (attempt_id, question_id, selected_option_id, is_correct) VALUES
(1, 17, 66, TRUE), -- option B
(1, 18, 70, TRUE), -- option B
(1, 19, 74, TRUE), -- option B
(1, 20, 79, TRUE); -- option C

-- ----------------------------------------------------------------------------
-- 16. Insert STUDY TASKS (10 tasks for Tulip)
-- ----------------------------------------------------------------------------
INSERT INTO study_task (task_id, student_id, course_id, title, topic, priority, due_date, estimated_duration_minutes, status, created_at, completed_at) VALUES
-- Today's Tasks
(1, 1, 1, 'Complete SQL nested subquery problem set', 'Subqueries & Joins', 'HIGH', CURDATE(), 60, 'IN_PROGRESS', NOW(), NULL),
(2, 1, 2, 'Revise Peterson solution and Dekker synchronization', 'Critical Section Problem', 'MEDIUM', CURDATE(), 45, 'PENDING', NOW(), NULL),
(3, 1, 3, 'Draw VLSM network topology for DBMS lab subnets', 'Subnetting Design', 'HIGH', CURDATE(), 40, 'PENDING', NOW(), NULL),

-- Upcoming Tasks
(4, 1, 1, 'Solve BCNF decomposition examples from textbook', 'Normalization', 'HIGH', DATE_ADD(CURDATE(), INTERVAL 2 DAY), 90, 'PENDING', NOW(), NULL),
(5, 1, 2, 'Implement Round Robin CPU scheduler in C', 'CPU Scheduling', 'MEDIUM', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 120, 'PENDING', NOW(), NULL),
(6, 1, 3, 'Practice Wireshark TCP 3-way handshake analysis', 'Transport Layer', 'LOW', DATE_ADD(CURDATE(), INTERVAL 4 DAY), 45, 'PENDING', NOW(), NULL),
(7, 1, 4, 'Study 0/1 Knapsack Tabulation vs Memoization', 'Dynamic Programming', 'HIGH', DATE_ADD(CURDATE(), INTERVAL 5 DAY), 75, 'PENDING', NOW(), NULL),
(8, 1, 5, 'Review Java ReentrantLock and Deadlock scenarios', 'Multithreading', 'MEDIUM', DATE_ADD(CURDATE(), INTERVAL 6 DAY), 50, 'PENDING', NOW(), NULL),

-- Completed Tasks
(9, 1, 4, 'Implemented Dijkstra Shortest Path in C++', 'Graph Algorithms', 'HIGH', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 90, 'COMPLETED', DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
(10, 1, 5, 'Built Bank Account Exception hierarchy', 'Java Exceptions', 'MEDIUM', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 60, 'COMPLETED', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 4 DAY));

-- ----------------------------------------------------------------------------
-- 17. Insert NOTIFICATIONS
-- ----------------------------------------------------------------------------
INSERT INTO notification (notification_id, user_id, title, message, type, link_url, is_read, created_at) VALUES
(1, 1, 'Assignment Graded', 'Your submission for Assignment 1: Dijkstra Shortest Path has been graded (95/100).', 'GRADE', '/assignments/7', FALSE, NOW()),
(2, 1, 'Upcoming Deadline', 'Assignment 1: Complex SQL Queries is due in 3 days.', 'DEADLINE', '/assignments/1', FALSE, NOW()),
(3, 1, 'New Quiz Scheduled', 'Prof. A has scheduled Quiz 1: Relational Algebra & SQL for March 22.', 'ANNOUNCEMENT', '/quizzes/1', TRUE, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 1, 'Course Material Uploaded', 'New lecture slides on Normalization have been uploaded to CS301.', 'ANNOUNCEMENT', '/courses/1', TRUE, DATE_SUB(NOW(), INTERVAL 2 DAY));
