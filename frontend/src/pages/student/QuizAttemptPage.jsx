import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';
import { quizQuestionsMap } from '../../data/mockData';

export const QuizAttemptPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [question_id]: option_id }
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await api.getQuizById(id);
        setQuiz(data);
        if (data?.duration_minutes) {
          setTimeLeft(data.duration_minutes * 60);
        }
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (submitted || !quiz) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, quiz]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (questionId, optionId) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    const answersPayload = Object.entries(selectedAnswers).map(([qId, optId]) => ({
      question_id: parseInt(qId),
      selected_option_id: optId
    }));

    const timeTaken = quiz.duration_minutes * 60 - timeLeft;
    const res = await api.submitQuizAttempt(id, {
      answers: answersPayload,
      time_taken_seconds: timeTaken > 0 ? timeTaken : 300
    });
    setResults(res);
    setSubmitted(true);
  };

  if (loading) return <div className="p-8 text-center text-xs text-slate-500">Loading quiz...</div>;
  if (!quiz) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-base font-bold text-slate-800">Quiz Not Found</h2>
        <Link to="/quizzes" className="text-xs text-indigo-600 mt-2 inline-block">
          ← Return to Quizzes
        </Link>
      </div>
    );
  }

  const questions = (quiz.questions && quiz.questions.length > 0)
    ? quiz.questions
    : (quizQuestionsMap[id] || []);
  const currentQ = questions[currentIdx];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Quizzes</span>
        </Link>

        {!submitted && (
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1 rounded text-xs font-mono font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Time: {formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded border border-slate-200 p-5 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] px-1.5 py-0.2 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                {quiz.course_code}
              </span>
              <h1 className="text-base font-bold text-slate-900">{quiz.title}</h1>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {questions.length} Questions
          </span>
        </div>

        {/* Results Screen if submitted */}
        {submitted && results ? (
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded border border-slate-200">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Assessment Evaluated</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Results recorded in database.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="bg-white p-2.5 rounded border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
                  <span className="text-lg font-bold font-mono text-slate-900">
                    {results.score_obtained} / {results.total_marks}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Percentage</span>
                  <span className="text-lg font-bold font-mono text-slate-900">
                    {results.percentage}%
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Correct</span>
                  <span className="text-lg font-bold font-mono text-emerald-700">
                    {results.correct_count}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Incorrect</span>
                  <span className="text-lg font-bold font-mono text-rose-600">
                    {results.incorrect_count}
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Explanations */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Question Review:
              </h3>
              {results.evaluated_answers?.map((evalAns, i) => {
                const q = questions.find((item) => item.question_id === evalAns.question_id);
                return (
                  <div
                    key={evalAns.question_id}
                    className={`p-3 rounded border text-xs ${
                      evalAns.is_correct
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-slate-900">
                        Q{i + 1}. {q?.question_text}
                      </span>
                      {evalAns.is_correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </div>
                    {evalAns.explanation && (
                      <div className="mt-2 text-slate-600 pt-1.5 border-t border-slate-200/60 text-[11px]">
                        <strong>Explanation:</strong> {evalAns.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setResults(null);
                  setSelectedAnswers({});
                  setTimeLeft(quiz.duration_minutes * 60);
                  setCurrentIdx(0);
                }}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <Link
                to="/quizzes"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded transition-colors"
              >
                Return to Quizzes
              </Link>
            </div>
          </div>
        ) : (
          /* Active Quiz Taking Interface */
          <div>
            {/* Question Navigator Numbers */}
            <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = selectedAnswers[q.question_id] !== undefined;
                return (
                  <button
                    key={q.question_id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-7 h-7 rounded text-xs font-mono font-semibold transition-colors shrink-0 ${
                      isCurrent
                        ? 'bg-slate-800 text-white'
                        : isAnswered
                        ? 'bg-slate-200 text-slate-800'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Current Question Statement */}
            {currentQ && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Question {currentIdx + 1} of {questions.length} • {currentQ.marks} Point
                  </span>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {currentQ.question_text}
                  </h2>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2">
                  {currentQ.options?.map((opt) => {
                    const isSelected = selectedAnswers[currentQ.question_id] === opt.option_id;
                    return (
                      <button
                        key={opt.option_id}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.question_id, opt.option_id)}
                        className={`w-full p-3 rounded border text-left transition-colors flex items-center justify-between text-xs ${
                          isSelected
                            ? 'bg-slate-50 border-slate-800 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-5 h-5 rounded font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.option_label}
                          </span>
                          <span>{opt.option_text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 text-xs font-medium rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {currentIdx < questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                        className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1"
                      >
                        <span>Submit Assessment</span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
