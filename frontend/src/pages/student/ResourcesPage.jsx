import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  FileText,
  Video,
  FileCode,
  ExternalLink,
  BookOpen,
  Filter
} from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';
import { ResourceReaderModal } from '../../components/ResourceReaderModal';

export const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [rData, cData] = await Promise.all([
          api.getResources(),
          api.getCourses()
        ]);
        setResources(rData || []);
        setCourses(cData || []);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleToggleBookmark = async (id) => {
    await api.toggleBookmark(id);
    setResources((prev) =>
      prev.map((r) => (r.resource_id === id ? { ...r, is_bookmarked: !r.is_bookmarked } : r))
    );
  };

  const filtered = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || res.resource_type.toLowerCase() === selectedType.toLowerCase();
    const matchesCourse = selectedCourse === 'ALL' || res.course_id === parseInt(selectedCourse);
    const matchesBookmark = !showOnlyBookmarked || res.is_bookmarked;
    return matchesSearch && matchesType && matchesCourse && matchesBookmark;
  });

  const bookmarkedCount = resources.filter((r) => r.is_bookmarked).length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'PDF':
        return <FileText className="w-4 h-4 text-red-600" />;
      case 'Notes':
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'Previous Year Paper':
        return <FileCode className="w-4 h-4 text-amber-600" />;
      default:
        return <ExternalLink className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Academic Resources</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified course notes, lecture slides, question papers, and lab references
          </p>
        </div>
        <button
          onClick={() => setShowOnlyBookmarked((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${
            showOnlyBookmarked
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-amber-600 text-amber-600' : 'text-slate-500'}`} />
          <span>Bookmarked ({bookmarkedCount})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded border border-slate-200 flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, course code, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
          />
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium shrink-0">Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-slate-500"
          >
            <option value="ALL">All Enrolled</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_code}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium shrink-0">Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-slate-500"
          >
            <option value="ALL">All Types</option>
            <option value="Notes">Notes</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Previous Year Paper">Question Paper</option>
            <option value="Link">Web Link</option>
          </select>
        </div>
      </div>

      {/* Resource Table */}
      {filtered.length > 0 ? (
        <div className="bg-white border border-slate-200 rounded">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Course</th>
                <th>Module / Unit</th>
                <th>Type</th>
                <th>File Size</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.resource_id}>
                  <td>
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(item.resource_id)}
                        className="mt-0.5 text-slate-400 hover:text-amber-500"
                        title={item.is_bookmarked ? 'Remove bookmark' : 'Bookmark'}
                      >
                        {item.is_bookmarked ? (
                          <BookmarkCheck className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5 text-slate-300 hover:text-slate-500" />
                        )}
                      </button>
                      <div>
                        <div className="text-xs font-medium text-slate-900">{item.title}</div>
                        {item.description && (
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">
                      {item.course_code}
                    </span>
                  </td>
                  <td className="text-xs text-slate-600 whitespace-nowrap">
                    {item.module_number ? `Unit ${item.module_number}` : 'Core Material'}
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      {getTypeIcon(item.resource_type)}
                      <span>{item.resource_type}</span>
                    </span>
                  </td>
                  <td className="text-xs text-slate-500 font-mono">
                    {item.file_size_kb ? `${item.file_size_kb} KB` : '—'}
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedResource(item)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 whitespace-nowrap"
                    >
                      <span>Open Notes</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded border border-slate-200">
          <BookOpen className="w-7 h-7 text-slate-300 mx-auto mb-2" />
          <h3 className="text-xs font-semibold text-slate-700">No resources found</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">No materials matched your filter query</p>
        </div>
      )}

      {/* Resource Reader Modal */}
      <ResourceReaderModal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
    </div>
  );
};
