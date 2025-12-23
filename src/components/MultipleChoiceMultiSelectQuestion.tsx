import { useState, useEffect } from 'react';

interface MultipleChoiceMultiSelectQuestionProps {
  instruction: string;
  question: string;
  questionNumbers: number[];
  maxSelections: number;
  options: Array<{
    label: string;
    value: string;
  }>;
  answers: { [key: number]: string };
  onAnswerChange: (questionNumber: number, answer: string) => void;
}

export function MultipleChoiceMultiSelectQuestion({
  instruction,
  question,
  questionNumbers,
  maxSelections,
  options,
  answers,
  onAnswerChange
}: MultipleChoiceMultiSelectQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Initialize selected options from answers
  useEffect(() => {
    const currentSelections: string[] = [];
    questionNumbers.forEach((qNum) => {
      if (answers[qNum]) {
        currentSelections.push(answers[qNum]);
      }
    });
    setSelectedOptions(currentSelections);
  }, [questionNumbers, answers]);

  const handleOptionClick = (optionValue: string) => {
    let newSelections: string[];

    if (selectedOptions.includes(optionValue)) {
      // Deselect the option
      newSelections = selectedOptions.filter(val => val !== optionValue);
    } else {
      // Select the option (if not at max)
      if (selectedOptions.length < maxSelections) {
        newSelections = [...selectedOptions, optionValue];
      } else {
        // Already at max selections, do nothing
        return;
      }
    }

    setSelectedOptions(newSelections);

    // Update answers for all question numbers
    questionNumbers.forEach((qNum, index) => {
      if (index < newSelections.length) {
        onAnswerChange(qNum, newSelections[index]);
      } else {
        onAnswerChange(qNum, '');
      }
    });
  };

  return (
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg" data-testid={`multi-select-questions-${questionNumbers[0]}-${questionNumbers[questionNumbers.length - 1]}`}>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2" data-testid="multi-select-instruction">{instruction}</p>
        <p className="font-medium text-gray-900 mb-4" data-testid="multi-select-question">{question}</p>
        <p className="text-sm text-blue-600 mb-4">
          Questions {questionNumbers.join(', ')} • Selected: {selectedOptions.length} of {maxSelections}
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.value);
          const isDisabled = !isSelected && selectedOptions.length >= maxSelections;

          return (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              disabled={isDisabled}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : isDisabled
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
              data-testid={`multi-select-option-${option.value}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-gray-700 mr-2">{option.value}.</span>
                <span className="text-gray-900">{option.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedOptions.length < maxSelections && (
        <p className="mt-4 text-sm text-amber-600">
          ⚠️ Please select {maxSelections - selectedOptions.length} more option{maxSelections - selectedOptions.length !== 1 ? 's' : ''} to answer all questions.
        </p>
      )}
    </div>
  );
}
