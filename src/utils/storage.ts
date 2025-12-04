export interface ExamSubmission {
  id: string;
  studentId: string;
  studentName: string;
  trackName: string;
  answers: Record<number, string>;
  submittedAt: string;
  timeSpent: string;
  status: 'completed';
  score?: number;
  marks?: Record<number, 'correct' | 'incorrect' | null>;
  manualScore?: number;
  resultPublished?: boolean;
  publishedAt?: string;
  markedBy?: string;
}
export const storage = {
  getSubmissions(): ExamSubmission[] {
    const data = localStorage.getItem('examSubmissions');
    return data ? JSON.parse(data) : [];
  },
  addSubmission(submission: ExamSubmission): void {
    const submissions = this.getSubmissions();
    submissions.push(submission);
    localStorage.setItem('examSubmissions', JSON.stringify(submissions));
  },
  getCurrentStudentId(): string | null {
    return localStorage.getItem('currentStudentId');
  },
  setCurrentStudentId(id: string): void {
    localStorage.setItem('currentStudentId', id);
  },
  getCurrentStudentName(): string | null {
    return localStorage.getItem('currentStudentName');
  },
  setCurrentStudentName(name: string): void {
    localStorage.setItem('currentStudentName', name);
  },
  clearCurrentStudent(): void {
    localStorage.removeItem('currentStudentId');
    localStorage.removeItem('currentStudentName');
  },
  calculateScore(answers: Record<number, string>): number {
    const answeredCount = Object.keys(answers).filter(key => answers[Number(key)].trim() !== '').length;
    return Math.round(answeredCount / 40 * 100);
  }
};