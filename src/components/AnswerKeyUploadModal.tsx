import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface AnswerKeyUploadModalProps {
  examCode: string;
  trackType: 'listening' | 'reading';
  totalQuestions: number;
  existingAnswerKey?: Record<number, string> | null;
  onSubmit: (answerKey: Record<number, string>, onProgress: (current: number, total: number, studentName: string) => void) => Promise<void>;
  onClose: () => void;
}

type ProgressState = {
  current: number;
  total: number;
  studentName: string;
  percentage: number;
} | null;

export function AnswerKeyUploadModal({
  examCode,
  trackType,
  totalQuestions,
  existingAnswerKey,
  onSubmit,
  onClose
}: AnswerKeyUploadModalProps) {
  // Initialize with existing answer key if available
  const [answerKey, setAnswerKey] = useState<Record<number, string>>(existingAnswerKey || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setAnswerKey(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  };

  const handleSubmit = async () => {
    // Validate that all questions have answers
    const missingAnswers = [];
    for (let i = 1; i <= totalQuestions; i++) {
      if (!answerKey[i] || answerKey[i].trim() === '') {
        missingAnswers.push(i);
      }
    }

    if (missingAnswers.length > 0) {
      alert(`Please provide answers for all questions. Missing: ${missingAnswers.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    setShowForm(false); // Fade out the form

    // Progress callback
    const handleProgress = (current: number, total: number, studentName: string) => {
      const percentage = Math.round((current / total) * 100);
      setProgress({ current, total, studentName, percentage });
    };

    try {
      await onSubmit(answerKey, handleProgress);

      // Show completion state
      setIsComplete(true);

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      alert('Error during auto-marking: ' + error);
      setShowForm(true); // Show form again on error
      setIsSubmitting(false);
      setProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden relative">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Answer Key & Auto-Mark</h2>
            <p className="text-sm text-gray-600 mt-1">
              Session: {examCode} | Track: {trackType.charAt(0).toUpperCase() + trackType.slice(1)} | Questions: {totalQuestions}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content - with fade effect and flex layout */}
        <div
          className={`flex flex-col flex-1 overflow-hidden transition-opacity duration-500 ${
            showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Instructions - Fixed */}
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex-shrink-0">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Instructions:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Enter or review the correct answer for each question below</li>
                  <li><strong>Multiple alternatives:</strong> Use <code className="bg-blue-100 px-1 rounded">/</code> to separate alternative answers (e.g., <code className="bg-blue-100 px-1 rounded">colour/color</code>)</li>
                  <li>Edit any answers if needed before running auto-marking</li>
                  <li>Answers will be compared case-insensitively with student submissions</li>
                  <li>All submissions in this session will be automatically marked</li>
                  <li>The answer key will be saved for future use</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Answer Key Input - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {existingAnswerKey && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Answer key loaded from previous save. You can edit any answers before re-running auto-marking.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(questionNumber => (
                <div key={questionNumber} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Q{questionNumber}
                  </label>
                  <input
                    type="text"
                    value={answerKey[questionNumber] || ''}
                    onChange={(e) => handleAnswerChange(questionNumber, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Answer"
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="text-sm text-gray-600">
              {Object.keys(answerKey).filter(k => answerKey[parseInt(k)]?.trim()).length} / {totalQuestions} answers provided
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answerKey).filter(k => answerKey[parseInt(k)]?.trim()).length < totalQuestions}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Start Auto-Marking
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Overlay */}
        {progress && !isComplete && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center animate-fadeIn">
            <div className="max-w-md w-full px-8">
              {/* Animated Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-full animate-ping opacity-20" />
                </div>
              </div>

              {/* Progress Text */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Auto-Marking in Progress</h3>
                <p className="text-gray-600 mb-1">
                  Marking submission {progress.current} of {progress.total}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {progress.studentName}
                </p>
              </div>

              {/* Animated Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span className="font-semibold text-blue-600">{progress.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${progress.percentage}%` }}
                  >
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="text-center text-sm text-gray-500">
                <p>Please wait while we mark all submissions...</p>
              </div>
            </div>
          </div>
        )}

        {/* Completion Overlay */}
        {isComplete && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center animate-fadeIn">
            <div className="text-center px-8">
              {/* Success Animation */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-scaleIn">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  {/* Confetti-like sparkles */}
                  <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                  <Sparkles className="w-5 h-5 text-green-400 absolute -bottom-1 -left-2 animate-bounce delay-100" />
                  <Sparkles className="w-4 h-4 text-blue-400 absolute top-0 -left-3 animate-bounce delay-200" />
                </div>
              </div>

              {/* Success Message */}
              <h3 className="text-3xl font-bold text-gray-900 mb-3 animate-slideUp">
                Auto-Marking Complete! 🎉
              </h3>
              <p className="text-lg text-gray-600 mb-2 animate-slideUp delay-100">
                Successfully marked {progress?.total || 0} submissions
              </p>
              <p className="text-sm text-green-600 font-medium animate-slideUp delay-200">
                All results have been saved and are ready for review
              </p>

              {/* Auto-close indicator */}
              <div className="mt-6 text-xs text-gray-500 animate-fadeIn delay-300">
                Closing automatically...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

