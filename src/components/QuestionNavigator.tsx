import React, { useMemo } from 'react';
import { Section } from '../data/examData';

interface QuestionNavigatorProps {
  answers: Record<number, string>;
  onQuestionClick: (questionNumber: number, sectionIndex: number) => void;
  currentSection: number;
  examData?: Section[];
}

export function QuestionNavigator({
  answers,
  onQuestionClick,
  currentSection,
  examData
}: QuestionNavigatorProps) {
  
  // Dynamically build section questions from exam data
  const sectionQuestions = useMemo(() => {
    if (!examData || examData.length === 0) {
      // Fallback to default 4 sections if no exam data
      return [{
        section: 1,
        questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }, {
        section: 2,
        questions: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      }, {
        section: 3,
        questions: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
      }, {
        section: 4,
        questions: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
      }];
    }

    // Extract all question numbers from each section
    return examData.map((section) => {
      const questions: number[] = [];
      
      section.questions.forEach((question: any) => {
        // Check direct questionNumber property
        if (question.questionNumber !== undefined) {
          questions.push(question.questionNumber);
        }
        
        // Check questionNumbers array
        if (question.questionNumbers && Array.isArray(question.questionNumbers)) {
          questions.push(...question.questionNumbers);
        }
        
        // Check items array
        if (question.items && Array.isArray(question.items)) {
          question.items.forEach((item: any) => {
            if (item.questionNumber !== undefined) {
              questions.push(item.questionNumber);
            }
          });
        }
        
        // Check statements array
        if (question.statements && Array.isArray(question.statements)) {
          question.statements.forEach((statement: any) => {
            if (statement.questionNumber !== undefined) {
              questions.push(statement.questionNumber);
            }
          });
        }
        
        // Check rows array
        if (question.rows && Array.isArray(question.rows)) {
          question.rows.forEach((row: any) => {
            // Check row.questionNumber (direct property)
            if (row.questionNumber !== undefined) {
              questions.push(row.questionNumber);
            }
            // Check row.value.questionNumber (nested in value object)
            if (row.value && typeof row.value === 'object' && row.value.questionNumber !== undefined) {
              questions.push(row.value.questionNumber);
            }
            // Check row.label.questionNumber (nested in label object)
            if (row.label && typeof row.label === 'object' && row.label.questionNumber !== undefined) {
              questions.push(row.label.questionNumber);
            }
          });
        }
        
        // Check paragraphs array (for matching-headings questions)
        if (question.paragraphs && Array.isArray(question.paragraphs)) {
          question.paragraphs.forEach((para: any) => {
            if (para.questionNumber !== undefined) {
              questions.push(para.questionNumber);
            }
          });
        }
        
        // Check labels array (for map-labeling questions)
        if (question.labels && Array.isArray(question.labels)) {
          question.labels.forEach((label: any) => {
            if (label.questionNumber !== undefined) {
              questions.push(label.questionNumber);
            }
          });
        }
        
        // Check steps array (for flowchart questions)
        if (question.steps && Array.isArray(question.steps)) {
          question.steps.forEach((step: any) => {
            if (step.questionNumber !== undefined) {
              questions.push(step.questionNumber);
            }
          });
        }
        
        // Check tableData array (for drag-drop-table questions)
        if (question.tableData && Array.isArray(question.tableData)) {
          question.tableData.forEach((row: any) => {
            if (row.cells && Array.isArray(row.cells)) {
              row.cells.forEach((cell: any) => {
                if (cell.questionNumber !== undefined) {
                  questions.push(cell.questionNumber);
                }
              });
            }
          });
        }
        
        // Check headers array (for table-selection questions)
        if (question.headers && Array.isArray(question.headers)) {
          if (question.rows && Array.isArray(question.rows)) {
            question.rows.forEach((row: any) => {
              if (row.questionNumber !== undefined) {
                questions.push(row.questionNumber);
              }
            });
          }
        }
      });

      // Sort and remove duplicates
      const uniqueQuestions = [...new Set(questions)].sort((a, b) => a - b);
      
      return {
        section: section.sectionNumber,
        questions: uniqueQuestions
      };
    });
  }, [examData]);
  
  const isAnswered = (questionNumber: number) => {
    return answers[questionNumber] && answers[questionNumber].trim() !== '';
  };
  
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
      <div className="w-full px-4 py-2">
        <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto flex-wrap">
          {sectionQuestions.map((section, sectionIdx) => <div key={section.section} className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-600 text-xs whitespace-nowrap">
                S{section.section}
              </span>
              <div className="flex gap-0.5">
                {section.questions.map(qNum => <button key={qNum} onClick={() => onQuestionClick(qNum, sectionIdx)} className={`
                      w-6 h-6 rounded text-[9px] font-medium transition-all
                      ${currentSection === sectionIdx ? 'ring-1 ring-blue-500' : ''}
                      ${isAnswered(qNum) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'}
                    `} title={`Question ${qNum}${isAnswered(qNum) ? ' (answered)' : ''}`}>
                    {qNum}
                  </button>)}
              </div>
            </div>)}
        </div>
      </div>
    </nav>;
}