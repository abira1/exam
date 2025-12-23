import { X, CheckCircle, Clock, AlertCircle, FileText, Send } from 'lucide-react';

interface MarkingStatusModalProps {
  examCode: string;
  stats: {
    total: number;
    fullyMarked: number;
    partiallyMarked: number;
    unmarked: number;
    published: number;
    unpublished: number;
  };
  onClose: () => void;
}

export function MarkingStatusModal({ examCode, stats, onClose }: MarkingStatusModalProps) {
  const completionPercentage = stats.total > 0
    ? Math.round((stats.fullyMarked / stats.total) * 100)
    : 0;

  const publishedPercentage = stats.total > 0
    ? Math.round((stats.published / stats.total) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Marking Status</h2>
            <p className="text-sm text-gray-600 mt-1">Session: {examCode}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Overall Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <div className="text-3xl font-bold text-blue-600">{completionPercentage}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {stats.fullyMarked} of {stats.total} submissions fully marked
            </p>
          </div>

          {/* Marking Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Marking Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Total Submissions */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-sm text-gray-600">Total Submissions</p>
                  </div>
                </div>
              </div>

              {/* Fully Marked */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">{stats.fullyMarked}</p>
                    <p className="text-sm text-green-700">Fully Marked</p>
                  </div>
                </div>
              </div>

              {/* Partially Marked */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-900">{stats.partiallyMarked}</p>
                    <p className="text-sm text-yellow-700">Partially Marked</p>
                  </div>
                </div>
              </div>

              {/* Unmarked */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-900">{stats.unmarked}</p>
                    <p className="text-sm text-red-700">Unmarked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Status</h3>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-900">{stats.published}</p>
                    <p className="text-sm text-purple-700">Results Published</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{publishedPercentage}%</p>
                  <p className="text-sm text-gray-600">Published</p>
                </div>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${publishedPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {stats.unpublished} submissions pending publication
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

