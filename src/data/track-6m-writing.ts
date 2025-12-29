// Writing Track: 6-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track6MWriting: Track = {
  id: 'track-6m-writing',
  name: '6-M Writing',
  shortName: '6-M',
  description: 'IELTS Academic Writing Test - Pie Chart Analysis (Task 1) and Building Design Essay (Task 2)',
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
          chartDescription: 'The pie charts below show the average household expenditures in a country between 1950 and 2010.',
          chartImageURL: 'https://ieltsfever.org/wp-content/uploads/2023/02/The-pie-charts-below-show-the-average-household-expenditures-in-a-country-between-1950-and-2010.jpg',
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
          prompt: `In many cities, there is little control on the design and construction of new houses, so people can choose to build houses in their own styles instead of building them with the same style as the old houses in the local area.

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
