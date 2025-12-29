// Writing Track: 7-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track7MWriting: Track = {
  id: 'track-7m-writing',
  name: '7-M Writing',
  shortName: '7-M',
  description: 'IELTS Academic Writing Test - Process Diagram Analysis (Task 1) and Sports Success Essay (Task 2)',
  duration: 60,
  totalQuestions: 2,
  trackType: 'writing',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Writing Task 1',
      questions: [
        {
          type: 'writing-task-with-image',
          taskNumber: 1,
          title: 'Writing Task 1',
          instruction: 'You should spend about 20 minutes on this task.',
          chartDescription: 'The diagram below shows how ethanol fuel is produced from corn.',
          chartImageURL: 'https://i.postimg.cc/Wp5c33vn/A6D790E2-1CCB-4002-AB38-A8B66E6B709E.png',
          prompt: `Summarize the information by selecting and reporting the main features, and make comparison where relevant.

Write at least 150 words.`,
          minWords: 150,
          timeRecommended: 20
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Writing Task 2',
      questions: [
        {
          type: 'writing-task',
          taskNumber: 2,
          title: 'Writing Task 2',
          instruction: 'You should spend about 40 minutes on this task.',
          topicIntro: 'Write about the following topic:',
          prompt: `Some people think that physical strength is important for success in sport, while other people think that mental strength is more important.

Discuss both views and give your own opinion.`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
