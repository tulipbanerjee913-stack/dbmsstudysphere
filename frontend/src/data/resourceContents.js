/**
 * Complete Academic Study Notes & Learning Material for StudySphere
 * Real academic content for college DBMS, OS, Computer Networks, DSA, and Java
 */

export const resourceContents = {
  1: {
    title: 'Lecture 01-04: Relational Algebra & Calculus Slides',
    course: 'CS301 - Database Management Systems',
    module: 'Module 1: Relational Model, ER Diagrams & SQL Foundations',
    author: 'Prof. A (Associate Professor, CSE)',
    lastUpdated: 'Spring 2026',
    sections: [
      {
        heading: '1. Mathematical Foundation of Relational Model',
        content: `A relational database is a collection of relations (tables). Formally, let D1, D2, ..., Dn be domains. A relation r is a subset of the Cartesian product D1 × D2 × ... × Dn.
Each row in the relation is a tuple (an ordered list of values), and each column corresponds to an attribute.

Key Properties:
• Tuples are unordered: Order of rows has no semantic significance.
• Attributes are unordered: Identified strictly by name, not ordinal index.
• Attribute values are atomic: Each cell contains an indivisible domain value (First Normal Form requirement).`
      },
      {
        heading: '2. Fundamental (Primitive) Relational Algebra Operators',
        content: `Relational algebra consists of 5 fundamental operators from which all querying operations can be derived:

1. Selection (σ):
   Filters tuples that satisfy a given predicate condition.
   Syntax: σ_predicate(R)
   SQL Equivalent: SELECT * FROM R WHERE predicate;

2. Projection (π):
   Selects specific columns from a relation, eliminating duplicates.
   Syntax: π_A1,A2,...,Ak(R)
   SQL Equivalent: SELECT DISTINCT A1, A2 FROM R;

3. Cartesian Product (×):
   Combines every tuple of relation R with every tuple of relation S.
   Degree: degree(R) + degree(S)
   Cardinality: |R| × |S|
   SQL Equivalent: SELECT * FROM R CROSS JOIN S;

4. Set Union (∪):
   Produces a relation with tuples from R, S, or both. R and S must be union-compatible (same degree and corresponding attribute domains).
   SQL Equivalent: SELECT * FROM R UNION SELECT * FROM S;

5. Set Difference (-):
   Produces tuples present in R but absent in S.
   SQL Equivalent: SELECT * FROM R EXCEPT SELECT * FROM S;`
      },
      {
        heading: '3. Derived Relational Algebra Operators',
        content: `• Theta Join (⋈_θ):
  Formally defined as a Cartesian product followed by a Selection:
  R ⋈_θ S = σ_θ(R × S)

• Natural Join (⋈):
  Performs equality match on attributes sharing the exact same name across R and S, projecting out duplicate column instances:
  R ⋈ S = π_attributes(σ_R.A = S.A(R × S))

• Division Operator (÷):
  Finds tuples in R that are associated with ALL tuples in S. Ideal for queries like: "Find students enrolled in ALL core computer science subjects."`
      }
    ]
  },

  2: {
    title: 'Handwritten Study Notes on SQL Joins & Subqueries',
    course: 'CS301 - Database Management Systems',
    module: 'Module 1: Relational Model, ER Diagrams & SQL Foundations',
    author: 'Tulip Banerjee (Class Topper Study Notes)',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Visualizing SQL Joins',
        content: `SQL Joins combine columns from one or more tables based on a related column between them.

• INNER JOIN: Returns only rows where the join condition evaluates to TRUE in both tables.
  SELECT s.roll_number, s.student_name, c.course_name
  FROM student s
  INNER JOIN enrollment e ON s.student_id = e.student_id
  INNER JOIN course c ON e.course_id = c.course_id;

• LEFT OUTER JOIN: Returns all rows from the left table, and matched rows from the right table. Unmatched right columns return NULL.
  SELECT c.course_code, c.course_name, COUNT(e.student_id) AS enrolled_count
  FROM course c
  LEFT JOIN enrollment e ON c.course_id = e.course_id
  GROUP BY c.course_code, c.course_name;

• RIGHT OUTER JOIN: Returns all rows from the right table, and matched rows from the left table.`
      },
      {
        heading: '2. Subqueries vs. Correlated Subqueries',
        content: `• Scalar Subquery (Independent):
  Executes exactly once. The inner query passes its result to the outer query.
  -- Find students whose CGPA is higher than the college average:
  SELECT roll_number, cgpa FROM student
  WHERE cgpa > (SELECT AVG(cgpa) FROM student);

• Correlated Subquery:
  Executes once for EVERY tuple evaluated by the outer query. References columns from the outer table.
  -- Find students who have NOT submitted Assignment 1:
  SELECT s.student_id, s.roll_number, u.first_name
  FROM student s
  JOIN user u ON s.user_id = u.user_id
  WHERE NOT EXISTS (
      SELECT 1 FROM submission sub
      WHERE sub.student_id = s.student_id AND sub.assignment_id = 1
  );`
      },
      {
        heading: '3. The HAVING Clause: WHERE vs. HAVING',
        content: `Rule of Thumb:
• WHERE filters individual rows BEFORE aggregation.
• HAVING filters groups AFTER aggregation by GROUP BY.

Example:
SELECT department_id, AVG(cgpa) AS avg_cgpa, COUNT(*) AS student_count
FROM student
WHERE semester = 6            -- Row level filter
GROUP BY department_id        -- Grouping
HAVING AVG(cgpa) >= 8.5;       -- Group level aggregation filter`
      }
    ]
  },

  3: {
    title: 'Lecture Recording: Decomposition & 3NF vs BCNF',
    course: 'CS301 - Database Management Systems',
    module: 'Module 2: Database Normalization & Transaction Processing',
    author: 'Prof. A (Lecture Walkthrough)',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Why Normalization Matters',
        content: `Unnormalized relational schemas suffer from three critical update anomalies:
1. Insertion Anomaly: Cannot record certain information without inserting nulls for unrelated attributes.
2. Deletion Anomaly: Deleting one fact inadvertently purges other important independent facts.
3. Modification Anomaly: Inconsistent updates across duplicate tuple entries.`
      },
      {
        heading: '2. Normal Form Hierarchies',
        content: `• 1NF (First Normal Form):
  All column values are atomic. No multi-valued sets or repeating groups.

• 2NF (Second Normal Form):
  Must be in 1NF. Every non-prime attribute must be FULLY functionally dependent on the entire primary key (no partial functional dependency).

• 3NF (Third Normal Form):
  Must be in 2NF. For every non-trivial functional dependency X → Y:
  - Either X is a superkey, OR
  - Y is a prime attribute (part of a candidate key).
  (Eliminates Transitive Dependencies: Primary Key → Intermediate Attribute → Non-prime Attribute).

• BCNF (Boyce-Codd Normal Form):
  Strict normal form. For EVERY non-trivial dependency X → Y, X MUST be a superkey.
  Trade-off: BCNF guarantees zero redundancy from functional dependencies, but does not always guarantee dependency preservation.`
      },
      {
        heading: '3. Lossless-Join Decomposition Algorithm',
        content: `A decomposition of relation R into R1 and R2 is lossless if and only if the common attribute(s) form a superkey of at least one relation:
(R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2

If this condition fails, joining the decomposed relations will produce spurious tuples (phantom invalid records)!`
      }
    ]
  },

  4: {
    title: 'End-Semester Previous Year Paper (2024 & 2025 Solved)',
    course: 'CS301 - Database Management Systems',
    module: 'Module 2: Database Normalization & Transaction Processing',
    author: 'University Examination Board (Model Solutions)',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: 'University Question 1: Schema Normalization Proof (10 Marks)',
        content: `Problem:
Given Relation R(A, B, C, D, E) with Functional Dependencies:
F = { A → B, BC → D, D → E, E → A }
Determine the Candidate Keys and find the highest normal form of R.

Solution:
Step 1: Compute Attribute Closures:
(A)+ = {A, B}
(AC)+ = {A, B, C, D, E} = R  --> AC is a Candidate Key!
(BC)+ = {B, C, D, E, A} = R  --> BC is a Candidate Key!
(CD)+ = {C, D, E, A, B} = R  --> CD is a Candidate Key!
(CE)+ = {C, E, A, B, D} = R  --> CE is a Candidate Key!

Prime Attributes: {A, B, C, D, E} (all attributes are prime!).
Since all attributes belong to at least one candidate key, every non-trivial dependency satisfies the 3NF condition: Y is a prime attribute.
Therefore, the highest normal form is 3NF.`
      },
      {
        heading: 'University Question 2: ACID Transactions & Concurrency (10 Marks)',
        content: `Problem:
Explain the 2-Phase Locking (2PL) protocol. Does 2PL prevent deadlocks?

Solution:
The 2PL protocol guarantees serializability of concurrent transaction schedules.
1. Growing Phase: Transaction may obtain locks, but cannot release any lock.
2. Shrinking Phase: Transaction may release locks, but cannot acquire any new lock.

Important:
2PL guarantees conflict serializability, but DOES NOT prevent deadlocks!
For example, T1 holds lock on A and waits for B, while T2 holds lock on B and waits for A. Both are in their growing phase, resulting in circular wait deadlock.`
      }
    ]
  },

  6: {
    title: 'CPU Scheduling Algorithms Comparison Cheat Sheet',
    course: 'CS302 - Operating Systems',
    module: 'Module 1: Process Management & CPU Scheduling',
    author: 'Prof. B (Assistant Professor, OS Lab)',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Standard Performance Metrics',
        content: `• Turnaround Time (TAT) = Completion Time - Arrival Time
• Waiting Time (WT) = Turnaround Time - Burst Time
• Response Time (RT) = First CPU Allocation Time - Arrival Time
• Throughput = Number of processes completed per unit time.`
      },
      {
        heading: '2. Comparative Algorithm Analysis',
        content: `1. First-Come, First-Served (FCFS):
   - Mode: Non-preemptive.
   - Pros: Simple FIFO queue implementation.
   - Cons: Convoy Effect (short jobs wait behind lengthy CPU-heavy jobs), high average WT.

2. Shortest Job First (SJF) / Shortest Remaining Time First (SRTF):
   - Mode: Non-preemptive (SJF) or Preemptive (SRTF).
   - Pros: Provably OPTIMAL for minimizing average waiting time.
   - Cons: Starvation of lengthy processes; requires knowing or estimating next CPU burst.

3. Round Robin (RR):
   - Mode: Preemptive with Time Quantum (q).
   - Pros: Excellent response time for time-sharing systems, fair CPU allocation, starvation-free.
   - Cons: If quantum is too small, context switching overhead dominates; if quantum is too large, degenerates into FCFS.`
      }
    ]
  },

  7: {
    title: 'Dining Philosophers & Classical Synchronization Notes',
    course: 'CS302 - Operating Systems',
    module: 'Module 2: Process Synchronization & Virtual Memory',
    author: 'Prof. B',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. The Dining Philosophers Problem',
        content: `5 philosophers sit around a circular table with 5 chopsticks. A philosopher needs both adjacent chopsticks (left and right) to eat.

Deadlock Condition:
If all 5 philosophers get hungry simultaneously and each pick up their left chopstick first, every philosopher holds 1 chopstick and indefinitely waits for their right chopstick.

Deadlock Prevention Solutions:
1. Allow at most 4 philosophers to sit at the table simultaneously (pigeonhole principle ensures at least one eats).
2. Asymmetric acquisition: Odd philosophers pick left chopstick first, then right; even philosophers pick right chopstick first, then left.
3. Monitor solution: A philosopher can only pick up chopsticks if BOTH are currently available (test and state array).`
      }
    ]
  },

  10: {
    title: 'Subnetting & VLSM Complete Practical Guide',
    course: 'CS303 - Computer Networks',
    module: 'Module 1: Data Link Layer & Network Layer Architecture',
    author: 'Prof. C (Professor, Network Systems)',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. CIDR Prefix Length to Subnet Mask Table',
        content: `Prefix | Subnet Mask       | Total IPs | Usable Hosts | Block Size
-------|-------------------|-----------|--------------|-----------
/24    | 255.255.255.0     | 256       | 254          | 256
/25    | 255.255.255.128   | 128       | 126          | 128
/26    | 255.255.255.192   | 64        | 62           | 64
/27    | 255.255.255.224   | 32        | 30           | 32
/28    | 255.255.255.240   | 16        | 14           | 16
/29    | 255.255.255.248   | 8         | 6            | 8
/30    | 255.255.255.252   | 4         | 2 (Point-Pt) | 4`
      },
      {
        heading: '2. Variable Length Subnet Masking (VLSM) Procedure',
        content: `Step 1: Sort subnet requirements in descending order of needed host counts.
Step 2: Allocate the smallest power of 2 that accommodates: (Hosts Needed + 2).
(+2 accounts for Network ID and Directed Broadcast Address).

Example: Given 192.168.10.0/24, allocate:
• Dept A (60 hosts) -> /26 (64 IPs: 192.168.10.0 - 192.168.10.63)
• Dept B (28 hosts) -> /27 (32 IPs: 192.168.10.64 - 192.168.10.95)
• Dept C (12 hosts) -> /28 (16 IPs: 192.168.10.96 - 192.168.10.111)
• Router Link (2 hosts) -> /30 (4 IPs: 192.168.10.112 - 192.168.10.115)`
      }
    ]
  },

  13: {
    title: 'Dijkstra and MST Graph Algorithms Reference Notes',
    course: 'CS304 - Data Structures & Algorithms',
    module: 'Module 1: Graph Theory & Shortest Path Algorithms',
    author: 'Prof. A (Associate Professor, CSE)',
    lastUpdated: 'January 2026',
    sections: [
      {
        heading: '1. Dijkstra Single-Source Shortest Path',
        content: `Dijkstra finds the shortest distance from source s to all vertices in a directed/undirected weighted graph with NON-NEGATIVE edge weights.

Time Complexity:
• With Adjacency Matrix: O(V^2)
• With Min-Heap / Priority Queue: O((V + E) log V)
• With Fibonacci Heap: O(E + V log V)

Critical Condition:
Dijkstra CANNOT handle negative weight edges. If negative weights exist, use Bellman-Ford algorithm (O(V * E)).`
      },
      {
        heading: '2. Minimum Spanning Tree (MST): Prim vs Kruskal',
        content: `• Prim Algorithm:
  Grows a single tree from an arbitrary root vertex, greedily adding the minimum crossing edge.
  Best for dense graphs (many edges).

• Kruskal Algorithm:
  Sorts all edges in non-decreasing order of weight, greedily picking edges that do not form a cycle using Disjoint Set Union (Union-Find with path compression).
  Complexity: O(E log E) = O(E log V).
  Best for sparse graphs.`
      }
    ]
  },

  15: {
    title: 'Java Multithreading & Concurrency Deep Dive',
    course: 'CS305 - Object Oriented Programming with Java',
    module: 'Module 2: Java Collections Framework & Concurrency',
    author: 'Prof. B',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Thread Lifecycle & Synchronization',
        content: `In the Java Virtual Machine (JVM), a thread transitions between states:
NEW -> RUNNABLE -> BLOCKED/WAITING -> TERMINATED.

Synchronized Methods vs Blocks:
Using 'synchronized' obtains the intrinsic monitor lock of the object:

public synchronized void withdraw(double amount) {
    if (balance >= amount) balance -= amount;
}

Prefer synchronized blocks over synchronized methods to reduce critical section contention.`
      },
      {
        heading: '2. Modern Concurrency: java.util.concurrent',
        content: `• ReentrantLock:
  Provides explicit lock() and unlock() with tryLock() timeout capabilities and fair ordering.

• ExecutorService:
  Decouples task submission from thread management:
  ExecutorService pool = Executors.newFixedThreadPool(4);
  pool.submit(() -> processTask());
  pool.shutdown();`
      }
    ]
  }
};
