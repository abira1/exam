// Writing Track: 1-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track1MWriting: Track = {
  id: 'track-1m-writing',
  name: '1-M Writing',
  shortName: '1-M',
  description: 'IELTS Academic Writing Test - Chart Analysis (Task 1) and Opinion Essay (Task 2)',
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
          chartDescription: 'The chart shows the employment status of adults in the US in 2003 and 2013.',
          chartImageURL: 'https://customer-assets.emergentagent.com/job_preview-demo-13/artifacts/e7pt9uzd_52538774455.png',
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
          prompt: `The best way to reduce poverty in developing countries is by giving up to six years of free education, so that people can at least read, write and use numbers.

To what extent do you agree or disagree?`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
