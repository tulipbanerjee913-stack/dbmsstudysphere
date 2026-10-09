/**
 * StudySphere API Client
 * Connects to Node/Express backend with transparent local mock resilience.
 */
import {
  currentUser,
  demoFacultyUser,
  demoAdminUser,
  initialCourses,
  initialModules,
  initialResources,
  initialAssignments,
  initialQuizzes,
  quizQuestionsMap,
  initialTasks
} from '../data/mockData';

const BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('studysphere_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Authentication
  async login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend offline, using mock authentication:', e.message);
    }

    // Mock fallback
    if (email.toLowerCase().includes('admin')) {
      return { token: 'mock-admin-token', user: demoAdminUser };
    }
    if (email.toLowerCase().includes('faculty')) {
      return { token: 'mock-faculty-token', user: demoFacultyUser };
    }
    return { token: 'mock-student-token', user: currentUser };
  },

  async register(formData) {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend offline, mock registration fallback:', e.message);
    }
    return {
      token: 'mock-registered-token',
      user: {
        ...currentUser,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email
      }
    };
  },

  // Courses
  async getCourses() {
    try {
      const res = await fetch(`${BASE_URL}/courses`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    return initialCourses;
  },

  async getCourseById(id) {
    try {
      const res = await fetch(`${BASE_URL}/courses/${id}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const c = initialCourses.find(course => course.course_id === parseInt(id));
    if (!c) return null;
    const cModules = initialModules.filter(m => m.course_id === parseInt(id)).map(m => ({
      ...m,
      resources: initialResources.filter(r => r.module_id === m.module_id),
      assignments: initialAssignments.filter(a => a.module_id === m.module_id),
      quizzes: initialQuizzes.filter(q => q.module_id === m.module_id)
    }));
    return {
      ...c,
      modules: cModules,
      all_resources: initialResources.filter(r => r.course_id === parseInt(id)),
      all_assignments: initialAssignments.filter(a => a.course_id === parseInt(id)),
      all_quizzes: initialQuizzes.filter(q => q.course_id === parseInt(id))
    };
  },

  // Resources
  async getResources(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/resources?${query}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    let list = [...initialResources];
    if (params.type && params.type !== 'ALL') {
      list = list.filter(r => r.resource_type.toLowerCase() === params.type.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(q) || r.course_code.toLowerCase().includes(q));
    }
    if (params.bookmarked === 'true') {
      list = list.filter(r => r.is_bookmarked);
    }
    return list;
  },

  async toggleBookmark(resourceId) {
    try {
      const res = await fetch(`${BASE_URL}/resources/${resourceId}/bookmark`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const r = initialResources.find(res => res.resource_id === parseInt(resourceId));
    if (r) {
      r.is_bookmarked = !r.is_bookmarked;
      return { resource_id: r.resource_id, is_bookmarked: r.is_bookmarked };
    }
    return null;
  },

  // Assignments
  async getAssignments(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/assignments?${query}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    let list = [...initialAssignments];
    if (params.status && params.status !== 'ALL') {
      list = list.filter(a => a.status.toUpperCase() === params.status.toUpperCase());
    }
    return list;
  },

  async getAssignmentById(id) {
    try {
      const res = await fetch(`${BASE_URL}/assignments/${id}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    return initialAssignments.find(a => a.assignment_id === parseInt(id)) || null;
  },

  async submitAssignment(id, data) {
    try {
      const res = await fetch(`${BASE_URL}/assignments/${id}/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const a = initialAssignments.find(assign => assign.assignment_id === parseInt(id));
    if (a) {
      a.status = 'SUBMITTED';
      a.submission = {
        submission_id: Date.now(),
        submitted_at: new Date().toISOString(),
        submission_text: data.submission_text || 'Submitted document',
        file_attachment_url: data.file_attachment_url || 'https://studysphere.edu/uploads/solution.pdf',
        status: 'SUBMITTED',
        marks_obtained: null,
        feedback: null
      };
      return a.submission;
    }
    return null;
  },

  // Quizzes
  async getQuizzes() {
    try {
      const res = await fetch(`${BASE_URL}/quizzes`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    return initialQuizzes;
  },

  async getQuizById(id) {
    try {
      const res = await fetch(`${BASE_URL}/quizzes/${id}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.questions && json.data.questions.length > 0) {
          return json.data;
        }
      }
    } catch (e) {
      // Fallback
    }
    const q = initialQuizzes.find(quiz => quiz.quiz_id === parseInt(id));
    if (!q) return null;
    const questions = quizQuestionsMap[id] || [];
    return {
      ...q,
      questions
    };
  },

  async submitQuizAttempt(id, { answers, time_taken_seconds }) {
    try {
      const res = await fetch(`${BASE_URL}/quizzes/${id}/attempt`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ answers, time_taken_seconds })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const questions = quizQuestionsMap[id] || [];
    let correct = 0;
    const evaluated = answers.map(ans => {
      const q = questions.find(item => item.question_id === ans.question_id);
      const correctOpt = q?.options.find(opt => opt.is_correct);
      const isRight = correctOpt?.option_id === ans.selected_option_id;
      if (isRight) correct += 1;
      return {
        question_id: ans.question_id,
        selected_option_id: ans.selected_option_id,
        is_correct: isRight,
        correct_option_id: correctOpt?.option_id,
        explanation: q?.explanation
      };
    });

    const targetQuiz = initialQuizzes.find(item => item.quiz_id === parseInt(id));
    if (targetQuiz) {
      targetQuiz.status = 'COMPLETED';
      targetQuiz.latest_attempt = {
        score_obtained: correct,
        total_questions: questions.length,
        percentage: Math.round((correct / questions.length) * 100)
      };
    }

    return {
      quiz_id: parseInt(id),
      score_obtained: correct,
      total_marks: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      correct_count: correct,
      incorrect_count: questions.length - correct,
      total_questions: questions.length,
      time_taken_seconds,
      evaluated_answers: evaluated
    };
  },

  // Study Planner
  async getTasks() {
    try {
      const res = await fetch(`${BASE_URL}/study-tasks`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const todayStr = new Date().toISOString().split('T')[0];
    return {
      all: initialTasks,
      today: initialTasks.filter(t => t.status !== 'COMPLETED' && t.due_date <= todayStr),
      upcoming: initialTasks.filter(t => t.status !== 'COMPLETED' && t.due_date > todayStr),
      completed: initialTasks.filter(t => t.status === 'COMPLETED')
    };
  },

  async createTask(taskData) {
    try {
      const res = await fetch(`${BASE_URL}/study-tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const c = initialCourses.find(course => course.course_id === parseInt(taskData.course_id));
    const newTask = {
      task_id: Date.now(),
      course_id: parseInt(taskData.course_id),
      course_code: c?.course_code || 'CS301',
      course_name: c?.course_name || 'Database Management Systems',
      title: taskData.title,
      topic: taskData.topic || 'Revision',
      priority: taskData.priority || 'MEDIUM',
      due_date: taskData.due_date,
      estimated_duration_minutes: parseInt(taskData.estimated_duration_minutes || 45),
      status: 'PENDING'
    };
    initialTasks.unshift(newTask);
    return newTask;
  },

  async updateTask(id, updateData) {
    try {
      const res = await fetch(`${BASE_URL}/study-tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const t = initialTasks.find(task => task.task_id === parseInt(id));
    if (t) {
      Object.assign(t, updateData);
      return t;
    }
    return null;
  },

  async deleteTask(id) {
    try {
      const res = await fetch(`${BASE_URL}/study-tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    const idx = initialTasks.findIndex(t => t.task_id === parseInt(id));
    if (idx !== -1) initialTasks.splice(idx, 1);
    return { task_id: id };
  },

  // Progress Analytics
  async getProgress() {
    try {
      const res = await fetch(`${BASE_URL}/progress`, { headers: getAuthHeaders() });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fallback
    }
    return {
      overall_progress: 78,
      enrolled_courses_count: 5,
      average_assignment_score: 91,
      average_quiz_score: 85,
      task_completion_rate: 67,
      course_breakdown: [
        { course_id: 1, course_code: 'CS301', course_name: 'Database Management Systems', credits: 4, progress: 85 },
        { course_id: 2, course_code: 'CS302', course_name: 'Operating Systems', credits: 4, progress: 78 },
        { course_id: 3, course_code: 'CS303', course_name: 'Computer Networks', credits: 3, progress: 72 },
        { course_id: 4, course_code: 'CS304', course_name: 'Data Structures & Algorithms', credits: 4, progress: 90 },
        { course_id: 5, course_code: 'CS305', course_name: 'Object Oriented Programming with Java', credits: 3, progress: 65 }
      ],
      academic_trend: [
        { week: 'Week 1', attendance: 95, assignments: 90, quiz: 80, progress: 20 },
        { week: 'Week 2', attendance: 92, assignments: 85, quiz: 85, progress: 35 },
        { week: 'Week 3', attendance: 96, assignments: 92, quiz: 88, progress: 50 },
        { week: 'Week 4', attendance: 90, assignments: 95, quiz: 90, progress: 65 },
        { week: 'Week 5', attendance: 94, assignments: 94, quiz: 92, progress: 75 },
        { week: 'Week 6', attendance: 98, assignments: 96, quiz: 95, progress: 78 }
      ],
      radar_skills: [
        { subject: 'DBMS', score: 85, fullMark: 100 },
        { subject: 'Operating Systems', score: 78, fullMark: 100 },
        { subject: 'Computer Networks', score: 72, fullMark: 100 },
        { subject: 'Data Structures', score: 90, fullMark: 100 },
        { subject: 'OOP Java', score: 65, fullMark: 100 }
      ],
      summary_counts: {
        total_courses: 5,
        pending_assignments: 3,
        upcoming_quizzes: 2,
        completed_tasks: 2,
        total_tasks: 10
      }
    };
  }
};
