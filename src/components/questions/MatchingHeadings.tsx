import React, { useState } from 'react';

interface MatchingHeadingsProps {
  instruction: string;
  paragraphs: Array<{
    questionNumber: number;
    paragraphLabel: string;
    content: string;
  }>;
  headings: Array<{
    label: string;
    value: string;
  }>;
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
  disabled?: boolean;
}

export function MatchingHeadings({
  instruction,
  paragraphs,
  headings,
  answers,
  onAnswerChange,
  disabled = false
}: MatchingHeadingsProps) {
  const [draggedHeading, setDraggedHeading] = useState<string | null>(null);
  const [hoveredParagraph, setHoveredParagraph] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, headingValue: string) => {
    if (disabled) return;
    setDraggedHeading(headingValue);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', headingValue);
  };

  const handleDragOver = (e: React.DragEvent, questionNumber: number) => {
    if (disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredParagraph(questionNumber);
  };

  const handleDragLeave = () => {
    setHoveredParagraph(null);
  };

  const handleDrop = (e: React.DragEvent, questionNumber: number) => {
    if (disabled) return;
    e.preventDefault();
    const headingValue = e.dataTransfer.getData('text/plain');
    if (headingValue) {
      onAnswerChange(questionNumber, headingValue);
    }
    setDraggedHeading(null);
    setHoveredParagraph(null);
  };

  const handleRemove = (questionNumber: number) => {
    if (disabled) return;
    onAnswerChange(questionNumber, '');
  };

  const isHeadingUsed = (headingValue: string) => {
    // Check if heading is used in any of this question set's paragraphs
    const paragraphQuestionNumbers = paragraphs.map(p => p.questionNumber);
    return paragraphQuestionNumbers.some(qNum => answers[qNum] === headingValue);
  };

  const getHeadingLabel = (value: string) => {
    const heading = headings.find(h => h.value === value);
    return heading ? heading.label : '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r">
        <p className="text-sm text-gray-700 font-medium">{instruction}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Items to Match (Paragraphs with Drop Zones) */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Items to Match</h3>
          {paragraphs.map((paragraph) => (
            <div key={paragraph.questionNumber} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">
                  ({paragraph.questionNumber})
                </span>
                <span className="text-gray-900 font-medium">{paragraph.paragraphLabel}</span>
              </div>
              <div
                onDragOver={(e) => handleDragOver(e, paragraph.questionNumber)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, paragraph.questionNumber)}
                className={`min-h-[60px] border-2 border-dashed rounded-lg p-3 transition-all ${
                  hoveredParagraph === paragraph.questionNumber
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 bg-white'
                } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
                data-testid={`drop-zone-${paragraph.questionNumber}`}
              >
                {answers[paragraph.questionNumber] ? (
                  <div className="flex items-center justify-between bg-purple-100 border border-purple-300 rounded px-3 py-2">
                    <span className="text-sm text-gray-900">
                      {getHeadingLabel(answers[paragraph.questionNumber])}
                    </span>
                    {!disabled && (
                      <button
                        onClick={() => handleRemove(paragraph.questionNumber)}
                        className="text-red-600 hover:text-red-800 font-bold text-lg ml-2"
                        data-testid={`remove-answer-${paragraph.questionNumber}`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-2">
                    {disabled ? 'No answer selected' : 'Drag an option here'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - List of Headings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">List of Headings</h3>
          <div className="space-y-2">
            {headings.map((heading) => (
              <div
                key={heading.value}
                draggable={!disabled && !isHeadingUsed(heading.value)}
                onDragStart={(e) => handleDragStart(e, heading.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isHeadingUsed(heading.value)
                    ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                    : disabled
                    ? 'bg-white border-gray-300 cursor-not-allowed opacity-60'
                    : 'bg-white border-gray-300 cursor-move hover:border-purple-500 hover:bg-purple-50'
                } ${
                  draggedHeading === heading.value ? 'opacity-50' : ''
                }`}
                data-testid={`draggable-heading-${heading.value}`}
              >
                <span className="text-gray-900">{heading.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
