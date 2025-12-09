import React from 'react';
interface TableRow {
  label: string | {
    questionNumber: number;
  };
  value: string | {
    questionNumber: number;
  };
}
interface TableGapQuestionProps {
  instruction: string;
  title: string;
  rows: TableRow[];
  answers: Record<number, string>;
  onAnswerChange: (questionNumber: number, value: string) => void;
}
export function TableGapQuestion({
  instruction,
  title,
  rows,
  answers,
  onAnswerChange
}: TableGapQuestionProps) {
  // Helper to get question number from either label or value of a row
  const getRowQuestionNumber = (rowIndex: number): { qNum: number | null, location: 'label' | 'value' | null } => {
    const row = rows[rowIndex];
    
    // Check value first
    if (typeof row.value === 'object' && 'questionNumber' in row.value) {
      return { qNum: row.value.questionNumber, location: 'value' };
    }
    
    // Check label
    if (typeof row.label === 'object' && 'questionNumber' in row.label) {
      return { qNum: row.label.questionNumber, location: 'label' };
    }
    
    return { qNum: null, location: null };
  };

  const renderCell = (content: string | { questionNumber: number }, isLabel: boolean, rowIndex?: number) => {
    if (rowIndex === undefined) {
      // Shouldn't happen, but handle gracefully
      return typeof content === 'string' ? <span className={isLabel ? 'font-medium' : ''}>{content}</span> : null;
    }

    const { qNum, location } = getRowQuestionNumber(rowIndex);
    
    // Case 1: This cell contains the questionNumber object directly
    if (typeof content === 'object' && 'questionNumber' in content) {
      const questionNumber = content.questionNumber;
      return (
        <div className="inline-flex items-center gap-2">
          <span className="text-gray-500 font-medium">({questionNumber})</span>
          <input
            type="text"
            value={answers[questionNumber] || ''}
            onChange={e => onAnswerChange(questionNumber, e.target.value)}
            className="px-2 py-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-colors min-w-[120px] max-w-[200px]"
            placeholder=""
            data-testid={`table-gap-input-${questionNumber}`}
          />
        </div>
      );
    }
    
    // Case 2: String content
    if (typeof content === 'string') {
      // If this row has questionNumber in VALUE field and we're rendering LABEL cell
      // Show the label with inline input
      if (isLabel && location === 'value' && qNum !== null) {
        // Check if label contains "_______"
        if (content.includes('_______')) {
          const parts = content.split('_______');
          return (
            <span className="font-medium">
              {parts.map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index < parts.length - 1 && (
                    <>
                      <span className="text-gray-500 font-medium">({qNum})</span>
                      <input
                        type="text"
                        value={answers[qNum] || ''}
                        onChange={e => onAnswerChange(qNum, e.target.value)}
                        className="inline-block mx-1 px-2 py-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-colors min-w-[120px] max-w-[200px]"
                        placeholder=""
                        data-testid={`table-gap-inline-input-${qNum}`}
                      />
                    </>
                  )}
                </React.Fragment>
              ))}
            </span>
          );
        } else {
          // No gap in label, show input at end
          return (
            <span className="font-medium">
              {content} <span className="text-gray-500 font-medium">({qNum})</span>
              <input
                type="text"
                value={answers[qNum] || ''}
                onChange={e => onAnswerChange(qNum, e.target.value)}
                className="inline-block mx-1 px-2 py-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 focus:bg-blue-50 transition-colors min-w-[120px] max-w-[200px]"
                placeholder=""
                data-testid={`table-gap-inline-input-${qNum}`}
              />
            </span>
          );
        }
      }
      
      // If this row has questionNumber in VALUE field and we're rendering VALUE cell
      // Don't render anything (input is already in label cell)
      if (!isLabel && location === 'value' && qNum !== null) {
        return null;
      }
      
      // Normal string content
      return <span className={isLabel ? 'font-medium' : ''}>{content}</span>;
    }
    
    return null;
  };
  return <div className="space-y-4">
      <div className="bg-gray-50 border border-gray-200 rounded p-4">
        <p className="text-sm text-gray-700 italic">{instruction}</p>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {rows.map((row, idx) => <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 border-b border-gray-200 w-1/2">
                  {renderCell(row.label, true, idx)}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 w-1/2">
                  {renderCell(row.value, false, idx)}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}