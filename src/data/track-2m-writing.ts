// Writing Track: 2-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track2MWriting: Track = {
  id: 'track-2m-writing',
  name: '2-M Writing',
  shortName: '2-M',
  description: 'IELTS Academic Writing Test - Chart Analysis (Task 1) and Problem-Solution Essay (Task 2)',
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
          chartDescription: 'The chart below gives information about car ownership in the UK from 1975 to 2005. (percentage)',
          chartImageURL: 'https://customer-assets.emergentagent.com/job_quick-preview-65/artifacts/ir2ek0px_2-M%20Reading.png',
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
          prompt: `Many business owners find that their staff lack sufficient interpersonal skills such as the ability to cooperate with their coworkers.

What are the causes?
Can you suggest some possible solutions?`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
