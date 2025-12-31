import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ImportantNoticeProps {
  onAccept: () => void;
}

export function ImportantNotice({ onAccept }: ImportantNoticeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Important Notice</h1>
              <p className="text-amber-100 text-sm mt-1">Please read carefully before continuing</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-10 space-y-6">
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6">
            <p className="text-gray-800 text-lg leading-relaxed">
              This is a <span className="font-semibold text-amber-700">simulated IELTS practice test</span> and not an official IELTS examination.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
            <p className="text-gray-800 text-lg leading-relaxed">
              The band score provided at the end of this test is an <span className="font-semibold text-blue-700">estimated score only</span> and does not guarantee the same result in the official IELTS exam.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 text-base leading-relaxed">
              By continuing, you acknowledge and accept these conditions.
            </p>
          </div>

          {/* Accept Button */}
          <div className="pt-6">
            <button
              onClick={onAccept}
              data-testid="accept-continue-button"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
            >
              <span>Accept & Continue</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Shah Sultan IELTS Academy - Practice Test Platform
          </p>
        </div>
      </div>
    </div>
  );
}
