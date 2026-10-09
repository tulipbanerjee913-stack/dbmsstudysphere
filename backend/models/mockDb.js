/**
 * Relational in-memory dataset for StudySphere
 * Represents the 18 MySQL normalized tables with foreign keys and relationships.
 * Allows seamless full-stack execution out of the box when MySQL server is not active.
 */

const departments = [
  { department_id: 1, department_code: 'CSE', department_name: 'Computer Science and Engineering', head_of_department: 'Prof. A', contact_email: 'hod.cse@studysphere.edu' },
  { department_id: 2, department_code: 'ECE', department_name: 'Electronics and Communication Engineering', head_of_department: 'Prof. B', contact_email: 'hod.ece@studysphere.edu' },
  { department_id: 3, department_code: 'IT', department_name: 'Information Technology', head_of_department: 'Prof. C', contact_email: 'hod.it@studysphere.edu' },
  { department_id: 4, department_code: 'MECH', department_name: 'Mechanical Engineering', head_of_department: 'Prof. D', contact_email: 'hod.mech@studysphere.edu' }
];

const users = [
  { user_id: 1, email: 'student@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Tulip', last_name: 'Banerjee', role: 'STUDENT', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', is_active: true },
  { user_id: 2, email: 'aarav.sharma@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Aarav', last_name: 'Sharma', role: 'STUDENT', avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', is_active: true },
  { user_id: 3, email: 'priya.nair@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Priya', last_name: 'Nair', role: 'STUDENT', avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', is_active: true },
  { user_id: 4, email: 'faculty@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Prof.', last_name: 'A', role: 'FACULTY', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', is_active: true },
  { user_id: 5, email: 'prof.b@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Prof.', last_name: 'B', role: 'FACULTY', avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', is_active: true },
  { user_id: 6, email: 'prof.c@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Prof.', last_name: 'C', role: 'FACULTY', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', is_active: true },
  { user_id: 7, email: 'admin@studysphere.edu', password_hash: '$2a$10$4ev0G0h44vj8QYm7vF.X0.3t76o5T6Q2s.kQnB4k0p23QW.iJ5d3S', first_name: 'Academic', last_name: 'Dean', role: 'ADMIN', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', is_active: true }
];

const students = [
  { student_id: 1, user_id: 1, roll_number: '25BCE0499', department_id: 1, semester: 6, academic_year: '2022-2026', cgpa: 8.92 },
  { student_id: 2, user_id: 2, roll_number: '21BCSE015', department_id: 1, semester: 6, academic_year: '2022-2026', cgpa: 8.45 },
  { student_id: 3, user_id: 3, roll_number: '21BCSE078', department_id: 1, semester: 6, academic_year: '2022-2026', cgpa: 9.10 }
];

const facultyList = [
  { faculty_id: 1, user_id: 4, employee_code: 'FAC-CSE-012', department_id: 1, designation: 'Associate Professor', qualification: 'Ph.D. in Computer Science', office_room: 'Cabin 304, Tech Block' },
  { faculty_id: 2, user_id: 5, employee_code: 'FAC-CSE-008', department_id: 1, designation: 'Assistant Professor (Senior Grade)', qualification: 'M.S. & Ph.D. in Computer Engineering', office_room: 'Cabin 309, Tech Block' },
  { faculty_id: 3, user_id: 6, employee_code: 'FAC-CSE-019', department_id: 1, designation: 'Professor', qualification: 'Ph.D. in Distributed Systems', office_room: 'Cabin 202, Admin Wing' }
];

const admins = [
  { admin_id: 1, user_id: 7, admin_code: 'ADM-OFFICE-01', office_location: 'Academic Dean Office, Central Block' }
];

const courses = [
  { course_id: 1, course_code: 'CS301', course_name: 'Database Management Systems', description: 'Comprehensive foundation covering relational model, SQL, normalization (1NF-3NF/BCNF), transactions (ACID), indexing, and concurrency control.', credits: 4, department_id: 1, faculty_id: 1, semester: 6, academic_session: 'Spring 2026', is_active: true },
  { course_id: 2, course_code: 'CS302', course_name: 'Operating Systems', description: 'Deep dive into process management, CPU scheduling algorithms, virtual memory paging, multithreading, synchronization deadlocks, and file systems.', credits: 4, department_id: 1, faculty_id: 2, semester: 6, academic_session: 'Spring 2026', is_active: true },
  { course_id: 3, course_code: 'CS303', course_name: 'Computer Networks', description: 'OSI and TCP/IP protocol suites, IP addressing, subnetting, routing protocols (OSPF, BGP), TCP flow & congestion control, and application layer protocols.', credits: 3, department_id: 1, faculty_id: 3, semester: 6, academic_session: 'Spring 2026', is_active: true },
  { course_id: 4, course_code: 'CS304', course_name: 'Data Structures & Algorithms', description: 'Advanced algorithm design: dynamic programming, graph algorithms (Dijkstra, Bellman-Ford), greedy methods, trees, and computational complexity.', credits: 4, department_id: 1, faculty_id: 1, semester: 6, academic_session: 'Spring 2026', is_active: true },
  { course_id: 5, course_code: 'CS305', course_name: 'Object Oriented Programming with Java', description: 'Enterprise Java paradigms: OOP principles, collections framework, exception handling, multithreading, JDBC connectivity, and design patterns.', credits: 3, department_id: 1, faculty_id: 2, semester: 6, academic_session: 'Spring 2026', is_active: true }
];

let enrollments = [
  { enrollment_id: 1, student_id: 1, course_id: 1, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 85.00, final_grade: null },
  { enrollment_id: 2, student_id: 1, course_id: 2, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 78.00, final_grade: null },
  { enrollment_id: 3, student_id: 1, course_id: 3, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 72.00, final_grade: null },
  { enrollment_id: 4, student_id: 1, course_id: 4, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 90.00, final_grade: null },
  { enrollment_id: 5, student_id: 1, course_id: 5, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 65.00, final_grade: null },
  { enrollment_id: 6, student_id: 2, course_id: 1, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 70.00, final_grade: null },
  { enrollment_id: 7, student_id: 2, course_id: 2, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 65.00, final_grade: null },
  { enrollment_id: 8, student_id: 2, course_id: 3, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 80.00, final_grade: null },
  { enrollment_id: 9, student_id: 3, course_id: 1, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 95.00, final_grade: null },
  { enrollment_id: 10, student_id: 3, course_id: 2, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 92.00, final_grade: null },
  { enrollment_id: 11, student_id: 3, course_id: 4, enrollment_date: '2026-01-10', status: 'ACTIVE', progress_percentage: 88.00, final_grade: null }
];

const modules = [
  { module_id: 1, course_id: 1, module_number: 1, module_title: 'Relational Model, ER Diagrams & SQL Foundations', description: 'Entity-Relationship modeling, relational algebra operators, DDL, DML queries, and integrity constraints.', estimated_hours: 12, is_published: true },
  { module_id: 2, course_id: 1, module_number: 2, module_title: 'Database Normalization & Transaction Processing', description: 'Functional dependencies, 1NF, 2NF, 3NF, BCNF, ACID transactions, serializability, and 2-Phase Locking.', estimated_hours: 14, is_published: true },
  { module_id: 3, course_id: 2, module_number: 1, module_title: 'Process Management & CPU Scheduling', description: 'Process control blocks, fork(), context switching, preemptive vs non-preemptive scheduling (FCFS, SJF, RR).', estimated_hours: 10, is_published: true },
  { module_id: 4, course_id: 2, module_number: 2, module_title: 'Process Synchronization & Virtual Memory', description: 'Semaphores, mutexes, dining philosophers problem, paging, page replacement (LRU, FIFO), and thrashing.', estimated_hours: 14, is_published: true },
  { module_id: 5, course_id: 3, module_number: 1, module_title: 'Data Link Layer & Network Layer Architecture', description: 'Framing, error detection (CRC), CSMA/CD, IPv4/IPv6 addressing, VLSM subnetting, and routing tables.', estimated_hours: 12, is_published: true },
  { module_id: 6, course_id: 3, module_number: 2, module_title: 'Transport & Application Layer Protocols', description: 'TCP 3-way handshake, sliding window, congestion control, UDP, DNS resolution, and HTTP/HTTPS handshake.', estimated_hours: 10, is_published: true },
  { module_id: 7, course_id: 4, module_number: 1, module_title: 'Graph Theory & Shortest Path Algorithms', description: 'BFS, DFS, topological sorting, Dijkstra single-source shortest path, Prim and Kruskal MST algorithms.', estimated_hours: 12, is_published: true },
  { module_id: 8, course_id: 4, module_number: 2, module_title: 'Dynamic Programming & Divide-and-Conquer', description: 'Memoization vs tabulation, 0/1 Knapsack, Longest Common Subsequence, matrix chain multiplication.', estimated_hours: 14, is_published: true },
  { module_id: 9, course_id: 5, module_number: 1, module_title: 'Core Java OOP & Exception Architecture', description: 'Encapsulation, inheritance hierarchies, abstract classes, interfaces, checked vs unchecked exceptions.', estimated_hours: 10, is_published: true },
  { module_id: 10, course_id: 5, module_number: 2, module_title: 'Java Collections Framework & Concurrency', description: 'List, Set, Map implementations, Generics, Thread life cycle, synchronization blocks, and ExecutorService.', estimated_hours: 12, is_published: true }
];

const resources = [
  { resource_id: 1, course_id: 1, module_id: 1, title: 'Lecture 01-04: Relational Algebra & Calculus Slides', description: 'Comprehensive PDF slides explaining projection, selection, Cartesian product, and Theta join.', resource_type: 'PDF', file_url: 'https://studysphere.edu/res/dbms/relational_algebra.pdf', file_size_kb: 3420, uploaded_by: 1, created_at: '2026-01-15T10:00:00Z' },
  { resource_id: 2, course_id: 1, module_id: 1, title: 'Handwritten Study Notes on SQL Joins & Subqueries', description: 'Handwritten quick-revision notes with sample schemas and query visualizations.', resource_type: 'Notes', file_url: 'https://studysphere.edu/res/dbms/sql_joins_notes.pdf', file_size_kb: 1850, uploaded_by: 1, created_at: '2026-01-18T11:30:00Z' },
  { resource_id: 3, course_id: 1, module_id: 2, title: 'Lecture Recording: Decomposition & 3NF vs BCNF', description: 'In-depth 50-minute video walkthrough of Armstrong axioms and lossless join decomposition.', resource_type: 'Video', file_url: 'https://www.youtube.com/watch?v=example_dbms_3nf', file_size_kb: 0, uploaded_by: 1, created_at: '2026-02-01T14:15:00Z' },
  { resource_id: 4, course_id: 1, module_id: 2, title: 'End-Semester Previous Year Paper (2024 & 2025 Solved)', description: 'Previous year university semester examination questions solved with step-by-step proofs.', resource_type: 'Previous Year Paper', file_url: 'https://studysphere.edu/res/dbms/pyq_2024_2025.pdf', file_size_kb: 4200, uploaded_by: 1, created_at: '2026-02-10T09:00:00Z' },
  { resource_id: 5, course_id: 1, module_id: 2, title: 'Interactive SQL & Relational Normalizer Tool', description: 'Web-based visual normalization calculator and relational algebra playground.', resource_type: 'Link', file_url: 'https://db-normalizer.example.org', file_size_kb: 0, uploaded_by: 1, created_at: '2026-02-12T16:45:00Z' },
  { resource_id: 6, course_id: 2, module_id: 3, title: 'CPU Scheduling Algorithms Comparison Cheat Sheet', description: 'Comparison table of turnaround time and waiting time formulas across FCFS, SJF, and Round Robin.', resource_type: 'PDF', file_url: 'https://studysphere.edu/res/os/cpu_scheduling_cheatsheet.pdf', file_size_kb: 1240, uploaded_by: 2, created_at: '2026-01-20T09:30:00Z' },
  { resource_id: 7, course_id: 2, module_id: 4, title: 'Dining Philosophers & Classical Synchronization Notes', description: 'Detailed solution notes covering semaphores, mutex locks, and deadlock condition elimination.', resource_type: 'Notes', file_url: 'https://studysphere.edu/res/os/synchronization_notes.pdf', file_size_kb: 2100, uploaded_by: 2, created_at: '2026-02-05T15:00:00Z' },
  { resource_id: 8, course_id: 2, module_id: 4, title: 'Video Demo: Page Replacement Algorithms in Linux', description: 'Video demonstrating LRU vs FIFO page faults simulation with trace files.', resource_type: 'Video', file_url: 'https://www.youtube.com/watch?v=example_os_paging', file_size_kb: 0, uploaded_by: 2, created_at: '2026-02-15T11:20:00Z' },
  { resource_id: 9, course_id: 2, module_id: 4, title: 'OS End-Sem PYQ Papers with Solutions (2022-2025)', description: 'Official 4-year compiled questions on virtual memory, paging, and deadlocks.', resource_type: 'Previous Year Paper', file_url: 'https://studysphere.edu/res/os/os_endsem_pyq.pdf', file_size_kb: 5100, uploaded_by: 2, created_at: '2026-02-18T10:10:00Z' },
  { resource_id: 10, course_id: 3, module_id: 5, title: 'Subnetting & VLSM Complete Practical Guide', description: 'Step-by-step guide with 25 solved subnet mask and CIDR notation calculation problems.', resource_type: 'PDF', file_url: 'https://studysphere.edu/res/cn/subnetting_vlsm_guide.pdf', file_size_kb: 2890, uploaded_by: 3, created_at: '2026-01-22T13:00:00Z' },
  { resource_id: 11, course_id: 3, module_id: 6, title: 'Interactive Wireshark TCP 3-Way Handshake Lab', description: 'Packet capture trace download link with step-by-step Wireshark inspection protocol.', resource_type: 'Link', file_url: 'https://wireshark-labs.example.edu/tcp-analysis', file_size_kb: 0, uploaded_by: 3, created_at: '2026-02-08T14:00:00Z' },
  { resource_id: 12, course_id: 3, module_id: 6, title: 'Computer Networks Solved Question Bank (2025)', description: 'University model test paper covering routing protocols (RIP, OSPF, BGP) and TCP congestion.', resource_type: 'Previous Year Paper', file_url: 'https://studysphere.edu/res/cn/cn_solved_bank_2025.pdf', file_size_kb: 3800, uploaded_by: 3, created_at: '2026-02-20T16:30:00Z' },
  { resource_id: 13, course_id: 4, module_id: 7, title: 'Dijkstra and MST Graph Algorithms Reference Notes', description: 'Proof of correctness and complexity analysis for Dijkstra and Prim-Kruskal algorithms.', resource_type: 'Notes', file_url: 'https://studysphere.edu/res/dsa/graph_algorithms_notes.pdf', file_size_kb: 1950, uploaded_by: 1, created_at: '2026-01-25T11:00:00Z' },
  { resource_id: 14, course_id: 4, module_id: 8, title: 'Dynamic Programming Patterns & Tabulation Guide', description: 'PDF booklet of 14 standard DP archetypes: knapsack, grid paths, interval DP, bitmasking.', resource_type: 'PDF', file_url: 'https://studysphere.edu/res/dsa/dp_patterns_guide.pdf', file_size_kb: 4500, uploaded_by: 1, created_at: '2026-02-14T17:00:00Z' },
  { resource_id: 15, course_id: 5, module_id: 10, title: 'Java Multithreading & Concurrency Deep Dive', description: 'Slide deck explaining Thread pools, Synchronized blocks, ReentrantLock, and Deadlocks in JVM.', resource_type: 'PDF', file_url: 'https://studysphere.edu/res/java/concurrency_deep_dive.pdf', file_size_kb: 3100, uploaded_by: 2, created_at: '2026-02-12T10:45:00Z' }
];

let bookmarks = [
  { bookmark_id: 1, student_id: 1, resource_id: 2 },
  { bookmark_id: 2, student_id: 1, resource_id: 4 },
  { bookmark_id: 3, student_id: 1, resource_id: 6 },
  { bookmark_id: 4, student_id: 1, resource_id: 10 }
];

let assignments = [
  { assignment_id: 1, course_id: 1, module_id: 1, title: 'Assignment 1: Complex SQL Queries & Relational Algebra', description: 'Write relational algebra expressions and MySQL queries for university database schema with nested GROUP BY and HAVING clauses.', maximum_marks: 100, weightage_percent: 10, due_date: '2026-03-20T23:59:00Z', allow_late_submission: true, created_by: 1 },
  { assignment_id: 2, course_id: 1, module_id: 2, title: 'Assignment 2: Schema Normalization to 3NF & BCNF', description: 'Analyze a set of functional dependencies for a healthcare management schema. Decompose into 3NF and verify lossless join property.', maximum_marks: 100, weightage_percent: 10, due_date: '2026-03-25T23:59:00Z', allow_late_submission: false, created_by: 1 },
  { assignment_id: 3, course_id: 2, module_id: 3, title: 'Assignment 1: CPU Scheduling Simulator in C/C++', description: 'Implement Preemptive SJF and Round Robin (Quantum = 4ms) scheduling simulator. Calculate average turnaround time and waiting time.', maximum_marks: 50, weightage_percent: 10, due_date: '2026-03-18T23:59:00Z', allow_late_submission: true, created_by: 2 },
  { assignment_id: 4, course_id: 2, module_id: 4, title: 'Assignment 2: Deadlock Avoidance with Banker Algorithm', description: 'Program the Banker algorithm in C/C++ to verify whether a given resource-allocation state is safe. Find the safe execution sequence.', maximum_marks: 50, weightage_percent: 10, due_date: '2026-03-28T23:59:00Z', allow_late_submission: true, created_by: 2 },
  { assignment_id: 5, course_id: 3, module_id: 5, title: 'Assignment 1: CIDR Subnetting & Packet Routing Design', description: 'Given classless IP block 192.168.10.0/24, design 4 distinct subnets for college campus departments with minimum waste IP allocation.', maximum_marks: 100, weightage_percent: 10, due_date: '2026-03-15T23:59:00Z', allow_late_submission: true, created_by: 3 },
  { assignment_id: 6, course_id: 3, module_id: 6, title: 'Assignment 2: Wireshark Packet Inspection Analysis', description: 'Capture TCP packets during an HTTPS handshake. Identify SYN, SYN-ACK, ACK, and TLS ClientHello records with sequence numbers.', maximum_marks: 100, weightage_percent: 10, due_date: '2026-04-02T23:59:00Z', allow_late_submission: true, created_by: 3 },
  { assignment_id: 7, course_id: 4, module_id: 7, title: 'Assignment 1: Dijkstra Shortest Path Implementation', description: 'Implement Dijkstra algorithm using min-priority heap in C++ or Python. Benchmark against dense matrix graph representations.', maximum_marks: 100, weightage_percent: 15, due_date: '2026-03-12T23:59:00Z', allow_late_submission: false, created_by: 1 },
  { assignment_id: 8, course_id: 5, module_id: 9, title: 'Assignment 1: Banking Transaction Simulator with Exceptions', description: 'Build an object-oriented Java console application handling InsufficientFundsException and AccountNotFoundException.', maximum_marks: 50, weightage_percent: 10, due_date: '2026-03-14T23:59:00Z', allow_late_submission: true, created_by: 2 }
];

let submissions = [
  { submission_id: 1, assignment_id: 7, student_id: 1, submission_text: 'Implemented min-heap priority queue with O((V+E) log V) time complexity. Code and test cases attached.', file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign7.zip', submitted_at: '2026-03-11T20:30:00Z', status: 'EVALUATED', marks_obtained: 95.00, feedback: 'Excellent implementation. Heap operations and edge relaxation logic are well documented.', graded_by: 1, graded_at: '2026-03-13T14:00:00Z' },
  { submission_id: 2, assignment_id: 8, student_id: 1, submission_text: 'Custom exception hierarchy implemented with synchronized balance deduction methods.', file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign8.zip', submitted_at: '2026-03-13T18:45:00Z', status: 'EVALUATED', marks_obtained: 48.00, feedback: 'Clean OOP design and comprehensive unit tests.', graded_by: 2, graded_at: '2026-03-15T11:30:00Z' },
  { submission_id: 3, assignment_id: 5, student_id: 1, submission_text: 'Completed CIDR calculations and routing table table design for 4 subnets.', file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign5.pdf', submitted_at: '2026-03-14T22:10:00Z', status: 'SUBMITTED', marks_obtained: null, feedback: null, graded_by: null, graded_at: null },
  { submission_id: 4, assignment_id: 3, student_id: 1, submission_text: 'Simulated Round Robin and SJF with Gantt chart generation.', file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign3.cpp', submitted_at: '2026-03-19T02:15:00Z', status: 'LATE', marks_obtained: null, feedback: null, graded_by: null, graded_at: null }
];

const quizzes = [
  { quiz_id: 1, course_id: 1, module_id: 1, title: 'Quiz 1: Relational Algebra & SQL Mastery', description: 'Test your knowledge on relational operators, Cartesian product, natural join, and correlated subqueries.', duration_minutes: 15, total_marks: 10, passing_marks: 5, due_date: '2026-03-22T23:59:00Z', is_active: true, created_by: 1, question_count: 4 },
  { quiz_id: 2, course_id: 1, module_id: 2, title: 'Quiz 2: Normalization & Transaction ACID Properties', description: 'Assessment on identifying highest normal form, functional dependencies, and serializability.', duration_minutes: 20, total_marks: 10, passing_marks: 5, due_date: '2026-03-29T23:59:00Z', is_active: true, created_by: 1, question_count: 4 },
  { quiz_id: 3, course_id: 2, module_id: 3, title: 'Quiz 1: OS Processes, Threads & Scheduling', description: 'Multiple choice questions on fork() semantics, context switching, and scheduling metrics.', duration_minutes: 15, total_marks: 10, passing_marks: 5, due_date: '2026-03-24T23:59:00Z', is_active: true, created_by: 2, question_count: 4 },
  { quiz_id: 4, course_id: 3, module_id: 5, title: 'Quiz 1: IP Addressing, Subnetting & Framing', description: 'Evaluate proficiency in subnet masks, CIDR prefix matching, and CRC parity checks.', duration_minutes: 15, total_marks: 10, passing_marks: 5, due_date: '2026-03-26T23:59:00Z', is_active: true, created_by: 3, question_count: 4 },
  { quiz_id: 5, course_id: 4, module_id: 7, title: 'Quiz 1: Graph Traversal & Shortest Path Algorithms', description: 'Test algorithmic intuition on BFS vs DFS properties, negative edge weights, and MST algorithms.', duration_minutes: 20, total_marks: 10, passing_marks: 5, due_date: '2026-03-15T23:59:00Z', is_active: true, created_by: 1, question_count: 4 }
];

const questions = [
  // Quiz 1 (DBMS)
  { question_id: 1, quiz_id: 1, question_number: 1, question_text: 'Which relational algebra operation is equivalent to a Cartesian product followed by a selection condition?', explanation: 'A Theta Join is formally defined as a Cartesian Product followed by a Selection operation with condition theta.', marks: 1.0 },
  { question_id: 2, quiz_id: 1, question_number: 2, question_text: 'In SQL, which clause is specifically used to filter groups created by the GROUP BY clause?', explanation: 'The HAVING clause filters aggregated groups, whereas WHERE filters individual rows before grouping.', marks: 1.0 },
  { question_id: 3, quiz_id: 1, question_number: 3, question_text: 'Which of the following relational algebra operators is NOT a fundamental (primitive) operator?', explanation: 'Natural Join is a derived operator combining Cartesian product, selection, and projection.', marks: 1.0 },
  { question_id: 4, quiz_id: 1, question_number: 4, question_text: 'What is the maximum number of superkeys for a relation with n attributes having a single candidate key with 1 attribute?', explanation: 'If one attribute is the candidate key, any superset of this attribute is a superkey, yielding 2^(n-1) superkeys.', marks: 1.0 },
  // Quiz 2 (DBMS Normalization)
  { question_id: 5, quiz_id: 2, question_number: 1, question_text: 'A relation R is in 2NF if it is in 1NF and what other condition holds?', explanation: '2NF requires no partial dependency, meaning every non-prime attribute must be fully functionally dependent on every candidate key.', marks: 1.0 },
  { question_id: 6, quiz_id: 2, question_number: 2, question_text: 'Which normal form guarantees both dependency preservation and lossless join decomposition in all cases?', explanation: '3NF always guarantees both lossless join and dependency preservation, whereas BCNF may not preserve dependencies.', marks: 1.0 },
  { question_id: 7, quiz_id: 2, question_number: 3, question_text: 'Which property of ACID ensures that concurrent transactions do not interfere with each other?', explanation: 'Isolation ensures that concurrently executing transactions cannot view each other intermediate uncommitted states.', marks: 1.0 },
  { question_id: 8, quiz_id: 2, question_number: 4, question_text: 'In Two-Phase Locking (2PL), what occurs during the shrinking phase?', explanation: 'In the shrinking phase of 2PL, a transaction may only release locks and cannot obtain any new locks.', marks: 1.0 },
  // Quiz 3 (OS)
  { question_id: 9, quiz_id: 3, question_number: 1, question_text: 'What is the return value of fork() in the parent process upon successful creation of a child?', explanation: 'fork() returns the PID of the newly created child process to the parent, and returns 0 to the child.', marks: 1.0 },
  { question_id: 10, quiz_id: 3, question_number: 2, question_text: 'Which CPU scheduling algorithm is provably optimal in terms of minimizing average waiting time?', explanation: 'Shortest Job First (SJF) is provably optimal for minimizing average waiting time when burst times are known in advance.', marks: 1.0 },
  { question_id: 11, quiz_id: 3, question_number: 3, question_text: 'What problem arises when a process is perpetually denied CPU allocation because higher-priority jobs keep arriving?', explanation: 'Starvation occurs when a runnable process is indefinitely delayed from obtaining a required resource.', marks: 1.0 },
  { question_id: 12, quiz_id: 3, question_number: 4, question_text: 'Which technique is used to prevent starvation in priority scheduling?', explanation: 'Aging gradually increases the priority of processes that wait in the system for a long time.', marks: 1.0 },
  // Quiz 4 (CN)
  { question_id: 13, quiz_id: 4, question_number: 1, question_text: 'What is the broadcast address for the subnet 192.168.1.32/27?', explanation: 'A /27 subnet mask has 32 IP addresses (block size 32). The subnet range is .32 to .63, so .63 is the broadcast address.', marks: 1.0 },
  { question_id: 14, quiz_id: 4, question_number: 2, question_text: 'Which layer in the OSI model is responsible for end-to-end reliability and flow control?', explanation: 'The Transport layer is responsible for end-to-end communication, flow control, and error recovery.', marks: 1.0 },
  { question_id: 15, quiz_id: 4, question_number: 3, question_text: 'What is the size of the MAC address in bytes?', explanation: 'A MAC (Media Access Control) address is 48 bits, which equals 6 bytes.', marks: 1.0 },
  { question_id: 16, quiz_id: 4, question_number: 4, question_text: 'Which protocol resolves an IP address to a physical MAC address on a local area network?', explanation: 'Address Resolution Protocol (ARP) translates an IPv4 address to the associated physical hardware MAC address.', marks: 1.0 },
  // Quiz 5 (DSA)
  { question_id: 17, quiz_id: 5, question_number: 1, question_text: 'Dijkstra shortest path algorithm may fail to produce correct results in the presence of what?', explanation: 'Dijkstra assumes greedy non-decreasing edge relaxations and can fail or loop infinitely if negative weight edges exist.', marks: 1.0 },
  { question_id: 18, quiz_id: 5, question_number: 2, question_text: 'What data structure is utilized in Prim algorithm to efficiently select the minimum weight edge?', explanation: 'A Min-Priority Queue (Min-Heap) provides O(log V) retrieval of the minimum crossing edge.', marks: 1.0 },
  { question_id: 19, quiz_id: 5, question_number: 3, question_text: 'What is the time complexity of Breadth-First Search (BFS) on an adjacency list representation with V vertices and E edges?', explanation: 'BFS visits each vertex once and traverses each incident edge, giving O(V + E) complexity.', marks: 1.0 },
  { question_id: 20, quiz_id: 5, question_number: 4, question_text: 'Which algorithm finds single-source shortest paths in graphs with negative weight edges, assuming no negative weight cycles?', explanation: 'Bellman-Ford operates by relaxing all edges |V|-1 times, handling negative edge weights correctly.', marks: 1.0 }
];

const quizOptions = [
  // Q1
  { option_id: 1, question_id: 1, option_label: 'A', option_text: 'Natural Join', is_correct: false },
  { option_id: 2, question_id: 1, option_label: 'B', option_text: 'Theta Join', is_correct: true },
  { option_id: 3, question_id: 1, option_label: 'C', option_text: 'Projection', is_correct: false },
  { option_id: 4, question_id: 1, option_label: 'D', option_text: 'Union', is_correct: false },
  // Q2
  { option_id: 5, question_id: 2, option_label: 'A', option_text: 'WHERE', is_correct: false },
  { option_id: 6, question_id: 2, option_label: 'B', option_text: 'ORDER BY', is_correct: false },
  { option_id: 7, question_id: 2, option_label: 'C', option_text: 'HAVING', is_correct: true },
  { option_id: 8, question_id: 2, option_label: 'D', option_text: 'FILTER', is_correct: false },
  // Q3
  { option_id: 9, question_id: 3, option_label: 'A', option_text: 'Selection', is_correct: false },
  { option_id: 10, question_id: 3, option_label: 'B', option_text: 'Projection', is_correct: false },
  { option_id: 11, question_id: 3, option_label: 'C', option_text: 'Cartesian Product', is_correct: false },
  { option_id: 12, question_id: 3, option_label: 'D', option_text: 'Natural Join', is_correct: true },
  // Q4
  { option_id: 13, question_id: 4, option_label: 'A', option_text: '2^n', is_correct: false },
  { option_id: 14, question_id: 4, option_label: 'B', option_text: '2^(n-1)', is_correct: true },
  { option_id: 15, question_id: 4, option_label: 'C', option_text: 'n!', is_correct: false },
  { option_id: 16, question_id: 4, option_label: 'D', option_text: '2^(n-2)', is_correct: false },
  // Q5
  { option_id: 17, question_id: 5, option_label: 'A', option_text: 'Every determinant is a candidate key', is_correct: false },
  { option_id: 18, question_id: 5, option_label: 'B', option_text: 'No non-prime attribute is partially dependent on any candidate key', is_correct: true },
  { option_id: 19, question_id: 5, option_label: 'C', option_text: 'No transitive dependencies exist', is_correct: false },
  { option_id: 20, question_id: 5, option_label: 'D', option_text: 'All attributes are atomic', is_correct: false },
  // Q6
  { option_id: 21, question_id: 6, option_label: 'A', option_text: 'BCNF', is_correct: false },
  { option_id: 22, question_id: 6, option_label: 'B', option_text: '3NF', is_correct: true },
  { option_id: 23, question_id: 6, option_label: 'C', option_text: '4NF', is_correct: false },
  { option_id: 24, question_id: 6, option_label: 'D', option_text: '5NF', is_correct: false },
  // Q7
  { option_id: 25, question_id: 7, option_label: 'A', option_text: 'Atomicity', is_correct: false },
  { option_id: 26, question_id: 7, option_label: 'B', option_text: 'Consistency', is_correct: false },
  { option_id: 27, question_id: 7, option_label: 'C', option_text: 'Isolation', is_correct: true },
  { option_id: 28, question_id: 7, option_label: 'D', option_text: 'Durability', is_correct: false },
  // Q8
  { option_id: 29, question_id: 8, option_label: 'A', option_text: 'Locks can only be acquired', is_correct: false },
  { option_id: 30, question_id: 8, option_label: 'B', option_text: 'Locks can only be released', is_correct: true },
  { option_id: 31, question_id: 8, option_label: 'C', option_text: 'Locks can be both acquired and released', is_correct: false },
  { option_id: 32, question_id: 8, option_label: 'D', option_text: 'Transactions are committed automatically', is_correct: false },
  // Q9
  { option_id: 33, question_id: 9, option_label: 'A', option_text: '0', is_correct: false },
  { option_id: 34, question_id: 9, option_label: 'B', option_text: 'Child PID', is_correct: true },
  { option_id: 35, question_id: 9, option_label: 'C', option_text: '-1', is_correct: false },
  { option_id: 36, question_id: 9, option_label: 'D', option_text: '1', is_correct: false },
  // Q10
  { option_id: 37, question_id: 10, option_label: 'A', option_text: 'FCFS', is_correct: false },
  { option_id: 38, question_id: 10, option_label: 'B', option_text: 'Round Robin', is_correct: false },
  { option_id: 39, question_id: 10, option_label: 'C', option_text: 'Shortest Job First (SJF)', is_correct: true },
  { option_id: 40, question_id: 10, option_label: 'D', option_text: 'Priority Scheduling', is_correct: false },
  // Q11
  { option_id: 41, question_id: 11, option_label: 'A', option_text: 'Deadlock', is_correct: false },
  { option_id: 42, question_id: 11, option_label: 'B', option_text: 'Starvation', is_correct: true },
  { option_id: 43, question_id: 11, option_label: 'C', option_text: 'Thrashing', is_correct: false },
  { option_id: 44, question_id: 11, option_label: 'D', option_text: 'Paging', is_correct: false },
  // Q12
  { option_id: 45, question_id: 12, option_label: 'A', option_text: 'Compaction', is_correct: false },
  { option_id: 46, question_id: 12, option_label: 'B', option_text: 'Aging', is_correct: true },
  { option_id: 47, question_id: 12, option_label: 'C', option_text: 'Swapping', is_correct: false },
  { option_id: 48, question_id: 12, option_label: 'D', option_text: 'Paging', is_correct: false },
  // Q13
  { option_id: 49, question_id: 13, option_label: 'A', option_text: '192.168.1.31', is_correct: false },
  { option_id: 50, question_id: 13, option_label: 'B', option_text: '192.168.1.63', is_correct: true },
  { option_id: 51, question_id: 13, option_label: 'C', option_text: '192.168.1.64', is_correct: false },
  { option_id: 52, question_id: 13, option_label: 'D', option_text: '192.168.1.255', is_correct: false },
  // Q14
  { option_id: 53, question_id: 14, option_label: 'A', option_text: 'Network Layer', is_correct: false },
  { option_id: 54, question_id: 14, option_label: 'B', option_text: 'Data Link Layer', is_correct: false },
  { option_id: 55, question_id: 14, option_label: 'C', option_text: 'Transport Layer', is_correct: true },
  { option_id: 56, question_id: 14, option_label: 'D', option_text: 'Session Layer', is_correct: false },
  // Q15
  { option_id: 57, question_id: 15, option_label: 'A', option_text: '4 bytes', is_correct: false },
  { option_id: 58, question_id: 15, option_label: 'B', option_text: '6 bytes', is_correct: true },
  { option_id: 59, question_id: 15, option_label: 'C', option_text: '8 bytes', is_correct: false },
  { option_id: 60, question_id: 15, option_label: 'D', option_text: '16 bytes', is_correct: false },
  // Q16
  { option_id: 61, question_id: 16, option_label: 'A', option_text: 'DNS', is_correct: false },
  { option_id: 62, question_id: 16, option_label: 'B', option_text: 'DHCP', is_correct: false },
  { option_id: 63, question_id: 16, option_label: 'C', option_text: 'ARP', is_correct: true },
  { option_id: 64, question_id: 16, option_label: 'D', option_text: 'ICMP', is_correct: false },
  // Q17
  { option_id: 65, question_id: 17, option_label: 'A', option_text: 'Cycles', is_correct: false },
  { option_id: 66, question_id: 17, option_label: 'B', option_text: 'Negative weight edges', is_correct: true },
  { option_id: 67, question_id: 17, option_label: 'C', option_text: 'Disconnected vertices', is_correct: false },
  { option_id: 68, question_id: 17, option_label: 'D', option_text: 'Directed edges', is_correct: false },
  // Q18
  { option_id: 69, question_id: 18, option_label: 'A', option_text: 'Stack', is_correct: false },
  { option_id: 70, question_id: 18, option_label: 'B', option_text: 'Min-Priority Queue (Heap)', is_correct: true },
  { option_id: 71, question_id: 18, option_label: 'C', option_text: 'Binary Search Tree', is_correct: false },
  { option_id: 72, question_id: 18, option_label: 'D', option_text: 'Hash Table', is_correct: false },
  // Q19
  { option_id: 73, question_id: 19, option_label: 'A', option_text: 'O(V^2)', is_correct: false },
  { option_id: 74, question_id: 19, option_label: 'B', option_text: 'O(V + E)', is_correct: true },
  { option_id: 75, question_id: 19, option_label: 'C', option_text: 'O(V * E)', is_correct: false },
  { option_id: 76, question_id: 19, option_label: 'D', option_text: 'O(E log V)', is_correct: false },
  // Q20
  { option_id: 77, question_id: 20, option_label: 'A', option_text: 'Dijkstra', is_correct: false },
  { option_id: 78, question_id: 20, option_label: 'B', option_text: 'Kruskal', is_correct: false },
  { option_id: 79, question_id: 20, option_label: 'C', option_text: 'Bellman-Ford', is_correct: true },
  { option_id: 80, question_id: 20, option_label: 'D', option_text: 'Floyd-Warshall', is_correct: false }
];

let quizAttempts = [
  { attempt_id: 1, quiz_id: 5, student_id: 1, started_at: '2026-03-14T15:00:00Z', completed_at: '2026-03-14T15:11:30Z', score_obtained: 4.00, total_questions: 4, correct_count: 4, incorrect_count: 0, status: 'COMPLETED' }
];

let studentAnswers = [
  { answer_id: 1, attempt_id: 1, question_id: 17, selected_option_id: 66, is_correct: true },
  { answer_id: 2, attempt_id: 1, question_id: 18, selected_option_id: 70, is_correct: true },
  { answer_id: 3, attempt_id: 1, question_id: 19, selected_option_id: 74, is_correct: true },
  { answer_id: 4, attempt_id: 1, question_id: 20, selected_option_id: 79, is_correct: true }
];

let studyTasks = [
  { task_id: 1, student_id: 1, course_id: 1, title: 'Complete SQL nested subquery problem set', topic: 'Subqueries & Joins', priority: 'HIGH', due_date: new Date().toISOString().split('T')[0], estimated_duration_minutes: 60, status: 'IN_PROGRESS', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 2, student_id: 1, course_id: 2, title: 'Revise Peterson solution and Dekker synchronization', topic: 'Critical Section Problem', priority: 'MEDIUM', due_date: new Date().toISOString().split('T')[0], estimated_duration_minutes: 45, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 3, student_id: 1, course_id: 3, title: 'Draw VLSM network topology for DBMS lab subnets', topic: 'Subnetting Design', priority: 'HIGH', due_date: new Date().toISOString().split('T')[0], estimated_duration_minutes: 40, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 4, student_id: 1, course_id: 1, title: 'Solve BCNF decomposition examples from textbook', topic: 'Normalization', priority: 'HIGH', due_date: new Date(Date.now() + 2*86400000).toISOString().split('T')[0], estimated_duration_minutes: 90, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 5, student_id: 1, course_id: 2, title: 'Implement Round Robin CPU scheduler in C', topic: 'CPU Scheduling', priority: 'MEDIUM', due_date: new Date(Date.now() + 3*86400000).toISOString().split('T')[0], estimated_duration_minutes: 120, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 6, student_id: 1, course_id: 3, title: 'Practice Wireshark TCP 3-way handshake analysis', topic: 'Transport Layer', priority: 'LOW', due_date: new Date(Date.now() + 4*86400000).toISOString().split('T')[0], estimated_duration_minutes: 45, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 7, student_id: 1, course_id: 4, title: 'Study 0/1 Knapsack Tabulation vs Memoization', topic: 'Dynamic Programming', priority: 'HIGH', due_date: new Date(Date.now() + 5*86400000).toISOString().split('T')[0], estimated_duration_minutes: 75, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 8, student_id: 1, course_id: 5, title: 'Review Java ReentrantLock and Deadlock scenarios', topic: 'Multithreading', priority: 'MEDIUM', due_date: new Date(Date.now() + 6*86400000).toISOString().split('T')[0], estimated_duration_minutes: 50, status: 'PENDING', created_at: new Date().toISOString(), completed_at: null },
  { task_id: 9, student_id: 1, course_id: 4, title: 'Implemented Dijkstra Shortest Path in C++', topic: 'Graph Algorithms', priority: 'HIGH', due_date: new Date(Date.now() - 2*86400000).toISOString().split('T')[0], estimated_duration_minutes: 90, status: 'COMPLETED', created_at: new Date(Date.now() - 3*86400000).toISOString(), completed_at: new Date(Date.now() - 2*86400000).toISOString() },
  { task_id: 10, student_id: 1, course_id: 5, title: 'Built Bank Account Exception hierarchy', topic: 'Java Exceptions', priority: 'MEDIUM', due_date: new Date(Date.now() - 4*86400000).toISOString().split('T')[0], estimated_duration_minutes: 60, status: 'COMPLETED', created_at: new Date(Date.now() - 5*86400000).toISOString(), completed_at: new Date(Date.now() - 4*86400000).toISOString() }
];

let notifications = [
  { notification_id: 1, user_id: 1, title: 'Assignment Graded', message: 'Your submission for Assignment 1: Dijkstra Shortest Path has been graded (95/100).', type: 'GRADE', link_url: '/assignments/7', is_read: false, created_at: new Date().toISOString() },
  { notification_id: 2, user_id: 1, title: 'Upcoming Deadline', message: 'Assignment 1: Complex SQL Queries is due in 3 days.', type: 'DEADLINE', link_url: '/assignments/1', is_read: false, created_at: new Date().toISOString() },
  { notification_id: 3, user_id: 1, title: 'New Quiz Scheduled', message: 'Prof. A has scheduled Quiz 1: Relational Algebra & SQL for March 22.', type: 'ANNOUNCEMENT', link_url: '/quizzes/1', is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  { notification_id: 4, user_id: 1, title: 'Course Material Uploaded', message: 'New lecture slides on Normalization have been uploaded to CS301.', type: 'ANNOUNCEMENT', link_url: '/courses/1', is_read: true, created_at: new Date(Date.now() - 2*86400000).toISOString() }
];

module.exports = {
  departments,
  users,
  students,
  facultyList,
  admins,
  courses,
  enrollments,
  modules,
  resources,
  bookmarks,
  assignments,
  submissions,
  quizzes,
  questions,
  quizOptions,
  quizAttempts,
  studentAnswers,
  studyTasks,
  notifications
};
