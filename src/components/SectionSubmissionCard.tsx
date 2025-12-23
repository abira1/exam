import React, { useState, useEffect } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { convertListeningToBand, convertReadingToBand } from '../utils/bandScoreConversion';
import { SectionSubmission } from '../utils/storage';

interface SectionSubmissionCardProps {
  section: 'listening' | 'reading' | 'writing';
  sectionData: SectionSubmission;
  onMarkQuestion: (questionNumber: number | string, mark: 'correct' | 'incorrect' | null) => void;
  onSaveBandScore: (bandScore: number) => void;
  currentBandScore?: number;
  isReadOnly?: boolean;
  onTaskClick?: (taskKey: string, taskNumber: 1 | 2) => void; // For writing tasks
  taskBandScores?: Record<string, number>; // Individual task scores for writing
}

export function SectionSubmissionCard({
  section,
  sectionData,
  onMarkQuestion,
  onSaveBandScore,
  currentBandScore,
  isReadOnly,
  onTaskClick,
  taskBandScores
}: SectionSubmissionCardProps) {
  const [localMarks, setLocalMarks] = useState(sectionData.marks || {});
  const [manualBandScore, setManualBandScore] = useState<string>(
    currentBandScore?.toString() || ''
  );

  // CRITICAL FIX: Update localMarks when section or sectionData changes
  // This ensures that when switching between listening/reading tabs,
  // the marks are properly reset to the correct section's data
  useEffect(() => {
    setLocalMarks(sectionData.marks || {});
  }, [section, sectionData]);

  // Update manual band score when it changes
  useEffect(() => {
    setManualBandScore(currentBandScore?.toString() || '');
  }, [currentBandScore]);

  // Get section icon and color
  const getSectionStyle = () => {
    switch (section) {
      case 'listening':
        return { icon: '🎧', color: 'blue', label: 'Listening' };
      case 'reading':
        return { icon: '📖', color: 'green', label: 'Reading' };
      case 'writing':
        return { icon: '✍️', color: 'orange', label: 'Writing' };
    }
  };

  const style = getSectionStyle();

  // Calculate correct answers
  const correctCount = Object.values(localMarks).filter(m => m === 'correct').length;
  const totalQuestions = section === 'writing' ? 2 : 40;

  // Auto-calculate band score for L & R
  const autoCalculatedBand = section === 'listening' 
    ? convertListeningToBand(correctCount)
    : section === 'reading'
    ? convertReadingToBand(correctCount)
    : null;

  // Helper function to round band score to nearest 0.5 (valid IELTS band score)
  const roundToNearestHalf = (score: number): number => {
    return Math.round(score * 2) / 2;
  };

  // Display band score
  // For writing, calculate average of task scores if both are available
  const displayBandScore = section === 'writing'
    ? (() => {
        if (taskBandScores) {
          const scores = Object.values(taskBandScores).filter(s => s !== undefined && s !== null);
          if (scores.length === 2) {
            // Both tasks scored - return rounded average (must end in .0 or .5)
            const rawAverage = (scores[0] + scores[1]) / 2;
            return roundToNearestHalf(rawAverage);
          } else if (scores.length > 0) {
            // Partial scoring - show what we have
            return scores[0];
          }
        }
        return parseFloat(manualBandScore) || null;
      })()
    : autoCalculatedBand;

  const handleMarkChange = (questionNumber: number | string, mark: 'correct' | 'incorrect' | null) => {
    if (isReadOnly) return;
    
    const newMarks = { ...localMarks, [questionNumber]: mark };
    setLocalMarks(newMarks);
    onMarkQuestion(questionNumber, mark);
  };

  const handleSaveBand = () => {
    if (section === 'writing') {
      const band = parseFloat(manualBandScore);
      if (!isNaN(band) && band >= 0 && band <= 9) {
        onSaveBandScore(band);
      }
    } else if (autoCalculatedBand !== null) {
      onSaveBandScore(autoCalculatedBand);
    }
  };

  // Get all questions/tasks
  const questions = section === 'writing'
    ? Object.keys(sectionData.answers).filter(key => key.includes('task'))
    : Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg overflow-hidden">
      {/* Section Header */}
      <div className={`bg-${style.color}-500 text-white p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{style.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{style.label} Section</h2>
              <p className="text-sm opacity-90">{sectionData.trackName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Band Score</div>
            <div className="text-5xl font-bold">
              {displayBandScore !== null ? displayBandScore.toFixed(1) : '--'}
            </div>
          </div>
        </div>
      </div>

      {/* Marking Stats */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-600">Total {section === 'writing' ? 'Tasks' : 'Questions'}</div>
            <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Correct</div>
            <div className="text-2xl font-bold text-green-600">{correctCount}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Submitted</div>
            <div className="text-sm text-gray-900">
              {new Date(sectionData.submittedAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Time Spent</div>
            <div className="text-sm text-gray-900">{sectionData.timeSpent}</div>
          </div>
        </div>
      </div>

      {/* Questions/Tasks */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {questions.map((q) => {
            const answer = sectionData.answers[q];
            const mark = localMarks[q];

            // For writing tasks, render as clickable buttons
            if (section === 'writing') {
              const taskNumber = q.toString().includes('task1') ? 1 : 2;
              const taskScore = taskBandScores?.[q];
              const wordCount = answer ? answer.trim().split(/\s+/).filter(word => word.length > 0).length : 0;

              return (
                <button
                  key={q}
                  onClick={() => onTaskClick?.(q.toString(), taskNumber as 1 | 2)}
                  disabled={isReadOnly}
                  className="w-full border-2 border-orange-200 rounded-lg p-4 hover:bg-orange-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-orange-600">Task {taskNumber}</span>
                        {taskScore !== undefined && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                            Band: {taskScore.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Word Count: <span className={`font-semibold ${wordCount < (taskNumber === 1 ? 150 : 250) ? 'text-red-600' : 'text-green-600'}`}>
                          {wordCount}
                        </span> / {taskNumber === 1 ? '150' : '250'} min
                      </div>
                      <div className="text-gray-900 bg-gray-50 p-2 rounded max-h-20 overflow-hidden">
                        {answer ? (
                          <p className="line-clamp-2">{answer}</p>
                        ) : (
                          <span className="text-gray-400 italic">Not answered</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 text-orange-600 font-medium">
                      {taskScore !== undefined ? 'Edit →' : 'Mark →'}
                    </div>
                  </div>
                </button>
              );
            }

            // For listening/reading questions, render as before
            return (
              <div key={q} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Question {q}
                    </div>
                    <div className="text-gray-900 bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                      {answer || <span className="text-gray-400 italic">Not answered</span>}
                    </div>
                  </div>

                  {!isReadOnly && (
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleMarkChange(q, mark === 'correct' ? null : 'correct')}
                        className={`p-2 rounded-lg transition-colors ${
                          mark === 'correct'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                        }`}
                        data-testid={`mark-correct-${q}`}
                      >
                        <CheckIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleMarkChange(q, mark === 'incorrect' ? null : 'incorrect')}
                        className={`p-2 rounded-lg transition-colors ${
                          mark === 'incorrect'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                        }`}
                        data-testid={`mark-incorrect-${q}`}
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Band Score Input (for Writing) or Auto-calculated Display */}
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        {section === 'writing' ? (
          <div>
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-3">Individual Task Scores</div>
              <div className="grid grid-cols-2 gap-4">
                {questions.map((taskKey) => {
                  const taskNumber = taskKey.toString().includes('task1') ? 1 : 2;
                  const taskScore = taskBandScores?.[taskKey];
                  return (
                    <div key={taskKey} className="bg-white rounded-lg border border-orange-200 p-3">
                      <div className="text-xs text-gray-600 mb-1">Task {taskNumber}</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {taskScore !== undefined ? taskScore.toFixed(1) : '--'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Overall Writing Band Score (Average)
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {displayBandScore !== null ? displayBandScore.toFixed(1) : '--'}
              </div>
              <p className="text-xs text-gray-500">
                {taskBandScores && Object.keys(taskBandScores).length === 2
                  ? 'Calculated as average of Task 1 and Task 2 scores'
                  : 'Mark both tasks to calculate overall score'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Auto-calculated Band Score</div>
              <div className="text-3xl font-bold text-blue-600">
                {autoCalculatedBand !== null ? autoCalculatedBand.toFixed(1) : '--'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Based on {correctCount} correct answers out of 40
              </div>
            </div>
            <button
              onClick={handleSaveBand}
              disabled={isReadOnly || autoCalculatedBand === null}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="save-band-button"
            >
              Save Band Score
            </button>
          </div>
        )}
      </div>
    </div>
  );
}