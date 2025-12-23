import React from 'react';
import { ExamSubmission } from '../utils/storage';
import { allTracks } from '../data/tracks';
import { convertListeningToBand, convertReadingToBand } from '../utils/bandScoreConversion';

interface PrintableResultProps {
  submission: ExamSubmission;
  onClose: () => void;
}

export const PrintableResult: React.FC<PrintableResultProps> = ({ submission, onClose }) => {
  const track = allTracks.find(t => t.id === submission.trackId);
  const isMockTest = submission.testType === 'mock' && submission.overallBand !== undefined;
  
  // Calculate section-wise scores
  const calculateSectionStats = () => {
    let section1 = 0, section2 = 0, section3 = 0, section4 = 0;
    let correct = 0;
    const totalQs = submission.totalQuestions || 40;
    const isWriting = submission.trackType === 'writing' && totalQs === 2;

    if (submission.marks) {
      if (isWriting) {
        // For writing tracks, count task marks
        if (submission.marks['task1'] === 'correct') correct++;
        if (submission.marks['task2'] === 'correct') correct++;
      } else {
        // For reading/listening tracks with numbered questions
        for (let i = 1; i <= totalQs; i++) {
          if (submission.marks[i] === 'correct') {
            correct++;
            if (i <= 10) section1++;
            else if (i <= 20) section2++;
            else if (i <= 30) section3++;
            else section4++;
          }
        }
      }
    }

    return { section1, section2, section3, section4, correct };
  };

  const stats = calculateSectionStats();
  const totalQs = submission.totalQuestions || 40;
  const percentage = submission.manualScore || Math.round((stats.correct / totalQs) * 100);

  // Helper function for band score interpretation
  const getBandInterpretation = (band: number): string => {
    if (band >= 8.5) return "Excellent! Very good command of English with effective handling of complex language.";
    if (band >= 7.5) return "Very Good! High level of operational command with occasional errors.";
    if (band >= 6.5) return "Good! Generally effective command of the language despite some inaccuracies.";
    if (band >= 5.5) return "Competent! Partial command of the language, handles overall meaning in most situations.";
    if (band >= 4.5) return "Basic! Limited ability with potential communication breakdowns.";
    return "Keep practicing! There's room for improvement in English language skills.";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Non-printable controls */}
        <div className="print:hidden bg-gray-100 p-4 flex justify-between items-center border-b sticky top-0 z-10">
          <h2 className="text-lg font-bold text-gray-800">Print Preview</h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🖨️ Print Result
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>

        {/* Printable content */}
        <div className="p-8 bg-white" id="printable-result">
          {/* Header with Logo */}
          <div className="flex items-start justify-between mb-4 pb-4 border-b-4 border-gray-900">
            <div className="flex items-center gap-4">
              <img
                src="/shah-sultan-academy-logo.png"
                alt="Shah Sultan IELTS Academy"
                className="h-20 w-20 object-contain print-logo"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide print-title">Shah Sultan IELTS Academy</h1>
                <p className="text-lg text-gray-700 font-semibold print-subtitle">Student Performance Report</p>
                <p className="text-sm text-gray-600 mt-1 uppercase tracking-wider">Official Exam Results</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gray-100 px-4 py-2 rounded border-2 border-gray-900">
                <p className="text-xs text-gray-700 mb-1 uppercase tracking-wider font-semibold">Report Date</p>
                <p className="text-sm font-bold text-gray-900">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-2 gap-4 mb-4 info-section">
            <div className="bg-white p-3 rounded border-2 border-gray-900">
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">Student Information</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Student ID:</span>
                  <span className="text-sm font-bold text-gray-900">{submission.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Name:</span>
                  <span className="text-sm font-bold text-gray-900">{submission.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Batch:</span>
                  <span className="text-sm font-bold text-gray-900">{submission.batchId || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded border-2 border-gray-900">
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">Exam Information</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Exam Code:</span>
                  <span className="text-sm font-bold text-gray-900">{submission.examCode || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Track:</span>
                  <span className="text-sm font-bold text-gray-900">{track?.name || submission.trackName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 font-semibold">Date:</span>
                  <span className="text-sm font-bold text-gray-900">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Score - Mock Test vs Partial Test */}
          {isMockTest ? (
            <>
              {/* Mock Test Band Score Display */}
              <div className="bg-white p-6 rounded-lg border-4 border-gray-900 mb-4 overall-band-section">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide">IELTS Mock Test Result</h3>
                  <div className="mb-2 py-4 border-y-2 border-gray-300">
                    <p className="text-sm text-gray-600 mb-2 uppercase tracking-wider">Overall Band Score</p>
                    <div className="text-9xl font-bold mb-1 text-gray-900 overall-band-score">
                      {submission.overallBand!.toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 italic">
                      {getBandInterpretation(submission.overallBand!)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Band Scores */}
              <div className="mb-4 section-bands">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-gray-900 uppercase tracking-wide">
                  Section Band Scores
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white border-2 border-gray-900 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Listening</h4>
                    <div className="text-5xl font-bold text-gray-900 py-2 section-band-value">
                      {submission.sectionScores?.listening?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Band Score</p>
                  </div>

                  <div className="bg-white border-2 border-gray-900 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Reading</h4>
                    <div className="text-5xl font-bold text-gray-900 py-2 section-band-value">
                      {submission.sectionScores?.reading?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Band Score</p>
                  </div>

                  <div className="bg-white border-2 border-gray-900 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Writing</h4>
                    <div className="text-5xl font-bold text-gray-900 py-2 section-band-value">
                      {submission.sectionScores?.writing?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Band Score</p>
                  </div>

                  <div className="bg-white border-2 border-gray-900 rounded-lg p-3 text-center">
                    <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Speaking</h4>
                    <div className="text-5xl font-bold text-gray-900 py-2 section-band-value">
                      {submission.sectionScores?.speaking?.toFixed(1) || '--'}
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Band Score</p>
                  </div>
                </div>
              </div>

              {/* Performance Indicator - Simplified */}
              <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-400 mb-4 performance-section">
                <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                  Performance Level
                </h4>
                <div className="bg-white rounded h-4 overflow-hidden border-2 border-gray-900">
                  <div
                    className="h-full bg-gray-900"
                    style={{ width: `${(submission.overallBand! / 9) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-700 mt-2 font-semibold">
                  <span>0.0</span>
                  <span className="text-base">Band {submission.overallBand!.toFixed(1)}</span>
                  <span>9.0</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Partial Test Score Display */}
              {(() => {
                const trackType = submission.trackType;
                let bandScore: number | null = null;
                let testLabel = 'Overall Score';

                // Calculate band score for Listening or Reading tests
                if (trackType === 'listening') {
                  bandScore = convertListeningToBand(stats.correct);
                  testLabel = 'Listening Test Result';
                } else if (trackType === 'reading') {
                  bandScore = convertReadingToBand(stats.correct);
                  testLabel = 'Reading Test Result';
                }

                return (
                  <div className="bg-white p-4 rounded-lg border-4 border-gray-900 mb-4 partial-test-section">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">{testLabel}</h3>

                      {/* Raw Score and Percentage */}
                      <div className="flex items-center justify-center gap-6 mb-4">
                        <div>
                          <div className="text-6xl font-bold text-gray-900 mb-1 raw-score">
                            {stats.correct}<span className="text-3xl text-gray-600">/{totalQs}</span>
                          </div>
                          <p className="text-sm text-gray-700 uppercase tracking-wider">
                            {submission.trackType === 'writing' && totalQs === 2 ? 'Tasks Correct' : 'Correct Answers'}
                          </p>
                        </div>
                        <div className="h-16 w-px bg-gray-400"></div>
                        <div>
                          <div className="text-6xl font-bold text-gray-900 mb-1 percentage-score">
                            {percentage}<span className="text-3xl text-gray-600">%</span>
                          </div>
                          <p className="text-sm text-gray-700 uppercase tracking-wider">Percentage</p>
                        </div>
                      </div>

                      {/* Band Score Display - Only for Listening/Reading */}
                      {bandScore !== null && (
                        <div className="border-t-4 border-gray-900 pt-4 mb-4">
                          <p className="text-sm text-gray-700 mb-2 uppercase tracking-wider font-bold">IELTS Band Score</p>
                          <div className="text-8xl font-bold text-gray-900 mb-1 partial-band-score">
                            {bandScore.toFixed(1)}
                          </div>
                          <p className="text-sm text-gray-700 uppercase tracking-wider">
                            Official IELTS Band Score
                          </p>
                        </div>
                      )}

                      {/* Performance Band */}
                      <div className="mt-4">
                        <div className="bg-white rounded-full h-3 overflow-hidden border-2 border-gray-900">
                          <div
                            className="h-full bg-gray-900"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-800 mt-2 font-semibold">
                          Performance: {
                            percentage >= 90 ? 'Excellent' :
                            percentage >= 75 ? 'Very Good' :
                            percentage >= 60 ? 'Good' :
                            percentage >= 50 ? 'Satisfactory' :
                            'Needs Improvement'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}

          {/* Section-wise Breakdown - Only for Partial Tests */}
          {!isMockTest && (
            <div className="mb-4 section-breakdown">
              <h3 className="text-base font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-900 uppercase tracking-wide">
                Section-wise Performance
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { title: 'Section 1', range: 'Q1-10', score: stats.section1 },
                  { title: 'Section 2', range: 'Q11-20', score: stats.section2 },
                  { title: 'Section 3', range: 'Q21-30', score: stats.section3 },
                  { title: 'Section 4', range: 'Q31-40', score: stats.section4 }
                ].map((section, idx) => (
                  <div key={idx} className="bg-white border-2 border-gray-900 rounded-lg p-2 text-center">
                    <h4 className="text-xs font-bold text-gray-900 mb-1 uppercase tracking-wider">{section.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{section.range}</p>
                    <div className="text-2xl font-bold text-gray-900 section-score">
                      {section.score}<span className="text-sm text-gray-600">/10</span>
                    </div>
                    <div className="mt-1 bg-white rounded-full h-1.5 overflow-hidden border border-gray-900">
                      <div
                        className="bg-gray-900 h-full"
                        style={{ width: `${(section.score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 font-semibold">{(section.score / 10 * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-4 mb-4 additional-info">
            <div className="bg-white p-3 rounded border-2 border-gray-900">
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">Submission Details</h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Time Spent:</span> <span className="font-bold text-gray-900">{submission.timeSpent || 'N/A'}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span> <span className="font-bold text-gray-900">
                    {submission.resultPublished ? 'Published' : 'Pending'}
                  </span>
                </p>
                {submission.publishedAt && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Published:</span> <span className="font-bold text-gray-900">
                      {new Date(submission.publishedAt).toLocaleDateString()}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white p-3 rounded border-2 border-gray-900">
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider border-b border-gray-400 pb-1">Grading Information</h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Graded By:</span> <span className="font-bold text-gray-900">{submission.markedBy || 'N/A'}</span>
                </p>
                {isMockTest ? (
                  <>
                    <p className="text-gray-700">
                      <span className="font-semibold">Test Type:</span> <span className="font-bold text-gray-900">IELTS Mock Test</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Overall Band:</span> <span className="font-bold text-gray-900">{submission.overallBand?.toFixed(1)}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700">
                      <span className="font-semibold">Total Questions:</span> <span className="font-bold text-gray-900">40</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Correct Answers:</span> <span className="font-bold text-gray-900">{stats.correct}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-8 pt-6 border-t-4 border-gray-900 signature-section">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="border-t-2 border-gray-900 pt-3 mt-12">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Teacher Signature</p>
                  <p className="text-xs text-gray-700 mt-1 font-semibold">
                    {submission.markedBy || 'Examiner'}
                  </p>
                </div>
              </div>
              <div>
                <div className="border-t-2 border-gray-900 pt-3 mt-12">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Date</p>
                  <p className="text-xs text-gray-700 mt-1 font-semibold">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <div className="border-t-2 border-gray-900 pt-3 mt-12">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Administrator</p>
                  <p className="text-xs text-gray-700 mt-1 font-semibold">Shah Sultan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-700 border-t-2 border-gray-900 pt-4 footer-section">
            <p className="mb-1 font-semibold uppercase tracking-wider">This is an official result document from Shah Sultan IELTS Academy</p>
            <p className="text-gray-600">Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-result,
          #printable-result * {
            visibility: visible;
          }
          #printable-result {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 10mm !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 10mm;
          }

          /* Reduce font sizes for print - BALANCED */
          #printable-result .text-9xl,
          #printable-result .overall-band-score {
            font-size: 4.5rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-8xl,
          #printable-result .partial-band-score {
            font-size: 3.5rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-6xl,
          #printable-result .raw-score,
          #printable-result .percentage-score {
            font-size: 2.25rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-5xl,
          #printable-result .section-band-value {
            font-size: 1.75rem !important;
            line-height: 1.1 !important;
          }
          #printable-result .text-3xl {
            font-size: 1.375rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .text-2xl,
          #printable-result .section-score {
            font-size: 1.125rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .text-xl {
            font-size: 1rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .text-lg {
            font-size: 0.875rem !important;
            line-height: 1.2 !important;
          }
          #printable-result .print-title {
            font-size: 1.375rem !important;
          }
          #printable-result .print-subtitle {
            font-size: 1rem !important;
          }

          /* Reduce padding and margins - BALANCED for readability */
          #printable-result .p-8 {
            padding: 0.75rem !important;
          }
          #printable-result .p-6 {
            padding: 0.625rem !important;
          }
          #printable-result .p-5 {
            padding: 0.5rem !important;
          }
          #printable-result .p-4 {
            padding: 0.5rem !important;
          }
          #printable-result .p-3 {
            padding: 0.375rem !important;
          }
          #printable-result .p-2 {
            padding: 0.25rem !important;
          }
          #printable-result .py-6 {
            padding-top: 0.625rem !important;
            padding-bottom: 0.625rem !important;
          }
          #printable-result .py-4 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          #printable-result .py-2 {
            padding-top: 0.375rem !important;
            padding-bottom: 0.375rem !important;
          }
          #printable-result .mb-6 {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .mb-4 {
            margin-bottom: 0.5rem !important;
          }
          #printable-result .mb-3 {
            margin-bottom: 0.375rem !important;
          }
          #printable-result .mb-2 {
            margin-bottom: 0.25rem !important;
          }
          #printable-result .mb-1 {
            margin-bottom: 0.125rem !important;
          }
          #printable-result .mt-12 {
            margin-top: 1.25rem !important;
          }
          #printable-result .mt-8 {
            margin-top: 1rem !important;
          }
          #printable-result .mt-6 {
            margin-top: 0.625rem !important;
          }
          #printable-result .mt-4 {
            margin-top: 0.5rem !important;
          }
          #printable-result .mt-3 {
            margin-top: 0.375rem !important;
          }
          #printable-result .mt-2 {
            margin-top: 0.25rem !important;
          }
          #printable-result .mt-1 {
            margin-top: 0.125rem !important;
          }
          #printable-result .gap-8 {
            gap: 0.625rem !important;
          }
          #printable-result .gap-6 {
            gap: 0.5rem !important;
          }
          #printable-result .gap-4 {
            gap: 0.5rem !important;
          }
          #printable-result .gap-3 {
            gap: 0.375rem !important;
          }
          #printable-result .pb-6 {
            padding-bottom: 0.625rem !important;
          }
          #printable-result .pb-4 {
            padding-bottom: 0.5rem !important;
          }
          #printable-result .pb-2 {
            padding-bottom: 0.25rem !important;
          }
          #printable-result .pb-1 {
            padding-bottom: 0.125rem !important;
          }
          #printable-result .pt-6 {
            padding-top: 0.625rem !important;
          }
          #printable-result .pt-4 {
            padding-top: 0.5rem !important;
          }
          #printable-result .pt-3 {
            padding-top: 0.375rem !important;
          }
          #printable-result .pt-2 {
            padding-top: 0.25rem !important;
          }

          /* Reduce header logo size */
          #printable-result .h-20,
          #printable-result .print-logo {
            height: 2.5rem !important;
          }
          #printable-result .w-20 {
            width: 2.5rem !important;
          }

          /* Optimize section heights */
          #printable-result .h-6 {
            height: 0.75rem !important;
          }
          #printable-result .h-4 {
            height: 0.5rem !important;
          }
          #printable-result .h-3 {
            height: 0.375rem !important;
          }
          #printable-result .h-2 {
            height: 0.25rem !important;
          }
          #printable-result .h-16 {
            height: 3rem !important;
          }
          #printable-result .h-20 {
            height: 3rem !important;
          }

          /* Specific section optimizations - IMPROVED SPACING */
          #printable-result .overall-band-section {
            padding: 0.75rem !important;
            margin-bottom: 0.625rem !important;
          }
          #printable-result .section-bands {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .performance-section {
            padding: 0.5rem !important;
            margin-bottom: 0.625rem !important;
          }
          #printable-result .partial-test-section {
            padding: 0.75rem !important;
            margin-bottom: 0.625rem !important;
          }
          #printable-result .section-breakdown {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .additional-info {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .info-section {
            margin-bottom: 0.625rem !important;
          }
          #printable-result .signature-section {
            margin-top: 1.5rem !important;
            padding-top: 1rem !important;
            margin-bottom: 1rem !important;
          }
          #printable-result .signature-section .mt-12 {
            margin-top: 1.5rem !important;
          }
          #printable-result .signature-section .pt-3 {
            padding-top: 0.5rem !important;
          }
          #printable-result .signature-section .gap-8 {
            gap: 1rem !important;
          }
          #printable-result .footer-section {
            margin-top: 1rem !important;
            padding-top: 0.75rem !important;
          }

          /* Ensure content fits on one page - ADJUSTED */
          #printable-result {
            max-height: 277mm !important;
            overflow: hidden !important;
            font-size: 92% !important;
          }

          /* Reduce border widths for print */
          #printable-result .border-4 {
            border-width: 2px !important;
          }
          #printable-result .border-2 {
            border-width: 1px !important;
          }
        }
      `}</style>
    </div>
  );
};
