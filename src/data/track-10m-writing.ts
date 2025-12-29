// Writing Track: 10-M Writing
// Track type: Writing with image-based Task 1 and essay-based Task 2
import { Track } from './track1';

export const track10MWriting: Track = {
  id: 'track-10m-writing',
  name: '10-M Writing',
  shortName: '10-M',
  description: 'IELTS Academic Writing Test - Line Graph Analysis (Task 1) and Wildlife Protection Essay (Task 2)',
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
          chartDescription: 'The line graph below gives information about the percentage of women aged 15-64 in employment between 2003 and 2009.',
          chartImageURL: 'https://i.postimg.cc/4yjYR14L/E61E6C7D-8B80-492A-BF24-F4EB954F29DA.png',
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
          prompt: `Some people think that a huge amount of time and money is spent on the protection of wild animals, and that this money could be better spent on the human population.

To what extent do you agree or disagree with this opinion?`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
          minWords: 250,
          timeRecommended: 40
        }
      ]
    }
  ]
};
