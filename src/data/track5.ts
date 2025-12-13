// Track 5: 1-M Listening
import { Track } from './track1';

export const track5: Track = {
  id: 'track-5',
  name: '1-M Listening',
  shortName: '1M',
  description: 'IELTS Listening Practice Test - Advanced listening comprehension',
  duration: 60,
  totalQuestions: 40,
  trackType: 'listening',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'Section 1',
      questions: [
        {
          type: 'table-gap',
          instruction: 'Write NO MORE THAN TWO WORDS OR A NUMBER for each answer.',
          title: 'Client Details',
          rows: [
            {
              label: 'Name:',
              value: 'Andrew Peterson'
            },
            {
              label: 'Educational Qualification:',
              value: {
                questionNumber: 1
              }
            },
            {
              label: 'Previous Job:',
              value: {
                questionNumber: 2
              }
            },
            {
              label: 'Hobbies:',
              value: {
                questionNumber: 3
              }
            },
            {
              label: 'Main Skills:',
              value: {
                questionNumber: 4
              }
            },
            {
              label: 'Expected Salary ($):',
              value: {
                questionNumber: 5
              }
            },
            {
              label: 'Can start:',
              value: {
                questionNumber: 6
              }
            },
            {
              label: 'Other languages:',
              value: {
                questionNumber: 7
              }
            }
          ]
        },
        {
          type: 'multiple-choice-multi-select',
          instruction: 'Choose THREE letters from the list, A-G.',
          question: 'Which THREE qualities do employers most value in their staff?',
          questionNumbers: [8, 9, 10],
          maxSelections: 3,
          options: [
            {
              label: 'Problem-solving skills',
              value: 'A'
            },
            {
              label: 'Diligence',
              value: 'B'
            },
            {
              label: 'Experience',
              value: 'C'
            },
            {
              label: 'Flexible hours',
              value: 'D'
            },
            {
              label: 'Independent thinking',
              value: 'E'
            },
            {
              label: 'Good personality',
              value: 'F'
            },
            {
              label: 'Qualifications',
              value: 'G'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Section 2',
      questions: [
        {
          type: 'sentence-completion',
          instruction: 'Write ONE WORD ONLY for each answer.',
          items: [
            {
              questionNumber: 11,
              text: 'What does the center provide first?'
            },
            {
              questionNumber: 12,
              text: 'What is important to control?'
            },
            {
              questionNumber: 13,
              text: 'What will be used to assess a member\'s fitness level?'
            },
            {
              questionNumber: 14,
              text: 'How often is the exercise schedule reviewed?'
            },
            {
              questionNumber: 15,
              text: 'How many exercise programs are available?'
            }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Which place is best for?',
          items: [
            {
              questionNumber: 16,
              label: 'developing confidence?'
            },
            {
              questionNumber: 17,
              label: 'Reducing stress?'
            },
            {
              questionNumber: 18,
              label: 'building fitness?'
            },
            {
              questionNumber: 19,
              label: 'meeting others?'
            },
            {
              questionNumber: 20,
              label: 'finding information?'
            }
          ],
          options: [
            {
              label: 'Jogging machines',
              value: 'A'
            },
            {
              label: 'Yoga studio',
              value: 'B'
            },
            {
              label: 'Weight units',
              value: 'C'
            },
            {
              label: 'Front-desk area',
              value: 'D'
            },
            {
              label: 'Squash courts',
              value: 'E'
            },
            {
              label: 'Shower blocks',
              value: 'F'
            },
            {
              label: 'Swimming pool',
              value: 'G'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Section 3',
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 21,
          question: 'The position needs someone good at',
          options: [
            {
              label: 'Computers.',
              value: 'A'
            },
            {
              label: 'Dealing with people.',
              value: 'B'
            },
            {
              label: 'Arts.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 22,
          question: 'The directors will select someone from the faculty of',
          options: [
            {
              label: 'Arts.',
              value: 'A'
            },
            {
              label: 'Computing.',
              value: 'B'
            },
            {
              label: 'Business.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 23,
          question: 'The position will require the person to',
          options: [
            {
              label: 'Work long hours.',
              value: 'A'
            },
            {
              label: 'Train others.',
              value: 'B'
            },
            {
              label: 'Do weekend work.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'The position will come with a',
          options: [
            {
              label: 'Car.',
              value: 'A'
            },
            {
              label: 'Parking space.',
              value: 'B'
            },
            {
              label: 'Much better salary.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'The best aspect of the job is it',
          options: [
            {
              label: 'Gives more responsibility.',
              value: 'A'
            },
            {
              label: 'Comes with a private office.',
              value: 'B'
            },
            {
              label: 'Is a step to higher positions.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multi-column-table',
          instruction: 'Write NO MORE THAN TWO WORDS OR A NUMBER for each answer.',
          title: 'Candidates',
          headers: ['', 'Steven', 'Abdul', 'Lek', 'Oscar'],
          rows: [
            {
              cells: [
                { content: 'Years of Experience' },
                { content: { questionNumber: 26 } },
                { content: '7' },
                { content: '8' },
                { content: '12' }
              ]
            },
            {
              cells: [
                { content: 'Qualification' },
                { content: 'MBA' },
                { content: { questionNumber: 27 } },
                { content: 'degree' },
                { content: 'Certificates' }
              ]
            },
            {
              cells: [
                { content: 'Possible Concerns' },
                { content: { questionNumber: 28 } },
                { content: 'limited English' },
                { content: { questionNumber: 29 } },
                { content: { questionNumber: 30 } }
              ]
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: 'Section 4',
      questions: [
        {
          type: 'multiple-choice',
          questionNumber: 31,
          question: 'Caves are',
          options: [
            {
              label: 'Often ignored.',
              value: 'A'
            },
            {
              label: 'Mostly in remote areas.',
              value: 'B'
            },
            {
              label: 'Often difficult to explore.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 32,
          question: 'People who explore caves',
          options: [
            {
              label: 'Mostly need to know about cartography',
              value: 'A'
            },
            {
              label: 'Enjoy overcoming the difficulties.',
              value: 'B'
            },
            {
              label: 'Usually know about cave sciences.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 33,
          question: 'China has',
          options: [
            {
              label: 'Probably the most undiscovered caves.',
              value: 'A'
            },
            {
              label: 'A growing number of cave explorers.',
              value: 'B'
            },
            {
              label: 'Some of the best documented caves.',
              value: 'C'
            }
          ]
        },
        {
          type: 'multi-column-table',
          instruction: 'Write NO MORE THAN TWO WORDS OR A NUMBER for each answer.',
          title: 'Three Main Reasons for Cave Formation',
          headers: ['Dissolution', 'Volcanic Lava Tubes', 'Action of Waves'],
          rows: [
            {
              cells: [
                { content: 'mainly involves ' },
                { content: 'topmost surface cools down and ' },
                { content: 'waves pound in to cliffs then erode into ' }
              ]
            },
            {
              cells: [
                { content: { questionNumber: 34 } },
                { content: { questionNumber: 35 } },
                { content: { questionNumber: 36 } }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: 'hotter lava continue to flow beneath' },
                { content: 'or less rigid rocks.' }
              ]
            },
            {
              cells: [
                { content: 'Limestone caves' },
                { content: 'often have formations made of ' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: { questionNumber: 37 } },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: 'carbonate' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: 'e.g. stalactites, stalagmites, and ' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: { questionNumber: 38 } },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: 'e.g. Lechuguilla' },
                { content: 'finally revealed in ' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: { questionNumber: 39 } },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: 'interestingly, formed from the ' },
                { content: '' }
              ]
            },
            {
              cells: [
                { content: '' },
                { content: { questionNumber: 40 } },
                { content: '' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
