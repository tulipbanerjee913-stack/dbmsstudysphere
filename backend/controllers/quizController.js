const { successResponse, errorResponse } = require('../utils/response');
const { quizzes, questions, quizOptions, quizAttempts, studentAnswers, courses, modules } = require('../models/mockDb');

const getQuizzes = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;
    const { course_id } = req.query;

    const enrichedQuizzes = quizzes.map(q => {
      const course = courses.find(c => c.course_id === q.course_id);
      const mod = modules.find(m => m.module_id === q.module_id);
      const attempt = quizAttempts.find(qa => qa.quiz_id === q.quiz_id && qa.student_id === studentId);
      const qQuestions = questions.filter(quest => quest.quiz_id === q.quiz_id);

      let status = 'AVAILABLE';
      if (attempt && attempt.status === 'COMPLETED') {
        status = 'COMPLETED';
      } else if (new Date(q.due_date) < new Date()) {
        status = 'EXPIRED';
      }

      return {
        ...q,
        course_code: course?.course_code,
        course_name: course?.course_name,
        module_title: mod?.module_title,
        question_count: qQuestions.length,
        status,
        latest_attempt: attempt || null
      };
    });

    let results = enrichedQuizzes;
    if (course_id) {
      results = results.filter(q => q.course_id === parseInt(course_id));
    }

    return successResponse(res, results, 'Quizzes fetched successfully');
  } catch (err) {
    next(err);
  }
};

const getQuizById = async (req, res, next) => {
  try {
    const quizId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;

    const quiz = quizzes.find(q => q.quiz_id === quizId);
    if (!quiz) {
      return errorResponse(res, 'Quiz not found.', 404);
    }

    const course = courses.find(c => c.course_id === quiz.course_id);
    const mod = modules.find(m => m.module_id === quiz.module_id);
    const attempt = quizAttempts.find(qa => qa.quiz_id === quizId && qa.student_id === studentId);

    // Fetch questions and options
    const quizQuestions = questions
      .filter(quest => quest.quiz_id === quizId)
      .map(quest => {
        const options = quizOptions
          .filter(opt => opt.question_id === quest.question_id)
          .map(opt => ({
            option_id: opt.option_id,
            question_id: opt.question_id,
            option_label: opt.option_label,
            option_text: opt.option_text
            // Hide is_correct unless quiz is already completed
          }));

        return {
          question_id: quest.question_id,
          question_number: quest.question_number,
          question_text: quest.question_text,
          marks: quest.marks,
          options
        };
      });

    const detailed = {
      ...quiz,
      course_code: course?.course_code,
      course_name: course?.course_name,
      module_title: mod?.module_title,
      questions: quizQuestions,
      latest_attempt: attempt || null
    };

    return successResponse(res, detailed, 'Quiz details fetched successfully');
  } catch (err) {
    next(err);
  }
};

const submitQuizAttempt = async (req, res, next) => {
  try {
    const quizId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;
    const { answers = [], time_taken_seconds = 450 } = req.body; // array of { question_id, selected_option_id }

    const quiz = quizzes.find(q => q.quiz_id === quizId);
    if (!quiz) {
      return errorResponse(res, 'Quiz not found.', 404);
    }

    const quizQuestions = questions.filter(quest => quest.quiz_id === quizId);
    let correctCount = 0;
    let incorrectCount = 0;
    let scoreObtained = 0.0;

    const evaluatedAnswers = answers.map(ans => {
      const correctOption = quizOptions.find(opt => opt.question_id === ans.question_id && opt.is_correct);
      const isCorrect = correctOption ? correctOption.option_id === ans.selected_option_id : false;
      const question = quizQuestions.find(q => q.question_id === ans.question_id);

      if (isCorrect) {
        correctCount += 1;
        scoreObtained += (question?.marks || 1.0);
      } else {
        incorrectCount += 1;
      }

      return {
        question_id: ans.question_id,
        selected_option_id: ans.selected_option_id,
        is_correct: isCorrect,
        correct_option_id: correctOption?.option_id,
        explanation: question?.explanation
      };
    });

    const attemptId = quizAttempts.length + 1;
    const newAttempt = {
      attempt_id: attemptId,
      quiz_id: quizId,
      student_id: studentId,
      started_at: new Date(Date.now() - (time_taken_seconds * 1000)).toISOString(),
      completed_at: new Date().toISOString(),
      score_obtained: scoreObtained,
      total_questions: quizQuestions.length,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      status: 'COMPLETED'
    };

    quizAttempts.push(newAttempt);

    evaluatedAnswers.forEach(ea => {
      studentAnswers.push({
        answer_id: studentAnswers.length + 1,
        attempt_id: attemptId,
        question_id: ea.question_id,
        selected_option_id: ea.selected_option_id,
        is_correct: ea.is_correct
      });
    });

    const result = {
      attempt_id: attemptId,
      quiz_id: quizId,
      score_obtained: scoreObtained,
      total_marks: quiz.total_marks,
      percentage: Math.round((scoreObtained / (quizQuestions.length || 1)) * 100),
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      total_questions: quizQuestions.length,
      time_taken_seconds,
      evaluated_answers: evaluatedAnswers
    };

    return successResponse(res, result, 'Quiz evaluated successfully', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  submitQuizAttempt
};
