// SICU Track: 1-SICU (Specialized Integrated Class Unit)
// Track type: SICU - Can contain any combination of Listening, Reading, or Writing questions
import { Track } from './track1';

export const track1SICU: Track = {
  id: 'track-1-sicu',
  name: '1-SICU Integrated Skills Test',
  shortName: '1-SICU',
  description: 'SICU Practice Test - Mixed question types combining listening, reading, and writing skills',
  duration: 45,
  totalQuestions: 25,
  trackType: 'sicu',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Part 1: Listening Section',
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
          title: 'Conference Registration Form',
          rows: [
            {
              label: "Participant's name:",
              value: 'Sarah Mitchell'
            },
            {
              label: 'Email address:',
              value: {
                questionNumber: 1
              }
            },
            {
              label: 'Registration type:',
              value: {
                questionNumber: 2
              }
            },
            {
              label: 'Workshop preference:',
              value: {
                questionNumber: 3
              }
            },
            {
              label: 'Payment method:',
              value: {
                questionNumber: 4
              }
            },
            {
              label: 'Special requirements:',
              value: {
                questionNumber: 5
              }
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 6,
          question: 'What is the main topic of the conference?',
          options: [
            { label: 'Environmental sustainability', value: 'A' },
            { label: 'Digital transformation', value: 'B' },
            { label: 'Healthcare innovation', value: 'C' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 7,
          question: 'When does the keynote speech begin?',
          options: [
            { label: '9:00 AM', value: 'A' },
            { label: '10:30 AM', value: 'B' },
            { label: '2:00 PM', value: 'C' }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Part 2: Reading Section',
      passage: {
        title: 'The Future of Renewable Energy',
        content: `Renewable energy sources such as solar, wind, and hydroelectric power are becoming increasingly important in the global effort to reduce carbon emissions and combat climate change. Over the past decade, the cost of solar panels has decreased by more than 80%, making solar energy more accessible to both residential and commercial users.

Wind energy has also seen significant growth, with offshore wind farms becoming more efficient and cost-effective. These farms can generate substantial amounts of electricity without the land-use concerns associated with onshore installations. Experts predict that by 2030, renewable energy sources could account for more than 50% of global electricity generation.

However, challenges remain. Energy storage technology needs to improve to handle the intermittent nature of solar and wind power. Additionally, upgrading existing power grids to accommodate these new energy sources requires substantial investment. Governments worldwide are implementing policies to encourage renewable energy adoption, including tax incentives, subsidies, and renewable energy targets.

The transition to renewable energy is not just an environmental imperative but also an economic opportunity. The renewable energy sector has created millions of jobs globally, and this trend is expected to continue as technology advances and costs continue to fall.`
      },
      questions: [
        {
          type: 'true-false-not-given',
          instruction: 'Do the following statements agree with the information given in the passage?',
          statements: [
            {
              questionNumber: 8,
              statement: 'The cost of solar panels has reduced by over 80% in the last ten years.'
            },
            {
              questionNumber: 9,
              statement: 'Offshore wind farms use more land than onshore installations.'
            },
            {
              questionNumber: 10,
              statement: 'By 2030, renewable energy will provide exactly 50% of global electricity.'
            },
            {
              questionNumber: 11,
              statement: 'Energy storage technology is currently perfect for handling solar and wind power.'
            },
            {
              questionNumber: 12,
              statement: 'The renewable energy sector has generated employment opportunities worldwide.'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 13,
          question: 'According to the passage, what is a major challenge for renewable energy?',
          options: [
            { label: 'High cost of solar panels', value: 'A' },
            { label: 'Lack of government support', value: 'B' },
            { label: 'Need for improved energy storage', value: 'C' },
            { label: 'Shortage of skilled workers', value: 'D' }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          items: [
            {
              questionNumber: 14,
              text: 'Governments are using _______ to promote renewable energy adoption.'
            },
            {
              questionNumber: 15,
              text: 'The transition to renewable energy provides both environmental and _______ benefits.'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Part 3: Writing Section',
      questions: [
        {
          type: 'writing-task',
          taskNumber: 1,
          title: 'Writing Task',
          instruction: 'You should spend about 20 minutes on this task.',
          topicIntro: 'Write about the following topic:',
          prompt: `Some people believe that renewable energy is the only solution to climate change, while others think a combination of different approaches is necessary.

Discuss both views and give your own opinion.`,
          closingInstruction: `Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 200 words.`,
          minWords: 200,
          timeRecommended: 20
        }
      ]
    }
  ]
};
