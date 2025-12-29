// Writing Track: 9-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track9MWriting: Track = {
  id: 'track-9m-writing',
  name: '9-M Writing',
  shortName: '9-M',
  description: 'IELTS Academic Writing Test - Bar Chart Analysis (Task 1) and Online Meetings Essay (Task 2)',
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
          chartDescription: 'The bar shows the percentage of people going to cinemas in one European country on different days.',
          chartImageURL: 'https://i.postimg.cc/fW1yLBZ2/3BCC20E3-7316-43A5-8A17-3DC0E4B65BD3.png',
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
          prompt: `Research shows that business meetings, discussions and training are happening online nowadays.

Do the advantages outweigh the disadvantages?`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
