const { successResponse, errorResponse } = require('../utils/response');
const { studyTasks, courses } = require('../models/mockDb');

const getTasks = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;

    const userTasks = studyTasks
      .filter(t => t.student_id === studentId)
      .map(t => {
        const course = courses.find(c => c.course_id === t.course_id);
        return {
          ...t,
          course_code: course?.course_code,
          course_name: course?.course_name
        };
      });

    const todayStr = new Date().toISOString().split('T')[0];

    const today = userTasks.filter(t => t.status !== 'COMPLETED' && t.due_date <= todayStr);
    const upcoming = userTasks.filter(t => t.status !== 'COMPLETED' && t.due_date > todayStr);
    const completed = userTasks.filter(t => t.status === 'COMPLETED');

    return successResponse(res, { all: userTasks, today, upcoming, completed }, 'Study tasks fetched successfully');
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;
    const { title, course_id, topic, priority = 'MEDIUM', due_date, estimated_duration_minutes = 45 } = req.body;

    if (!title || !due_date) {
      return errorResponse(res, 'Title and due date are required.', 400);
    }

    const newTask = {
      task_id: studyTasks.length + 1,
      student_id: studentId,
      course_id: course_id ? parseInt(course_id) : 1,
      title,
      topic: topic || 'General Study',
      priority: priority.toUpperCase(),
      due_date,
      estimated_duration_minutes: parseInt(estimated_duration_minutes),
      status: 'PENDING',
      created_at: new Date().toISOString(),
      completed_at: null
    };

    studyTasks.push(newTask);

    const course = courses.find(c => c.course_id === newTask.course_id);
    const enriched = {
      ...newTask,
      course_code: course?.course_code,
      course_name: course?.course_name
    };

    return successResponse(res, enriched, 'Study task created successfully', 201);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;
    const { status, title, topic, priority, due_date, estimated_duration_minutes } = req.body;

    const task = studyTasks.find(t => t.task_id === taskId && t.student_id === studentId);
    if (!task) {
      return errorResponse(res, 'Task not found.', 404);
    }

    if (status !== undefined) {
      task.status = status;
      if (status === 'COMPLETED') {
        task.completed_at = new Date().toISOString();
      } else {
        task.completed_at = null;
      }
    }
    if (title) task.title = title;
    if (topic) task.topic = topic;
    if (priority) task.priority = priority.toUpperCase();
    if (due_date) task.due_date = due_date;
    if (estimated_duration_minutes) task.estimated_duration_minutes = parseInt(estimated_duration_minutes);

    const course = courses.find(c => c.course_id === task.course_id);
    const enriched = {
      ...task,
      course_code: course?.course_code,
      course_name: course?.course_name
    };

    return successResponse(res, enriched, 'Task updated successfully');
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;

    const index = studyTasks.findIndex(t => t.task_id === taskId && t.student_id === studentId);
    if (index === -1) {
      return errorResponse(res, 'Task not found.', 404);
    }

    studyTasks.splice(index, 1);
    return successResponse(res, { task_id: taskId }, 'Task deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
