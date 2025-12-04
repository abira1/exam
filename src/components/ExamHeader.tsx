import React from 'react';
import { ClockIcon, UserIcon } from 'lucide-react';
interface ExamHeaderProps {
  trackName: string;
  questionType: string;
  timeRemaining: string;
  studentName?: string;
  studentId?: string;
  isTimeWarning?: boolean;
}
export function ExamHeader({
  trackName,
  questionType,
  timeRemaining,
  studentName,
  studentId,
  isTimeWarning = false
}: ExamHeaderProps) {
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{trackName}</h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-gray-600">{questionType}</p>
              {studentName && studentId && <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <UserIcon className="w-4 h-4" />
                  <span className="font-medium">{studentName}</span>
                  <span className="text-gray-400">•</span>
                  <span>{studentId}</span>
                </div>}
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isTimeWarning ? 'text-red-600 animate-pulse' : 'text-gray-700'}`} data-testid="exam-timer">
            <ClockIcon className="w-5 h-5" />
            <span className="font-mono text-lg font-bold">{timeRemaining}</span>
          </div>
        </div>
      </div>
    </header>;
}