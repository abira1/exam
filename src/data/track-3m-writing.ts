// Writing Track: 3-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track3MWriting: Track = {
  id: 'track-3m-writing',
  name: '3-M Writing',
  shortName: '3-M',
  description: 'IELTS Academic Writing Test - Table Analysis (Task 1) and Opinion Essay (Task 2)',
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
          chartDescription: 'The table below shows the salaries of secondary/high school teachers in 2009.',
          chartImageURL: 'https://customer-assets.emergentagent.com/job_quick-preview-65/artifacts/hqbn5fsn_3-M%20Reading.png',
          prompt: `Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

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
          prompt: `Many developing countries are currently expanding their tourism industries.

Why is this the case?
Is it a positive development?`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
