const { successResponse, errorResponse } = require('../utils/response');
const { resources, courses, modules, bookmarks } = require('../models/mockDb');

const getResources = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;
    const { course_id, module_id, type, search, bookmarked } = req.query;

    let filtered = resources.map(resItem => {
      const course = courses.find(c => c.course_id === resItem.course_id);
      const mod = modules.find(m => m.module_id === resItem.module_id);
      const isBookmarked = bookmarks.some(b => b.student_id === studentId && b.resource_id === resItem.resource_id);

      return {
        ...resItem,
        course_code: course?.course_code,
        course_name: course?.course_name,
        module_title: mod?.module_title,
        module_number: mod?.module_number,
        is_bookmarked: isBookmarked
      };
    });

    if (course_id) {
      filtered = filtered.filter(r => r.course_id === parseInt(course_id));
    }

    if (module_id) {
      filtered = filtered.filter(r => r.module_id === parseInt(module_id));
    }

    if (type && type !== 'ALL') {
      filtered = filtered.filter(r => r.resource_type.toLowerCase() === type.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.course_code?.toLowerCase().includes(q)
      );
    }

    if (bookmarked === 'true') {
      filtered = filtered.filter(r => r.is_bookmarked);
    }

    return successResponse(res, filtered, 'Resources fetched successfully');
  } catch (err) {
    next(err);
  }
};

const toggleBookmark = async (req, res, next) => {
  try {
    const resourceId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;

    const existingIndex = bookmarks.findIndex(b => b.student_id === studentId && b.resource_id === resourceId);

    let isBookmarked = false;
    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      isBookmarked = false;
    } else {
      bookmarks.push({
        bookmark_id: bookmarks.length + 1,
        student_id: studentId,
        resource_id: resourceId
      });
      isBookmarked = true;
    }

    return successResponse(res, { resource_id: resourceId, is_bookmarked: isBookmarked }, isBookmarked ? 'Resource bookmarked' : 'Bookmark removed');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getResources,
  toggleBookmark
};
