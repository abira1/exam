import React, { useState } from 'react';
import { X } from 'lucide-react';

interface WritingTaskMarkingModalProps {
  taskNumber: 1 | 2;
  taskAnswer: string;
  taskKey: string;
  currentBandScore?: number;
  onSaveBandScore: (taskKey: string, bandScore: number) => void;
  onClose: () => void;
  isReadOnly?: boolean;
}

export function WritingTaskMarkingModal({
  taskNumber,
  taskAnswer,
  taskKey,
  currentBandScore,
  onSaveBandScore,
  onClose,
  isReadOnly
}: WritingTaskMarkingModalProps) {
  const [bandScore, setBandScore] = useState<string>(currentBandScore?.toString() || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const score = parseFloat(bandScore);
    if (isNaN(score) || score < 0 || score > 9) {
      alert('Please enter a valid band score between 0 and 9');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveBandScore(taskKey, score);
      onClose();
    } catch (error) {
      console.error('Error saving band score:', error);
      alert('Error saving band score');
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate word count
  const wordCount = taskAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg w-[90%] h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Writing Task {taskNumber}</h2>
            <p className="text-sm opacity-90 mt-1">Review and mark the student's response</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Task Response Section */}
          <div className="bg-white rounded-lg border-2 border-orange-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Student's Response</h3>
              <div className="text-sm">
                <span className="text-gray-600">Word Count: </span>
                <span className={`font-bold ${wordCount < (taskNumber === 1 ? 150 : 250) ? 'text-red-600' : 'text-green-600'}`}>
                  {wordCount}
                </span>
                <span className="text-gray-500 ml-1">
                  (Min: {taskNumber === 1 ? '150' : '250'} words)
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-200">
              {taskAnswer ? (
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{taskAnswer}</p>
              ) : (
                <p className="text-gray-400 italic">No answer provided</p>
              )}
            </div>
          </div>

          {/* IELTS Writing Assessment Criteria */}
          <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">IELTS Writing Assessment Criteria</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded p-3">
                <div className="font-semibold text-blue-800">Task Achievement (Task 1) / Task Response (Task 2)</div>
                <div className="text-gray-600 mt-1">
                  {taskNumber === 1 
                    ? 'Addresses all parts of the task, presents key features clearly, provides accurate data'
                    : 'Addresses all parts of the task, presents a clear position, develops ideas with relevant examples'}
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-semibold text-blue-800">Coherence and Cohesion</div>
                <div className="text-gray-600 mt-1">Logical organization, clear progression, appropriate use of cohesive devices</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-semibold text-blue-800">Lexical Resource</div>
                <div className="text-gray-600 mt-1">Range of vocabulary, accuracy of word choice, spelling and word formation</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-semibold text-blue-800">Grammatical Range and Accuracy</div>
                <div className="text-gray-600 mt-1">Variety of sentence structures, grammatical accuracy, punctuation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task {taskNumber} Band Score (0-9, with 0.5 increments)
            </label>
            <input
              type="number"
              min="0"
              max="9"
              step="0.5"
              value={bandScore}
              onChange={(e) => setBandScore(e.target.value)}
              disabled={isReadOnly}
              className="w-48 px-4 py-3 text-2xl font-bold border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="0.0"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isReadOnly || isSaving || !bandScore}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSaving ? 'Saving...' : 'Save Band Score'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

