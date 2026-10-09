import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Plus,
  Clock,
  CheckCircle,
  Circle,
  Trash2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';

export const StudyPlannerPage = () => {
  const [tasks, setTasks] = useState({ today: [], upcoming: [], completed: [] });
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course_id: 1,
    topic: '',
    priority: 'MEDIUM',
    due_date: new Date().toISOString().split('T')[0],
    estimated_duration_minutes: 45
  });

  const loadTasks = async () => {
    const [tData, cData] = await Promise.all([api.getTasks(), api.getCourses()]);
    setTasks(tData || { today: [], upcoming: [], completed: [] });
    setCourses(cData || []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleTask = async (task) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await api.updateTask(task.task_id, { status: newStatus });
    loadTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await api.deleteTask(taskId);
    loadTasks();
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await api.createTask(formData);
    setIsModalOpen(false);
    setFormData({
      title: '',
      course_id: 1,
      topic: '',
      priority: 'MEDIUM',
      due_date: new Date().toISOString().split('T')[0],
      estimated_duration_minutes: 45
    });
    loadTasks();
  };

  const renderTaskList = (taskList, emptyLabel) => {
    if (!taskList || taskList.length === 0) {
      return (
        <div className="p-4 text-center text-xs text-slate-400 bg-white rounded border border-slate-200">
          {emptyLabel}
        </div>
      );
    }

    return (
      <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
        {taskList.map((task) => {
          const isDone = task.status === 'COMPLETED';
          return (
            <div
              key={task.task_id}
              className={`p-3 transition-colors flex items-center justify-between gap-3 ${
                isDone ? 'bg-slate-50/60 opacity-75' : 'hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggleTask(task)}
                  className="text-slate-400 hover:text-slate-700 transition-colors shrink-0"
                  title={isDone ? 'Mark as pending' : 'Mark as completed'}
                >
                  {isDone ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium truncate ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 bg-slate-100 border border-slate-300 rounded text-slate-700 shrink-0">
                      {task.course_code}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    {task.topic && <span>{task.topic}</span>}
                    {task.topic && <span>•</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{task.estimated_duration_minutes}m</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{task.due_date}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={task.priority === 'HIGH' ? 'danger' : task.priority === 'MEDIUM' ? 'warning' : 'default'}>
                  {task.priority}
                </Badge>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(task.task_id)}
                  className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Study Planner</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Personal academic task checklist and revision timeline
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Study Task</span>
        </button>
      </div>

      {/* 3 Categories: Today, Upcoming, Completed */}
      <div className="space-y-6">
        {/* Today */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Today's Targets
            </h2>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-300">
              {tasks.today?.length || 0}
            </span>
          </div>
          {renderTaskList(tasks.today, 'No targets scheduled for today.')}
        </div>

        {/* Upcoming */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Upcoming Schedule
            </h2>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-300">
              {tasks.upcoming?.length || 0}
            </span>
          </div>
          {renderTaskList(tasks.upcoming, 'No upcoming study tasks scheduled.')}
        </div>

        {/* Completed */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Completed Tasks
            </h2>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {tasks.completed?.length || 0}
            </span>
          </div>
          {renderTaskList(tasks.completed, 'No tasks completed yet.')}
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Study Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Solve 3NF Normalization Decomposition Problems"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Course</label>
              <select
                value={formData.course_id}
                onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              >
                {courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>
                    {c.course_code} - {c.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Topic</label>
              <input
                type="text"
                placeholder="e.g. Relational Calculus"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Due Date</label>
              <input
                type="date"
                required
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Duration (mins)</label>
              <input
                type="number"
                min="10"
                step="5"
                value={formData.estimated_duration_minutes}
                onChange={(e) => setFormData({ ...formData, estimated_duration_minutes: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            Create Task
          </button>
        </form>
      </Modal>
    </div>
  );
};
