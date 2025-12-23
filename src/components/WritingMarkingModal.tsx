import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionSubmission } from '../utils/storage';

interface WritingMarkingModalProps {
  sectionData: SectionSubmission;
  currentBandScore?: number;
  onSaveBandScore: (bandScore: number) => void;
  onClose: () => void;
  isReadOnly?: boolean;
}

export function WritingMarkingModal({
  sectionData,
  currentBandScore,
  onSaveBandScore,
  onClose,
  isReadOnly
}: WritingMarkingModalProps) {
  const [bandScore, setBandScore] = useState<string>(currentBandScore?.toString() || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setBandScore(currentBandScore?.toString() || '');
  }, [currentBandScore]);

  const handleSave = async () => {
    const band = parseFloat(bandScore);
    if (isNaN(band) || band < 0 || band > 9) {
      alert('Please enter a valid band score between 0 and 9');
      return;
    }

    setIsSaving(true);
    try {
      await onSaveBandScore(band);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error('Error saving band score:', error);
      alert('Error saving band score');
    } finally {
      setIsSaving(false);
    }
  };

  // Find the actual task keys (they may include trackId prefix like "track-w-1-task1")
  const answerKeys = Object.keys(sectionData.answers || {});
  const task1Key = answerKeys.find(key => key.includes('task1')) || 'task1';
  const task2Key = answerKeys.find(key => key.includes('task2')) || 'task2';

  const task1Answer = sectionData.answers[task1Key] || '';
  const task2Answer = sectionData.answers[task2Key] || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-[90%] h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-4xl">✍️</span>
            <div>
              <h2 className="text-2xl font-bold">Writing Section Marking</h2>
              <p className="text-sm opacity-90">{sectionData.trackName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            disabled={isSaving}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Submission Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Submitted</div>
                  <div className="font-medium">{new Date(sectionData.submittedAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Time Spent</div>
                  <div className="font-medium">{sectionData.timeSpent}</div>
                </div>
                <div>
                  <div className="text-gray-600">Current Band Score</div>
                  <div className="font-medium text-lg text-orange-600">
                    {currentBandScore !== undefined ? currentBandScore.toFixed(1) : 'Not scored'}
                  </div>
                </div>
              </div>
            </div>

            {/* Task 1 */}
            <div className="bg-white rounded-lg border-2 border-orange-200 overflow-hidden">
              <div className="bg-orange-100 border-b border-orange-200 p-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Task 1
                </h3>
                <p className="text-sm text-gray-600 mt-1">Academic Writing Task 1 (150 words minimum)</p>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2 font-medium">Student's Response:</div>
                  <div className="text-gray-900 whitespace-pre-wrap max-h-64 overflow-y-auto bg-white p-4 rounded border border-gray-300">
                    {task1Answer || <span className="text-gray-400 italic">No answer provided</span>}
                  </div>
                  {task1Answer && (
                    <div className="text-xs text-gray-500 mt-2">
                      Word count: ~{task1Answer.split(/\s+/).filter(w => w.length > 0).length} words
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div className="bg-white rounded-lg border-2 border-orange-200 overflow-hidden">
              <div className="bg-orange-100 border-b border-orange-200 p-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Task 2
                </h3>
                <p className="text-sm text-gray-600 mt-1">Academic Writing Task 2 (250 words minimum)</p>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2 font-medium">Student's Response:</div>
                  <div className="text-gray-900 whitespace-pre-wrap max-h-64 overflow-y-auto bg-white p-4 rounded border border-gray-300">
                    {task2Answer || <span className="text-gray-400 italic">No answer provided</span>}
                  </div>
                  {task2Answer && (
                    <div className="text-xs text-gray-500 mt-2">
                      Word count: ~{task2Answer.split(/\s+/).filter(w => w.length > 0).length} words
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Marking Criteria */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                IELTS Writing Assessment Criteria
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Task Achievement (Task 1) / Task Response (Task 2)</div>
                  <div className="text-gray-600">Addresses all parts of the task, presents clear position, develops ideas</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Coherence and Cohesion</div>
                  <div className="text-gray-600">Logical organization, clear progression, appropriate linking words</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Lexical Resource</div>
                  <div className="text-gray-600">Range of vocabulary, accuracy, appropriateness, spelling</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Grammatical Range and Accuracy</div>
                  <div className="text-gray-600">Variety of structures, accuracy, punctuation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Writing Band Score (0-9, with .5 increments)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="0"
                max="9"
                step="0.5"
                value={bandScore}
                onChange={(e) => setBandScore(e.target.value)}
                disabled={isReadOnly || isSaving}
                className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg text-xl font-bold focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="0.0"
              />
              <div className="text-sm text-gray-600">
                <div className="font-medium">Band Score Range:</div>
                <div className="text-xs">0 (lowest) to 9 (highest), in 0.5 increments</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isReadOnly || isSaving || !bandScore}
              className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Save Band Score
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
