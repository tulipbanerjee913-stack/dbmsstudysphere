import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
        setCourses(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || course.department_code === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Registered Courses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            B.Tech Computer Science & Engineering · Semester VI curriculum
          </p>
        </div>
        <div className="text-xs text-slate-600 bg-white border border-slate-300 px-2.5 py-1 rounded font-mono">
          {filteredCourses.length} Courses Enrolled
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded p-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by code, title, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-400 focus:bg-white text-slate-800"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-xs text-slate-500 font-medium shrink-0">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-700 focus:outline-none focus:border-slate-500 cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="IT">Information Tech (IT)</option>
          </select>
        </div>
      </div>

      {/* Academic Courses Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <table className="academic-table">
          <thead>
            <tr>
              <th className="w-24">Code</th>
              <th>Course Title</th>
              <th className="w-24">Credits</th>
              <th>Faculty Instructor</th>
              <th className="w-36">Syllabus Progress</th>
              <th className="w-24">Status</th>
              <th className="w-28 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-500">
                  No courses matching current criteria.
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course.course_id} className="hover:bg-slate-50/80">
                  <td className="font-mono font-semibold text-slate-800">
                    <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px]">
                      {course.course_code}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/courses/${course.course_id}`}
                      className="font-semibold text-slate-900 hover:underline block"
                    >
                      {course.course_name}
                    </Link>
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {course.description}
                    </span>
                  </td>
                  <td className="text-slate-600 font-mono text-xs">
                    {course.credits} Cr
                  </td>
                  <td className="text-slate-700 font-medium">
                    {course.faculty_name}
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {course.faculty_designation || 'Faculty'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                      <span>{course.progress_percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden">
                      <div
                        className="bg-slate-700 h-1.5 rounded-xs"
                        style={{ width: `${course.progress_percentage || 0}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    <Badge variant="success">ENROLLED</Badge>
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/courses/${course.course_id}`}
                      className="inline-flex items-center text-xs font-semibold text-slate-800 hover:text-slate-950 px-2 py-1 rounded border border-slate-300 hover:bg-slate-100 transition-colors"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
