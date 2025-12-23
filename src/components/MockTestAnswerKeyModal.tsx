import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface MockTestAnswerKeyModalProps {
  examCode: string;
  existingListeningKey?: Record<number, string> | null;
  existingReadingKey?: Record<number, string> | null;
  onSubmit: (
    listeningKey: Record<number, string>,
    readingKey: Record<number, string>,
    onProgress: (current: number, total: number, studentName: string, section: string) => void
  ) => Promise<void>;
  onClose: () => void;
}

type ProgressState = {
  current: number;
  total: number;
  studentName: string;
  section: string;
  percentage: number;
} | null;

export function MockTestAnswerKeyModal({
  examCode,
  existingListeningKey,
  existingReadingKey,
  onSubmit,
  onClose
}: MockTestAnswerKeyModalProps) {
  const [listeningKey, setListeningKey] = useState<Record<number, string>>(existingListeningKey || {});
  const [readingKey, setReadingKey] = useState<Record<number, string>>(existingReadingKey || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState<ProgressState>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleListeningChange = (questionNumber: number, answer: string) => {
    setListeningKey(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  };

  const handleReadingChange = (questionNumber: number, answer: string) => {
    setReadingKey(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  };

  const handleSubmit = async () => {
    // Validate listening answers
    const missingListening = [];
    for (let i = 1; i <= 40; i++) {
      if (!listeningKey[i] || listeningKey[i].trim() === '') {
        missingListening.push(i);
      }
    }

    // Validate reading answers
    const missingReading = [];
    for (let i = 1; i <= 40; i++) {
      if (!readingKey[i] || readingKey[i].trim() === '') {
        missingReading.push(i);
      }
    }

    if (missingListening.length > 0 || missingReading.length > 0) {
      let message = 'Please provide answers for all questions.\n';
      if (missingListening.length > 0) {
        message += `\nListening missing: ${missingListening.join(', ')}`;
      }
      if (missingReading.length > 0) {
        message += `\nReading missing: ${missingReading.join(', ')}`;
      }
      alert(message);
      return;
    }

    setIsSubmitting(true);
    setShowForm(false);

    const handleProgress = (current: number, total: number, studentName: string, section: string) => {
      const percentage = Math.round((current / total) * 100);
      setProgress({ current, total, studentName, section, percentage });
    };

    try {
      await onSubmit(listeningKey, readingKey, handleProgress);
      setIsComplete(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      alert('Error during auto-marking: ' + error);
      setShowForm(true);
      setIsSubmitting(false);
      setProgress(null);
    }
  };

  const listeningCount = Object.keys(listeningKey).filter(k => listeningKey[parseInt(k)]?.trim()).length;
  const readingCount = Object.keys(readingKey).filter(k => readingKey[parseInt(k)]?.trim()).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Mock Test Auto-Marking</h2>
            <p className="text-sm opacity-90">Session: {examCode}</p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Overlay */}
        {isSubmitting && (
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-500/95 to-purple-600/95 flex flex-col items-center justify-center z-10 transition-opacity duration-500 ${
              showForm ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {!isComplete ? (
              <>
                <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Auto-Marking in Progress...</h3>
                {progress && (
                  <>
                    <p className="text-white text-lg mb-4">
                      Marking {progress.section}: {progress.studentName}
                    </p>
                    <div className="w-96 bg-white/30 rounded-full h-4 overflow-hidden mb-2">
                      <div
                        className="bg-white h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <p className="text-white text-sm">
                      {progress.current} / {progress.total} submissions ({progress.percentage}%)
                    </p>
                  </>
                )}
              </>
            ) : (
              <div className="text-center animate-scaleIn">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Auto-Marking Complete!</h3>
                <p className="text-white text-lg">All submissions have been marked successfully</p>
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
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
                <p className="font-semibold mb-1">Mock Test Auto-Marking Instructions:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Enter answer keys for BOTH Listening (40 questions) and Reading (40 questions)</li>
                  <li><strong>Multiple alternatives:</strong> Use <code className="bg-blue-100 px-1 rounded">/</code> to separate alternative answers (e.g., <code className="bg-blue-100 px-1 rounded">travelling/traveling</code>)</li>
                  <li>Both sections will be auto-marked simultaneously</li>
                  <li>Answers will be compared case-insensitively with student submissions</li>
                  <li>Answer keys will be saved for future use</li>
                  <li>Writing and Speaking sections must be marked manually</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Answer Keys - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {(existingListeningKey || existingReadingKey) && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Answer keys loaded from previous save. You can edit any answers before re-running auto-marking.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Listening Section */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎧</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Listening Section</h3>
                    <p className="text-sm text-gray-600">{listeningCount} / 40 answers provided</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map(questionNumber => (
                    <div key={questionNumber} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Q{questionNumber}
                      </label>
                      <input
                        type="text"
                        value={listeningKey[questionNumber] || ''}
                        onChange={(e) => handleListeningChange(questionNumber, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="Answer"
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading Section */}
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📖</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Reading Section</h3>
                    <p className="text-sm text-gray-600">{readingCount} / 40 answers provided</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map(questionNumber => (
                    <div key={questionNumber} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Q{questionNumber}
                      </label>
                      <input
                        type="text"
                        value={readingKey[questionNumber] || ''}
                        onChange={(e) => handleReadingChange(questionNumber, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                        placeholder="Answer"
                        disabled={isSubmitting}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="text-sm text-gray-600">
              Total: {listeningCount + readingCount} / 80 answers provided
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || listeningCount < 40 || readingCount < 40}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start Auto-Marking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


