import React, { useState } from 'react';

interface FlowChartStep {
  questionNumber: number;
  text: string;
}

interface FlowChartQuestionProps {
  instruction: string;
  title?: string;
  steps: FlowChartStep[];
  options: Array<{
    label: string;
    value: string;
  }>;
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
}

export function FlowChartQuestion({
  instruction,
  title,
  steps,
  options,
  answers,
  onAnswerChange
}: FlowChartQuestionProps) {
  const [draggedOption, setDraggedOption] = useState<string | null>(null);
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, optionValue: string) => {
    setDraggedOption(optionValue);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', optionValue);
  };

  const handleDragOver = (e: React.DragEvent, questionNumber: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredQuestion(questionNumber);
  };

  const handleDragLeave = () => {
    setHoveredQuestion(null);
  };

  const handleDrop = (e: React.DragEvent, questionNumber: number) => {
    e.preventDefault();
    const optionValue = e.dataTransfer.getData('text/plain');
    if (optionValue) {
      onAnswerChange(questionNumber, optionValue);
    }
    setDraggedOption(null);
    setHoveredQuestion(null);
  };

  const handleRemove = (questionNumber: number) => {
    onAnswerChange(questionNumber, '');
  };

  const isOptionUsed = (optionValue: string) => {
    return Object.values(answers).includes(optionValue);
  };

  const getOptionLabel = (value: string) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 border border-gray-200 rounded p-4">
        <p className="text-sm text-gray-700 italic">{instruction}</p>
      </div>

      {title && (
        <h3 className="text-xl font-bold text-gray-900 text-center bg-gray-100 border border-gray-300 py-3 rounded">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Flow chart */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flow Chart</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={step.questionNumber} className="space-y-2">
                {/* Arrow down */}
                {index > 0 && (
                  <div className="flex justify-center">
                    <div className="text-gray-400 text-2xl">↓</div>
                  </div>
                )}
                
                {/* Flow chart box */}
                <div className="border-2 border-gray-400 rounded-lg p-4 bg-white">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-900">{step.text}</span>
                  </div>
                  
                  {/* Drop zone for answer */}
                  <div
                    onDragOver={(e) => handleDragOver(e, step.questionNumber)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, step.questionNumber)}
                    className={`mt-3 min-h-[50px] border-2 border-dashed rounded p-3 transition-all ${
                      hoveredQuestion === step.questionNumber
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    data-testid={`flowchart-drop-zone-${step.questionNumber}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-medium">({step.questionNumber})</span>
                      {answers[step.questionNumber] ? (
                        <div className="flex-1 flex items-center justify-between bg-blue-100 border border-blue-300 rounded px-3 py-2">
                          <span className="text-sm text-gray-900 font-medium">
                            {answers[step.questionNumber]}. {getOptionLabel(answers[step.questionNumber])}
                          </span>
                          <button
                            onClick={() => handleRemove(step.questionNumber)}
                            className="text-red-600 hover:text-red-800 font-bold text-lg ml-2"
                            data-testid={`flowchart-remove-${step.questionNumber}`}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm flex-1 text-center">Drag option here</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Options */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <p className="text-sm text-gray-700">
              {options.map((opt, idx) => (
                <span key={opt.value}>
                  {opt.value}. {opt.label}
                  {idx < options.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.value}
                draggable={!isOptionUsed(option.value)}
                onDragStart={(e) => handleDragStart(e, option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isOptionUsed(option.value)
                    ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                    : 'bg-white border-gray-300 cursor-move hover:border-blue-500 hover:bg-blue-50'
                } ${
                  draggedOption === option.value ? 'opacity-50' : ''
                }`}
                data-testid={`flowchart-draggable-${option.value}`}
              >
                <span className="text-gray-900 font-medium">
                  {option.value}.
                </span>{' '}
                <span className="text-gray-700">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}