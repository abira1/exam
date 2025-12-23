import { ExamSubmission } from './storage';
import { ExamSession } from '../services/examSessionService';
import { FileNode } from '../components/ui/file-tree';

/**
 * Build hierarchical file tree structure from submissions and exam sessions
 * 
 * Structure:
 * - Root Level: "Partial" and "Mock" folders
 * - Session Level: Exam sessions (exam codes)
 * - Submission Level: Individual student submissions
 */
export function buildSubmissionTree(
  submissions: ExamSubmission[],
  examSessions: ExamSession[]
): FileNode[] {
  const tree: FileNode[] = [];

  // Group submissions by test type
  const partialSubmissions = submissions.filter(s => s.testType !== 'mock');
  const mockSubmissions = submissions.filter(s => s.testType === 'mock');

  // Group exam sessions by test type
  const partialSessions = examSessions.filter(s => s.testType !== 'mock');
  const mockSessions = examSessions.filter(s => s.testType === 'mock');

  // Build Partial folder
  if (partialSubmissions.length > 0 || partialSessions.length > 0) {
    const partialNode: FileNode = {
      id: 'partial',
      name: `Partial Tests (${partialSubmissions.length})`,
      type: 'folder',
      children: buildSessionNodes(partialSubmissions, partialSessions, 'partial'),
      metadata: {
        testType: 'partial'
      }
    };
    tree.push(partialNode);
  }

  // Build Mock folder
  if (mockSubmissions.length > 0 || mockSessions.length > 0) {
    const mockNode: FileNode = {
      id: 'mock',
      name: `Mock Tests (${mockSubmissions.length})`,
      type: 'folder',
      children: buildSessionNodes(mockSubmissions, mockSessions, 'mock'),
      metadata: {
        testType: 'mock'
      }
    };
    tree.push(mockNode);
  }

  return tree;
}

/**
 * Build session nodes (exam codes) with their submissions
 */
function buildSessionNodes(
  submissions: ExamSubmission[],
  sessions: ExamSession[],
  testType: 'partial' | 'mock'
): FileNode[] {
  // Get unique exam codes from both submissions and sessions
  const examCodesFromSubmissions = [...new Set(submissions.map(s => s.examCode).filter(Boolean))] as string[];
  const examCodesFromSessions = sessions.map(s => s.examCode);
  const allExamCodes = [...new Set([...examCodesFromSubmissions, ...examCodesFromSessions])];

  // Sort exam codes (most recent first)
  allExamCodes.sort((a, b) => b.localeCompare(a));

  return allExamCodes.map(examCode => {
    const sessionSubmissions = submissions.filter(s => s.examCode === examCode);
    const session = sessions.find(s => s.examCode === examCode);

    return {
      id: `${testType}-${examCode}`,
      name: `${examCode} (${sessionSubmissions.length} submissions)`,
      type: 'folder' as const,
      extension: 'session',
      children: buildSubmissionNodes(sessionSubmissions, examCode),
      metadata: {
        examCode,
        testType,
        trackId: session?.trackId,
      }
    };
  });
}

/**
 * Check if a submission is fully marked
 */
function isSubmissionFullyMarked(submission: ExamSubmission): boolean {
  if (!submission.marks) return false;

  const totalQs = submission.totalQuestions || 40;

  // For writing tracks with task-based questions
  if (submission.trackType === 'writing' && totalQs === 2) {
    const taskKeys = ['task1', 'task2'];
    return taskKeys.every(key => submission.marks![key] !== null && submission.marks![key] !== undefined);
  }

  // For reading/listening tracks with numbered questions
  for (let i = 1; i <= totalQs; i++) {
    const mark = submission.marks[i];
    if (mark === null || mark === undefined) {
      return false;
    }
  }

  return true;
}

/**
 * Build submission nodes (individual student submissions)
 */
function buildSubmissionNodes(
  submissions: ExamSubmission[],
  examCode: string
): FileNode[] {
  // Sort submissions by time (most recent first)
  const sortedSubmissions = [...submissions].sort((a, b) =>
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return sortedSubmissions.map(submission => {
    const submittedDate = new Date(submission.submittedAt);
    const formattedDate = submittedDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const isFullyMarked = isSubmissionFullyMarked(submission);
    const isPublished = submission.resultPublished === true;

    return {
      id: submission.id,
      name: `${submission.studentName} - ${formattedDate}`,
      type: 'file' as const,
      extension: 'submission',
      metadata: {
        submissionId: submission.id,
        examCode: submission.examCode,
        trackId: submission.trackId,
        testType: submission.testType,
        studentName: submission.studentName,
        submittedAt: submission.submittedAt,
        status: isPublished ? 'published' : 'pending',
        isFullyMarked,
        isPublished
      }
    };
  });
}

/**
 * Get submission count for a specific test type
 */
export function getSubmissionCount(
  submissions: ExamSubmission[],
  testType: 'partial' | 'mock'
): number {
  if (testType === 'mock') {
    return submissions.filter(s => s.testType === 'mock').length;
  }
  return submissions.filter(s => s.testType !== 'mock').length;
}

/**
 * Get session count for a specific test type
 */
export function getSessionCount(
  sessions: ExamSession[],
  testType: 'partial' | 'mock'
): number {
  if (testType === 'mock') {
    return sessions.filter(s => s.testType === 'mock').length;
  }
  return sessions.filter(s => s.testType !== 'mock').length;
}

