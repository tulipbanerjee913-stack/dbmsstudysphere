/**
 * StudySphere Relational Mock Data for Frontend Client
 * 100% normalized mapping to 18 schema entities (B.Tech CSE Semester VI)
 */

export const currentUser = {
  user_id: 1,
  email: 'student@studysphere.edu',
  first_name: 'Tulip',
  last_name: 'Banerjee',
  role: 'STUDENT',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  profile: {
    student_id: 1,
    roll_number: '25BCE0499',
    department_name: 'Computer Science and Engineering',
    department_code: 'CSE',
    semester: 6,
    academic_year: '2022-2026',
    cgpa: 8.92
  }
};

export const demoFacultyUser = {
  user_id: 4,
  email: 'faculty@studysphere.edu',
  first_name: 'Prof.',
  last_name: 'A',
  role: 'FACULTY',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  profile: {
    faculty_id: 1,
    employee_code: 'FAC-CSE-001',
    department_name: 'Computer Science and Engineering',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    office_room: 'Cabin 304, Tech Block'
  }
};

export const demoAdminUser = {
  user_id: 7,
  email: 'admin@studysphere.edu',
  first_name: 'Academic',
  last_name: 'Dean',
  role: 'ADMIN',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  profile: {
    admin_id: 1,
    admin_code: 'ADM-OFFICE-01',
    office_location: 'Academic Dean Office, Central Block'
  }
};

export const initialCourses = [
  {
    course_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    description: 'Comprehensive foundation covering relational model, SQL, normalization (1NF-3NF/BCNF), transactions (ACID), indexing, and concurrency control.',
    credits: 4,
    department_code: 'CSE',
    department_name: 'Computer Science and Engineering',
    faculty_name: 'Prof. A',
    faculty_designation: 'Associate Professor',
    faculty_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    faculty_qualification: 'Ph.D. in Computer Science',
    faculty_office: 'Cabin 304, Tech Block',
    progress_percentage: 85,
    is_enrolled: true,
    modules_count: 2,
    total_enrolled: 64,
    color_accent: 'indigo'
  },
  {
    course_id: 2,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    description: 'Deep dive into process management, CPU scheduling algorithms, virtual memory paging, multithreading, synchronization deadlocks, and file systems.',
    credits: 4,
    department_code: 'CSE',
    department_name: 'Computer Science and Engineering',
    faculty_name: 'Prof. B',
    faculty_designation: 'Assistant Professor',
    faculty_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    faculty_qualification: 'M.Tech CSE',
    faculty_office: 'Cabin 309, Tech Block',
    progress_percentage: 78,
    is_enrolled: true,
    modules_count: 2,
    total_enrolled: 62,
    color_accent: 'blue'
  },
  {
    course_id: 3,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    description: 'OSI and TCP/IP protocol suites, IP addressing, subnetting, routing protocols (OSPF, BGP), TCP flow & congestion control, and application layer protocols.',
    credits: 3,
    department_code: 'CSE',
    department_name: 'Computer Science and Engineering',
    faculty_name: 'Prof. C',
    faculty_designation: 'Professor',
    faculty_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    faculty_qualification: 'Ph.D. in Network Systems',
    faculty_office: 'Cabin 202, Admin Wing',
    progress_percentage: 72,
    is_enrolled: true,
    modules_count: 2,
    total_enrolled: 58,
    color_accent: 'emerald'
  },
  {
    course_id: 4,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    description: 'Advanced algorithm design: dynamic programming, graph algorithms (Dijkstra, Bellman-Ford), greedy methods, trees, and computational complexity.',
    credits: 4,
    department_code: 'CSE',
    department_name: 'Computer Science and Engineering',
    faculty_name: 'Prof. A',
    faculty_designation: 'Associate Professor',
    faculty_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    faculty_qualification: 'Ph.D. in Computer Science',
    faculty_office: 'Cabin 304, Tech Block',
    progress_percentage: 90,
    is_enrolled: true,
    modules_count: 2,
    total_enrolled: 68,
    color_accent: 'purple'
  },
  {
    course_id: 5,
    course_code: 'CS305',
    course_name: 'Object Oriented Programming with Java',
    description: 'Enterprise Java paradigms: OOP principles, collections framework, exception handling, multithreading, JDBC connectivity, and design patterns.',
    credits: 3,
    department_code: 'CSE',
    department_name: 'Computer Science and Engineering',
    faculty_name: 'Prof. B',
    faculty_designation: 'Assistant Professor',
    faculty_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    faculty_qualification: 'M.Tech CSE',
    faculty_office: 'Cabin 309, Tech Block',
    progress_percentage: 65,
    is_enrolled: true,
    modules_count: 2,
    total_enrolled: 60,
    color_accent: 'amber'
  }
];

export const initialModules = [
  {
    module_id: 1,
    course_id: 1,
    module_number: 1,
    module_title: 'Relational Model, ER Diagrams & SQL Foundations',
    description: 'Entity-Relationship modeling, relational algebra operators, DDL, DML queries, and integrity constraints.',
    estimated_hours: 12
  },
  {
    module_id: 2,
    course_id: 1,
    module_number: 2,
    module_title: 'Database Normalization & Transaction Processing',
    description: 'Functional dependencies, 1NF, 2NF, 3NF, BCNF, ACID transactions, serializability, and 2-Phase Locking.',
    estimated_hours: 14
  },
  {
    module_id: 3,
    course_id: 2,
    module_number: 1,
    module_title: 'Process Management & CPU Scheduling',
    description: 'Process control blocks, fork(), context switching, preemptive vs non-preemptive scheduling (FCFS, SJF, RR).',
    estimated_hours: 10
  },
  {
    module_id: 4,
    course_id: 2,
    module_number: 2,
    module_title: 'Process Synchronization & Virtual Memory',
    description: 'Semaphores, mutexes, dining philosophers problem, paging, page replacement (LRU, FIFO), and thrashing.',
    estimated_hours: 14
  },
  {
    module_id: 5,
    course_id: 3,
    module_number: 1,
    module_title: 'Data Link Layer & Network Layer Architecture',
    description: 'Framing, error detection (CRC), CSMA/CD, IPv4/IPv6 addressing, VLSM subnetting, and routing tables.',
    estimated_hours: 12
  },
  {
    module_id: 6,
    course_id: 3,
    module_number: 2,
    module_title: 'Transport & Application Layer Protocols',
    description: 'TCP 3-way handshake, sliding window, congestion control, UDP, DNS resolution, and HTTP/HTTPS handshake.',
    estimated_hours: 10
  },
  {
    module_id: 7,
    course_id: 4,
    module_number: 1,
    module_title: 'Graph Theory & Shortest Path Algorithms',
    description: 'BFS, DFS, topological sorting, Dijkstra single-source shortest path, Prim and Kruskal MST algorithms.',
    estimated_hours: 12
  },
  {
    module_id: 8,
    course_id: 4,
    module_number: 2,
    module_title: 'Dynamic Programming & Divide-and-Conquer',
    description: 'Memoization vs tabulation, 0/1 Knapsack, Longest Common Subsequence, matrix chain multiplication.',
    estimated_hours: 14
  },
  {
    module_id: 9,
    course_id: 5,
    module_number: 1,
    module_title: 'Core Java OOP & Exception Architecture',
    description: 'Encapsulation, inheritance hierarchies, abstract classes, interfaces, checked vs unchecked exceptions.',
    estimated_hours: 10
  },
  {
    module_id: 10,
    course_id: 5,
    module_number: 2,
    module_title: 'Java Collections Framework & Concurrency',
    description: 'List, Set, Map implementations, Generics, Thread life cycle, synchronization blocks, and ExecutorService.',
    estimated_hours: 12
  }
];

export const initialResources = [
  {
    resource_id: 1,
    course_id: 1,
    module_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Relational Model, ER Diagrams & SQL Foundations',
    title: 'Lecture 01-04: Relational Algebra & Calculus Slides',
    description: 'Comprehensive PDF slides explaining projection, selection, Cartesian product, and Theta join.',
    resource_type: 'PDF',
    file_url: 'https://studysphere.edu/res/dbms/relational_algebra.pdf',
    file_size_kb: 3420,
    created_at: '2026-01-15T10:00:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 2,
    course_id: 1,
    module_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Relational Model, ER Diagrams & SQL Foundations',
    title: 'Handwritten Study Notes on SQL Joins & Subqueries',
    description: 'Handwritten quick-revision notes with sample schemas and query visualizations.',
    resource_type: 'Notes',
    file_url: 'https://studysphere.edu/res/dbms/sql_joins_notes.pdf',
    file_size_kb: 1850,
    created_at: '2026-01-18T11:30:00Z',
    is_bookmarked: true
  },
  {
    resource_id: 3,
    course_id: 1,
    module_id: 2,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Database Normalization & Transaction Processing',
    title: 'Lecture Recording: Decomposition & 3NF vs BCNF',
    description: 'In-depth 50-minute video walkthrough of Armstrong axioms and lossless join decomposition.',
    resource_type: 'Video',
    file_url: 'https://www.youtube.com/watch?v=example_dbms_3nf',
    file_size_kb: 0,
    created_at: '2026-02-01T14:15:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 4,
    course_id: 1,
    module_id: 2,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Database Normalization & Transaction Processing',
    title: 'End-Semester Previous Year Paper (2024 & 2025 Solved)',
    description: 'Previous year university semester examination questions solved with step-by-step proofs.',
    resource_type: 'Previous Year Paper',
    file_url: 'https://studysphere.edu/res/dbms/pyq_2024_2025.pdf',
    file_size_kb: 4200,
    created_at: '2026-02-10T09:00:00Z',
    is_bookmarked: true
  },
  {
    resource_id: 5,
    course_id: 1,
    module_id: 2,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Database Normalization & Transaction Processing',
    title: 'Interactive SQL & Relational Normalizer Tool',
    description: 'Web-based visual normalization calculator and relational algebra playground.',
    resource_type: 'Link',
    file_url: 'https://db-normalizer.example.org',
    file_size_kb: 0,
    created_at: '2026-02-12T16:45:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 6,
    course_id: 2,
    module_id: 3,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Management & CPU Scheduling',
    title: 'CPU Scheduling Algorithms Comparison Cheat Sheet',
    description: 'Comparison table of turnaround time and waiting time formulas across FCFS, SJF, and Round Robin.',
    resource_type: 'PDF',
    file_url: 'https://studysphere.edu/res/os/cpu_scheduling_cheatsheet.pdf',
    file_size_kb: 1240,
    created_at: '2026-01-20T09:30:00Z',
    is_bookmarked: true
  },
  {
    resource_id: 7,
    course_id: 2,
    module_id: 4,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Synchronization & Virtual Memory',
    title: 'Dining Philosophers & Classical Synchronization Notes',
    description: 'Detailed solution notes covering semaphores, mutex locks, and deadlock condition elimination.',
    resource_type: 'Notes',
    file_url: 'https://studysphere.edu/res/os/synchronization_notes.pdf',
    file_size_kb: 2100,
    created_at: '2026-02-05T15:00:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 8,
    course_id: 2,
    module_id: 4,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Synchronization & Virtual Memory',
    title: 'Video Demo: Page Replacement Algorithms in Linux',
    description: 'Video demonstrating LRU vs FIFO page faults simulation with trace files.',
    resource_type: 'Video',
    file_url: 'https://www.youtube.com/watch?v=example_os_paging',
    file_size_kb: 0,
    created_at: '2026-02-15T11:20:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 9,
    course_id: 2,
    module_id: 4,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Synchronization & Virtual Memory',
    title: 'OS End-Sem PYQ Papers with Solutions (2022-2025)',
    description: 'Official 4-year compiled questions on virtual memory, paging, and deadlocks.',
    resource_type: 'Previous Year Paper',
    file_url: 'https://studysphere.edu/res/os/os_endsem_pyq.pdf',
    file_size_kb: 5100,
    created_at: '2026-02-18T10:10:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 10,
    course_id: 3,
    module_id: 5,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    module_title: 'Data Link Layer & Network Layer Architecture',
    title: 'Subnetting & VLSM Complete Practical Guide',
    description: 'Step-by-step guide with 25 solved subnet mask and CIDR notation calculation problems.',
    resource_type: 'PDF',
    file_url: 'https://studysphere.edu/res/cn/subnetting_vlsm_guide.pdf',
    file_size_kb: 2890,
    created_at: '2026-01-22T13:00:00Z',
    is_bookmarked: true
  },
  {
    resource_id: 11,
    course_id: 3,
    module_id: 6,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    module_title: 'Transport & Application Layer Protocols',
    title: 'Interactive Wireshark TCP 3-Way Handshake Lab',
    description: 'Packet capture trace download link with step-by-step Wireshark inspection protocol.',
    resource_type: 'Link',
    file_url: 'https://wireshark-labs.example.edu/tcp-analysis',
    file_size_kb: 0,
    created_at: '2026-02-08T14:00:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 12,
    course_id: 3,
    module_id: 6,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    module_title: 'Transport & Application Layer Protocols',
    title: 'Computer Networks Solved Question Bank (2025)',
    description: 'University model test paper covering routing protocols (RIP, OSPF, BGP) and TCP congestion.',
    resource_type: 'Previous Year Paper',
    file_url: 'https://studysphere.edu/res/cn/cn_solved_bank_2025.pdf',
    file_size_kb: 3800,
    created_at: '2026-02-20T16:30:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 13,
    course_id: 4,
    module_id: 7,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    module_title: 'Graph Theory & Shortest Path Algorithms',
    title: 'Dijkstra and MST Graph Algorithms Reference Notes',
    description: 'Proof of correctness and complexity analysis for Dijkstra and Prim-Kruskal algorithms.',
    resource_type: 'Notes',
    file_url: 'https://studysphere.edu/res/dsa/graph_algorithms_notes.pdf',
    file_size_kb: 1950,
    created_at: '2026-01-25T11:00:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 14,
    course_id: 4,
    module_id: 8,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    module_title: 'Dynamic Programming & Divide-and-Conquer',
    title: 'Dynamic Programming Patterns & Tabulation Guide',
    description: 'PDF booklet of 14 standard DP archetypes: knapsack, grid paths, interval DP, bitmasking.',
    resource_type: 'PDF',
    file_url: 'https://studysphere.edu/res/dsa/dp_patterns_guide.pdf',
    file_size_kb: 4500,
    created_at: '2026-02-14T17:00:00Z',
    is_bookmarked: false
  },
  {
    resource_id: 15,
    course_id: 5,
    module_id: 10,
    course_code: 'CS305',
    course_name: 'Object Oriented Programming with Java',
    module_title: 'Java Collections Framework & Concurrency',
    title: 'Java Multithreading & Concurrency Deep Dive',
    description: 'Slide deck explaining Thread pools, Synchronized blocks, ReentrantLock, and Deadlocks in JVM.',
    resource_type: 'PDF',
    file_url: 'https://studysphere.edu/res/java/concurrency_deep_dive.pdf',
    file_size_kb: 3100,
    created_at: '2026-02-12T10:45:00Z',
    is_bookmarked: false
  }
];

export const initialAssignments = [
  {
    assignment_id: 1,
    course_id: 1,
    module_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Relational Model, ER Diagrams & SQL Foundations',
    title: 'Assignment 1: Complex SQL Queries & Relational Algebra',
    description: 'Write relational algebra expressions and MySQL queries for university database schema with nested GROUP BY and HAVING clauses.',
    maximum_marks: 100,
    weightage_percent: 10,
    due_date: '2026-03-20T23:59:00Z',
    allow_late_submission: true,
    status: 'PENDING',
    submission: null
  },
  {
    assignment_id: 2,
    course_id: 1,
    module_id: 2,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Database Normalization & Transaction Processing',
    title: 'Assignment 2: Schema Normalization to 3NF & BCNF',
    description: 'Analyze a set of functional dependencies for a healthcare management schema. Decompose into 3NF and verify lossless join property.',
    maximum_marks: 100,
    weightage_percent: 10,
    due_date: '2026-03-25T23:59:00Z',
    allow_late_submission: false,
    status: 'PENDING',
    submission: null
  },
  {
    assignment_id: 3,
    course_id: 2,
    module_id: 3,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Management & CPU Scheduling',
    title: 'Assignment 1: CPU Scheduling Simulator in C/C++',
    description: 'Implement Preemptive SJF and Round Robin (Quantum = 4ms) scheduling simulator. Calculate average turnaround time and waiting time.',
    maximum_marks: 50,
    weightage_percent: 10,
    due_date: '2026-03-18T23:59:00Z',
    allow_late_submission: true,
    status: 'LATE',
    submission: {
      submission_id: 4,
      submitted_at: '2026-03-19T02:15:00Z',
      submission_text: 'Simulated Round Robin and SJF with Gantt chart generation.',
      file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign3.cpp',
      status: 'LATE',
      marks_obtained: null,
      feedback: null
    }
  },
  {
    assignment_id: 4,
    course_id: 2,
    module_id: 4,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Synchronization & Virtual Memory',
    title: 'Assignment 2: Deadlock Avoidance with Banker Algorithm',
    description: 'Program the Banker algorithm in C/C++ to verify whether a given resource-allocation state is safe. Find the safe execution sequence.',
    maximum_marks: 50,
    weightage_percent: 10,
    due_date: '2026-03-28T23:59:00Z',
    allow_late_submission: true,
    status: 'PENDING',
    submission: null
  },
  {
    assignment_id: 5,
    course_id: 3,
    module_id: 5,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    module_title: 'Data Link Layer & Network Layer Architecture',
    title: 'Assignment 1: CIDR Subnetting & Packet Routing Design',
    description: 'Given classless IP block 192.168.10.0/24, design 4 distinct subnets for college campus departments with minimum waste IP allocation.',
    maximum_marks: 100,
    weightage_percent: 10,
    due_date: '2026-03-15T23:59:00Z',
    allow_late_submission: true,
    status: 'SUBMITTED',
    submission: {
      submission_id: 3,
      submitted_at: '2026-03-14T22:10:00Z',
      submission_text: 'Completed CIDR calculations and routing table design for 4 subnets.',
      file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign5.pdf',
      status: 'SUBMITTED',
      marks_obtained: null,
      feedback: null
    }
  },
  {
    assignment_id: 6,
    course_id: 3,
    module_id: 6,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    module_title: 'Transport & Application Layer Protocols',
    title: 'Assignment 2: Wireshark Packet Inspection Analysis',
    description: 'Capture TCP packets during an HTTPS handshake. Identify SYN, SYN-ACK, ACK, and TLS ClientHello records with sequence numbers.',
    maximum_marks: 100,
    weightage_percent: 10,
    due_date: '2026-04-02T23:59:00Z',
    allow_late_submission: true,
    status: 'PENDING',
    submission: null
  },
  {
    assignment_id: 7,
    course_id: 4,
    module_id: 7,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    module_title: 'Graph Theory & Shortest Path Algorithms',
    title: 'Assignment 1: Dijkstra Shortest Path Implementation',
    description: 'Implement Dijkstra algorithm using min-priority heap in C++ or Python. Benchmark against dense matrix graph representations.',
    maximum_marks: 100,
    weightage_percent: 15,
    due_date: '2026-03-12T23:59:00Z',
    allow_late_submission: false,
    status: 'EVALUATED',
    submission: {
      submission_id: 1,
      submitted_at: '2026-03-11T20:30:00Z',
      submission_text: 'Implemented min-heap priority queue with O((V+E) log V) time complexity.',
      file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign7.zip',
      status: 'EVALUATED',
      marks_obtained: 95.0,
      feedback: 'Excellent implementation. Heap operations and edge relaxation logic are well documented.'
    }
  },
  {
    assignment_id: 8,
    course_id: 5,
    module_id: 9,
    course_code: 'CS305',
    course_name: 'Object Oriented Programming with Java',
    module_title: 'Core Java OOP & Exception Architecture',
    title: 'Assignment 1: Banking Transaction Simulator with Exceptions',
    description: 'Build an object-oriented Java console application handling InsufficientFundsException and AccountNotFoundException.',
    maximum_marks: 50,
    weightage_percent: 10,
    due_date: '2026-03-14T23:59:00Z',
    allow_late_submission: true,
    status: 'EVALUATED',
    submission: {
      submission_id: 2,
      submitted_at: '2026-03-13T18:45:00Z',
      submission_text: 'Custom exception hierarchy implemented with synchronized balance deduction methods.',
      file_attachment_url: 'https://studysphere.edu/uploads/25BCE0499_assign8.zip',
      status: 'EVALUATED',
      marks_obtained: 48.0,
      feedback: 'Clean OOP design and comprehensive unit tests.'
    }
  }
];

export const initialQuizzes = [
  {
    quiz_id: 1,
    course_id: 1,
    module_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Relational Model, ER Diagrams & SQL Foundations',
    title: 'Quiz 1: Relational Algebra & SQL Mastery',
    description: 'Test your knowledge on relational operators, Cartesian product, natural join, and correlated subqueries.',
    duration_minutes: 15,
    total_marks: 10,
    passing_marks: 5,
    due_date: '2026-03-22T23:59:00Z',
    question_count: 4,
    status: 'AVAILABLE',
    latest_attempt: null
  },
  {
    quiz_id: 2,
    course_id: 1,
    module_id: 2,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    module_title: 'Database Normalization & Transaction Processing',
    title: 'Quiz 2: Normalization & Transaction ACID Properties',
    description: 'Assessment on identifying highest normal form, functional dependencies, and serializability.',
    duration_minutes: 20,
    total_marks: 10,
    passing_marks: 5,
    due_date: '2026-03-29T23:59:00Z',
    question_count: 4,
    status: 'AVAILABLE',
    latest_attempt: null
  },
  {
    quiz_id: 3,
    course_id: 2,
    module_id: 3,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    module_title: 'Process Management & CPU Scheduling',
    title: 'Quiz 1: OS Processes, Threads & Scheduling',
    description: 'Multiple choice questions on fork() semantics, context switching, and scheduling metrics.',
    duration_minutes: 15,
    total_marks: 10,
    passing_marks: 5,
    due_date: '2026-03-24T23:59:00Z',
    question_count: 4,
    status: 'AVAILABLE',
    latest_attempt: null
  },
  {
    quiz_id: 4,
    course_id: 3,
    module_id: 5,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    module_title: 'Data Link Layer & Network Layer Architecture',
    title: 'Quiz 1: IP Addressing, Subnetting & Framing',
    description: 'Evaluate proficiency in subnet masks, CIDR prefix matching, and CRC parity checks.',
    duration_minutes: 15,
    total_marks: 10,
    passing_marks: 5,
    due_date: '2026-03-26T23:59:00Z',
    question_count: 4,
    status: 'AVAILABLE',
    latest_attempt: null
  },
  {
    quiz_id: 5,
    course_id: 4,
    module_id: 7,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    module_title: 'Graph Theory & Shortest Path Algorithms',
    title: 'Quiz 1: Graph Traversal & Shortest Path Algorithms',
    description: 'Test algorithmic intuition on BFS vs DFS properties, negative edge weights, and MST algorithms.',
    duration_minutes: 20,
    total_marks: 10,
    passing_marks: 5,
    due_date: '2026-03-15T23:59:00Z',
    question_count: 4,
    status: 'COMPLETED',
    latest_attempt: {
      attempt_id: 1,
      score_obtained: 4,
      total_questions: 4,
      correct_count: 4,
      incorrect_count: 0,
      percentage: 100,
      completed_at: '2026-03-14T15:11:30Z'
    }
  }
];

export const quizQuestionsMap = {
  1: [
    {
      question_id: 1,
      question_number: 1,
      question_text: 'Which relational algebra operation is equivalent to a Cartesian product followed by a selection condition?',
      explanation: 'A Theta Join is formally defined as a Cartesian Product followed by a Selection operation with condition theta.',
      marks: 1.0,
      options: [
        { option_id: 1, option_label: 'A', option_text: 'Natural Join', is_correct: false },
        { option_id: 2, option_label: 'B', option_text: 'Theta Join', is_correct: true },
        { option_id: 3, option_label: 'C', option_text: 'Projection', is_correct: false },
        { option_id: 4, option_label: 'D', option_text: 'Union', is_correct: false }
      ]
    },
    {
      question_id: 2,
      question_number: 2,
      question_text: 'In SQL, which clause is specifically used to filter groups created by the GROUP BY clause?',
      explanation: 'The HAVING clause filters aggregated groups, whereas WHERE filters individual rows before grouping.',
      marks: 1.0,
      options: [
        { option_id: 5, option_label: 'A', option_text: 'WHERE', is_correct: false },
        { option_id: 6, option_label: 'B', option_text: 'ORDER BY', is_correct: false },
        { option_id: 7, option_label: 'C', option_text: 'HAVING', is_correct: true },
        { option_id: 8, option_label: 'D', option_text: 'FILTER', is_correct: false }
      ]
    },
    {
      question_id: 3,
      question_number: 3,
      question_text: 'Which of the following relational algebra operators is NOT a fundamental (primitive) operator?',
      explanation: 'Natural Join is a derived operator combining Cartesian product, selection, and projection.',
      marks: 1.0,
      options: [
        { option_id: 9, option_label: 'A', option_text: 'Selection', is_correct: false },
        { option_id: 10, option_label: 'B', option_text: 'Projection', is_correct: false },
        { option_id: 11, option_label: 'C', option_text: 'Cartesian Product', is_correct: false },
        { option_id: 12, option_label: 'D', option_text: 'Natural Join', is_correct: true }
      ]
    },
    {
      question_id: 4,
      question_number: 4,
      question_text: 'What is the maximum number of superkeys for a relation with n attributes having a single candidate key with 1 attribute?',
      explanation: 'If one attribute is the candidate key, any superset of this attribute is a superkey, yielding 2^(n-1) superkeys.',
      marks: 1.0,
      options: [
        { option_id: 13, option_label: 'A', option_text: '2^n', is_correct: false },
        { option_id: 14, option_label: 'B', option_text: '2^(n-1)', is_correct: true },
        { option_id: 15, option_label: 'C', option_text: 'n!', is_correct: false },
        { option_id: 16, option_label: 'D', option_text: '2^(n-2)', is_correct: false }
      ]
    }
  ],
  2: [
    {
      question_id: 5,
      question_number: 1,
      question_text: 'A relation R is in 2NF if it is in 1NF and what other condition holds?',
      explanation: '2NF requires no partial dependency, meaning every non-prime attribute must be fully functionally dependent on every candidate key.',
      marks: 1.0,
      options: [
        { option_id: 17, option_label: 'A', option_text: 'Every determinant is a candidate key', is_correct: false },
        { option_id: 18, option_label: 'B', option_text: 'No non-prime attribute is partially dependent on any candidate key', is_correct: true },
        { option_id: 19, option_label: 'C', option_text: 'No transitive dependencies exist', is_correct: false },
        { option_id: 20, option_label: 'D', option_text: 'All attributes are atomic', is_correct: false }
      ]
    },
    {
      question_id: 6,
      question_number: 2,
      question_text: 'Which normal form guarantees both dependency preservation and lossless join decomposition in all cases?',
      explanation: '3NF always guarantees both lossless join and dependency preservation, whereas BCNF may not preserve dependencies.',
      marks: 1.0,
      options: [
        { option_id: 21, option_label: 'A', option_text: 'BCNF', is_correct: false },
        { option_id: 22, option_label: 'B', option_text: '3NF', is_correct: true },
        { option_id: 23, option_label: 'C', option_text: '4NF', is_correct: false },
        { option_id: 24, option_label: 'D', option_text: '5NF', is_correct: false }
      ]
    },
    {
      question_id: 7,
      question_number: 3,
      question_text: 'Which property of ACID ensures that concurrent transactions do not interfere with each other?',
      explanation: 'Isolation ensures that concurrently executing transactions cannot view each other intermediate uncommitted states.',
      marks: 1.0,
      options: [
        { option_id: 25, option_label: 'A', option_text: 'Atomicity', is_correct: false },
        { option_id: 26, option_label: 'B', option_text: 'Consistency', is_correct: false },
        { option_id: 27, option_label: 'C', option_text: 'Isolation', is_correct: true },
        { option_id: 28, option_label: 'D', option_text: 'Durability', is_correct: false }
      ]
    },
    {
      question_id: 8,
      question_number: 4,
      question_text: 'In Two-Phase Locking (2PL), what occurs during the shrinking phase?',
      explanation: 'In the shrinking phase of 2PL, a transaction may only release locks and cannot obtain any new locks.',
      marks: 1.0,
      options: [
        { option_id: 29, option_label: 'A', option_text: 'Locks can only be acquired', is_correct: false },
        { option_id: 30, option_label: 'B', option_text: 'Locks can only be released', is_correct: true },
        { option_id: 31, option_label: 'C', option_text: 'Locks can be both acquired and released', is_correct: false },
        { option_id: 32, option_label: 'D', option_text: 'Transactions are committed automatically', is_correct: false }
      ]
    }
  ],
  3: [
    {
      question_id: 9,
      question_number: 1,
      question_text: 'What is the return value of fork() in the parent process upon successful creation of a child?',
      explanation: 'fork() returns the PID of the newly created child process to the parent, and returns 0 to the child.',
      marks: 1.0,
      options: [
        { option_id: 33, option_label: 'A', option_text: '0', is_correct: false },
        { option_id: 34, option_label: 'B', option_text: 'Child PID', is_correct: true },
        { option_id: 35, option_label: 'C', option_text: '-1', is_correct: false },
        { option_id: 36, option_label: 'D', option_text: '1', is_correct: false }
      ]
    },
    {
      question_id: 10,
      question_number: 2,
      question_text: 'Which CPU scheduling algorithm is provably optimal in terms of minimizing average waiting time?',
      explanation: 'Shortest Job First (SJF) is provably optimal for minimizing average waiting time when burst times are known in advance.',
      marks: 1.0,
      options: [
        { option_id: 37, option_label: 'A', option_text: 'FCFS', is_correct: false },
        { option_id: 38, option_label: 'B', option_text: 'Round Robin', is_correct: false },
        { option_id: 39, option_label: 'C', option_text: 'Shortest Job First (SJF)', is_correct: true },
        { option_id: 40, option_label: 'D', option_text: 'Priority Scheduling', is_correct: false }
      ]
    },
    {
      question_id: 11,
      question_number: 3,
      question_text: 'What problem arises when a process is perpetually denied CPU allocation because higher-priority jobs keep arriving?',
      explanation: 'Starvation occurs when a runnable process is indefinitely delayed from obtaining a required resource.',
      marks: 1.0,
      options: [
        { option_id: 41, option_label: 'A', option_text: 'Deadlock', is_correct: false },
        { option_id: 42, option_label: 'B', option_text: 'Starvation', is_correct: true },
        { option_id: 43, option_label: 'C', option_text: 'Thrashing', is_correct: false },
        { option_id: 44, option_label: 'D', option_text: 'Paging', is_correct: false }
      ]
    },
    {
      question_id: 12,
      question_number: 4,
      question_text: 'Which technique is used to prevent starvation in priority scheduling?',
      explanation: 'Aging gradually increases the priority of processes that wait in the system for a long time.',
      marks: 1.0,
      options: [
        { option_id: 45, option_label: 'A', option_text: 'Compaction', is_correct: false },
        { option_id: 46, option_label: 'B', option_text: 'Aging', is_correct: true },
        { option_id: 47, option_label: 'C', option_text: 'Swapping', is_correct: false },
        { option_id: 48, option_label: 'D', option_text: 'Paging', is_correct: false }
      ]
    }
  ],
  4: [
    {
      question_id: 13,
      question_number: 1,
      question_text: 'What is the broadcast address for the subnet 192.168.1.32/27?',
      explanation: 'A /27 subnet mask has 32 IP addresses (block size 32). The subnet range is .32 to .63, so .63 is the broadcast address.',
      marks: 1.0,
      options: [
        { option_id: 49, option_label: 'A', option_text: '192.168.1.31', is_correct: false },
        { option_id: 50, option_label: 'B', option_text: '192.168.1.63', is_correct: true },
        { option_id: 51, option_label: 'C', option_text: '192.168.1.64', is_correct: false },
        { option_id: 52, option_label: 'D', option_text: '192.168.1.255', is_correct: false }
      ]
    },
    {
      question_id: 14,
      question_number: 2,
      question_text: 'Which layer in the OSI model is responsible for end-to-end reliability and flow control?',
      explanation: 'The Transport layer is responsible for end-to-end communication, flow control, and error recovery.',
      marks: 1.0,
      options: [
        { option_id: 53, option_label: 'A', option_text: 'Network Layer', is_correct: false },
        { option_id: 54, option_label: 'B', option_text: 'Data Link Layer', is_correct: false },
        { option_id: 55, option_label: 'C', option_text: 'Transport Layer', is_correct: true },
        { option_id: 56, option_label: 'D', option_text: 'Session Layer', is_correct: false }
      ]
    },
    {
      question_id: 15,
      question_number: 3,
      question_text: 'What is the size of the MAC address in bytes?',
      explanation: 'A MAC (Media Access Control) address is 48 bits, which equals 6 bytes.',
      marks: 1.0,
      options: [
        { option_id: 57, option_label: 'A', option_text: '4 bytes', is_correct: false },
        { option_id: 58, option_label: 'B', option_text: '6 bytes', is_correct: true },
        { option_id: 59, option_label: 'C', option_text: '8 bytes', is_correct: false },
        { option_id: 60, option_label: 'D', option_text: '16 bytes', is_correct: false }
      ]
    },
    {
      question_id: 16,
      question_number: 4,
      question_text: 'Which protocol resolves an IP address to a physical MAC address on a local area network?',
      explanation: 'Address Resolution Protocol (ARP) translates an IPv4 address to the associated physical hardware MAC address.',
      marks: 1.0,
      options: [
        { option_id: 61, option_label: 'A', option_text: 'DNS', is_correct: false },
        { option_id: 62, option_label: 'B', option_text: 'DHCP', is_correct: false },
        { option_id: 63, option_label: 'C', option_text: 'ARP', is_correct: true },
        { option_id: 64, option_label: 'D', option_text: 'ICMP', is_correct: false }
      ]
    }
  ],
  5: [
    {
      question_id: 17,
      question_number: 1,
      question_text: 'Dijkstra shortest path algorithm may fail to produce correct results in the presence of what?',
      explanation: 'Dijkstra assumes greedy non-decreasing edge relaxations and can fail or loop infinitely if negative weight edges exist.',
      marks: 1.0,
      options: [
        { option_id: 65, option_label: 'A', option_text: 'Cycles', is_correct: false },
        { option_id: 66, option_label: 'B', option_text: 'Negative weight edges', is_correct: true },
        { option_id: 67, option_label: 'C', option_text: 'Disconnected vertices', is_correct: false },
        { option_id: 68, option_label: 'D', option_text: 'Directed edges', is_correct: false }
      ]
    },
    {
      question_id: 18,
      question_number: 2,
      question_text: 'What data structure is utilized in Prim algorithm to efficiently select the minimum weight edge?',
      explanation: 'A Min-Priority Queue (Min-Heap) provides O(log V) retrieval of the minimum crossing edge.',
      marks: 1.0,
      options: [
        { option_id: 69, option_label: 'A', option_text: 'Stack', is_correct: false },
        { option_id: 70, option_label: 'B', option_text: 'Min-Priority Queue (Heap)', is_correct: true },
        { option_id: 71, option_label: 'C', option_text: 'Binary Search Tree', is_correct: false },
        { option_id: 72, option_label: 'D', option_text: 'Hash Table', is_correct: false }
      ]
    },
    {
      question_id: 19,
      question_number: 3,
      question_text: 'What is the time complexity of Breadth-First Search (BFS) on an adjacency list representation with V vertices and E edges?',
      explanation: 'BFS visits each vertex once and traverses each incident edge, giving O(V + E) complexity.',
      marks: 1.0,
      options: [
        { option_id: 73, option_label: 'A', option_text: 'O(V^2)', is_correct: false },
        { option_id: 74, option_label: 'B', option_text: 'O(V + E)', is_correct: true },
        { option_id: 75, option_label: 'C', option_text: 'O(V * E)', is_correct: false },
        { option_id: 76, option_label: 'D', option_text: 'O(E log V)', is_correct: false }
      ]
    },
    {
      question_id: 20,
      question_number: 4,
      question_text: 'Which algorithm finds single-source shortest paths in graphs with negative weight edges, assuming no negative weight cycles?',
      explanation: 'Bellman-Ford operates by relaxing all edges |V|-1 times, handling negative edge weights correctly.',
      marks: 1.0,
      options: [
        { option_id: 77, option_label: 'A', option_text: 'Dijkstra', is_correct: false },
        { option_id: 78, option_label: 'B', option_text: 'Kruskal', is_correct: false },
        { option_id: 79, option_label: 'C', option_text: 'Bellman-Ford', is_correct: true },
        { option_id: 80, option_label: 'D', option_text: 'Floyd-Warshall', is_correct: false }
      ]
    }
  ]
};

export const initialTasks = [
  {
    task_id: 1,
    course_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    title: 'Complete SQL nested subquery problem set',
    topic: 'Subqueries & Joins',
    priority: 'HIGH',
    due_date: new Date().toISOString().split('T')[0],
    estimated_duration_minutes: 60,
    status: 'IN_PROGRESS'
  },
  {
    task_id: 2,
    course_id: 2,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    title: 'Revise Peterson solution and Dekker synchronization',
    topic: 'Critical Section Problem',
    priority: 'MEDIUM',
    due_date: new Date().toISOString().split('T')[0],
    estimated_duration_minutes: 45,
    status: 'PENDING'
  },
  {
    task_id: 3,
    course_id: 3,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    title: 'Draw VLSM network topology for DBMS lab subnets',
    topic: 'Subnetting Design',
    priority: 'HIGH',
    due_date: new Date().toISOString().split('T')[0],
    estimated_duration_minutes: 40,
    status: 'PENDING'
  },
  {
    task_id: 4,
    course_id: 1,
    course_code: 'CS301',
    course_name: 'Database Management Systems',
    title: 'Solve BCNF decomposition examples from textbook',
    topic: 'Normalization',
    priority: 'HIGH',
    due_date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 90,
    status: 'PENDING'
  },
  {
    task_id: 5,
    course_id: 2,
    course_code: 'CS302',
    course_name: 'Operating Systems',
    title: 'Implement Round Robin CPU scheduler in C',
    topic: 'CPU Scheduling',
    priority: 'MEDIUM',
    due_date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 120,
    status: 'PENDING'
  },
  {
    task_id: 6,
    course_id: 3,
    course_code: 'CS303',
    course_name: 'Computer Networks',
    title: 'Practice Wireshark TCP 3-way handshake analysis',
    topic: 'Transport Layer',
    priority: 'LOW',
    due_date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 45,
    status: 'PENDING'
  },
  {
    task_id: 7,
    course_id: 4,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    title: 'Study 0/1 Knapsack Tabulation vs Memoization',
    topic: 'Dynamic Programming',
    priority: 'HIGH',
    due_date: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 75,
    status: 'PENDING'
  },
  {
    task_id: 8,
    course_id: 5,
    course_code: 'CS305',
    course_name: 'Object Oriented Programming with Java',
    title: 'Review Java ReentrantLock and Deadlock scenarios',
    topic: 'Multithreading',
    priority: 'MEDIUM',
    due_date: new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 50,
    status: 'PENDING'
  },
  {
    task_id: 9,
    course_id: 4,
    course_code: 'CS304',
    course_name: 'Data Structures & Algorithms',
    title: 'Implemented Dijkstra Shortest Path in C++',
    topic: 'Graph Algorithms',
    priority: 'HIGH',
    due_date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 90,
    status: 'COMPLETED'
  },
  {
    task_id: 10,
    course_id: 5,
    course_code: 'CS305',
    course_name: 'Object Oriented Programming with Java',
    title: 'Built Bank Account Exception hierarchy',
    topic: 'Java Exceptions',
    priority: 'MEDIUM',
    due_date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    estimated_duration_minutes: 60,
    status: 'COMPLETED'
  }
];

export const mockNotifications = [
  {
    id: 1,
    title: 'Assignment Graded',
    message: 'Your submission for Dijkstra Shortest Path has been graded (95/100).',
    time: '2 hours ago',
    type: 'grade',
    unread: true
  },
  {
    id: 2,
    title: 'Upcoming Deadline',
    message: 'Assignment 1: Complex SQL Queries is due in 3 days.',
    time: '5 hours ago',
    type: 'deadline',
    unread: true
  },
  {
    id: 3,
    title: 'New Quiz Scheduled',
    message: 'Course Instructor has scheduled Quiz 1: Relational Algebra & SQL for March 22.',
    time: '1 day ago',
    type: 'announcement',
    unread: false
  },
  {
    id: 4,
    title: 'Course Material Uploaded',
    message: 'New lecture slides on Normalization have been uploaded to CS301.',
    time: '2 days ago',
    type: 'announcement',
    unread: false
  }
];
