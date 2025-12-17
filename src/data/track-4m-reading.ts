// Track: 4-M Reading
import { Track } from './track1';

export const track4MReading: Track = {
  id: 'track-4m-reading',
  name: '4-M Reading',
  shortName: '4MR',
  description: 'IELTS Reading Practice Test - Academic Reading with 3 parts and 40 questions',
  duration: 60,
  totalQuestions: 40,
  trackType: 'reading',
  audioURL: null,
  sections: [
    {
      sectionNumber: 1,
      title: 'READING PASSAGE 1',
      passage: {
        title: 'Bamboo, A Wonder Plant',
        content: `You should spend about 20 minutes on Questions 1-13 which are based on Reading Passage 1 below.

The wonder plant with an uncertain future: more than a billion people rely on bamboo for either their shelter or income, while many endangered species depend on it for their survival. Despite its apparent abundance, a new report says that species of bamboo may be under serious threat.

Section A

Every year, during the rainy season, the mountain gorillas of Central Africa migrate to the foothills and lower slopes of the Virunga Mountains to graze on bamboo. For the 650 or so that remain in the wild, it's a vital food source. Although they eat almost 150 types of plant, as well as various insects and other invertebrates, at this time of year bamboo accounts for up to 90 per cent of their diet. Without it, says Ian Redmond, chairman of the Ape Alliance, their chances of survival would be reduced significantly. Gorillas aren't the only locals keen on bamboo. For the people who live close to the Virungas, it's a valuable and versatile raw material used for building houses and making household items such as mats and baskets. But in the past 100 years or so, resources have come under increasing pressure as populations have exploded and large areas of bamboo forest have been cleared to make way for farms and commercial plantations.

Section B

Sadly, this isn't an isolated story. All over the world, the ranges of many bamboo species appear to be shrinking, endangering the people and animals that depend upon them. But despite bamboo's importance, we know surprisingly little about it. A recent report published by the UN Environment Programme (UNEP) and the International Network for Bamboo and Rattan (INBAR) has revealed just how profound is our ignorance of global bamboo resources, particularly in relation to conservation. There are almost 1,600 recognised species of bamboo, but the report concentrated on the 1,200 or so woody varieties distinguished by the strong stems, or culms, that most people associate with this versatile plant. Of these, only 38 'priority species' identified for their commercial value have been the subject of any real scientific research, and this has focused mostly on matters relating to their viability as a commodity. This problem isn't confined to bamboo. Compared to the work carried out on animals, the science of assessing the conservation status of plants is still in its infancy. "People have only started looking hard at this during the past 10-15 years, and only now are they getting a handle on how to go about it systematically," says Dr Valerie Kapos, one of the report's authors and a senior adviser in forest ecology and conservation to the UNEP.

Section C

Bamboo is a type of grass. It comes in a wide variety of forms, ranging in height from 30 centimetres to more than 40 metres. It is also the world's fastest-growing woody plant: some species can grow more than a metre in a day. Bamboo's ecological role extends beyond providing food and habitat for animals. Bamboo tends to grow in stands made up of groups of individual plants that grow from root systems known as rhizomes. Its extensive rhizome systems, which tie in the top layers of the soil, are crucial in preventing soil erosion. And there is growing evidence that bamboo plays an important part in determining forest structure and dynamics. "Bamboo's pattern of mass flowering and mass death leaves behind large areas of dry biomass that attract wildfire," says Kapos. "When these burn, they create patches of open ground within the forest far bigger than would be left by a fallen tree." Patchiness helps to preserve diversity because certain plant species do better during the early stages of regeneration when there are gaps in the canopy.

Section D

However, bamboo's most immediate significance lies in its economic value. Modern processing techniques mean that it can be used in a variety of ways, for example, as flooring and laminates. One of the fastest-growing bamboo products is paper – 25 per cent of paper produced in India is made from bamboo fiber, and in Brazil, 100,000 hectares of bamboo is grown for its production.

Of course, bamboo's main function has always been in domestic applications, and as a locally traded commodity, it's worth about US$4.5 billion annually. Because of its versatility, flexibility and strength (its tensile strength compares to that of some steel), it has traditionally been used in construction. Today, more than one billion people worldwide live in bamboo houses. Bamboo is often the only readily available raw material for people in many developing countries, says Chris Stapleton, a research associate at the Royal Botanic Gardens. "Bamboo can be harvested from forest areas or grown quickly elsewhere, and then converted simply without expensive machinery or facilities," he says. "In this way, it contributes substantially to poverty alleviation and wealth creation."

Section E

Given bamboo's value in economic and ecological terms, the picture painted by the UNEP report is all the more worrying. But keen horticulturists will spot an apparent contradiction here. Those who've followed the recent vogue for cultivating exotic species in their gardens will point out that if it isn't kept in check, bamboo can cause real problems. "In a lot of places, the people who live with bamboo don't perceive it as being endangered in any way," says Kapos. "In fact, a lot of bamboo species are actually very invasive if they've been introduced." So why are so many species endangered? There are two separate issues here, says Ray Townsend, vice president of the British Bamboo Society and arboretum manager at the Royal Botanic Gardens. "Some plants are threatened because they can't survive in the habitat – they aren't strong enough or there aren't enough of them, perhaps. But bamboo can take care of itself – it is strong enough to survive if left alone. What is under threat is its habitat." It is the physical disturbance that is the threat to bamboo, says Kapos. "When forest goes, it is converted into something else: there isn't anywhere for forest plants such as bamboo to grow if you create a cattle pasture."

Section F

Around the world, bamboo species are routinely protected as part of forest eco-systems in national parks and reserves, but there is next to nothing that protects bamboo in the wild for its own sake. However, some small steps are being taken to address this situation. The UNEP-INBAR report will help conservationists to establish effective measures aimed at protecting valuable wild bamboo species. Townsend, too, sees the UNEP report as an important step forward in promoting the cause of bamboo conservation. "Until now, bamboo has been perceived as a second-class plant. When you talk about places such as the Amazon, everyone always thinks about the hardwoods. Of course, these are significant, but there is a tendency to overlook the plants they are associated with, which are often bamboo species. In many ways, it is the most important plant known to man. I can't think of another plant that is used so much and is so commercially important in so many countries." He believes that the most important first step is to get scientists into the field. "We need to go out there, look at these plants and see how they survive and then use that information to conserve them for the future."`
      },
      questions: [
        {
          type: 'table-selection',
          instruction: 'Reading Passage 1 has six sections A-F. Which section contains the following information? Select the correct letter A-F by marking the checkbox in the appropriate column for each question below. NB You may use any letter more than once.',
          headers: ['A', 'B', 'C', 'D', 'E', 'F'],
          rows: [
            {
              questionNumber: 1,
              label: 'The limited extent of existing research'
            },
            {
              questionNumber: 2,
              label: 'Comparison of bamboo with other plant species'
            },
            {
              questionNumber: 3,
              label: 'Commercial application of bamboo'
            },
            {
              questionNumber: 4,
              label: 'Example of an animal which relies on bamboos for survival'
            },
            {
              questionNumber: 5,
              label: 'The human activity that damaged large areas of bamboo'
            },
            {
              questionNumber: 6,
              label: 'The approaches used to study bamboo'
            },
            {
              questionNumber: 7,
              label: 'Bamboo helps the survival of a range of plants'
            }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Use the information in the passage to match the people (listed A-D) with opinions or deeds below by dragging the person\'s name into the appropriate box. NB You may use any letter more than once.',
          items: [
            {
              questionNumber: 8,
              label: 'Destroying bamboo jeopardizes wildlife.'
            },
            {
              questionNumber: 9,
              label: 'People have very confined knowledge of bamboo.'
            },
            {
              questionNumber: 10,
              label: 'Some people do not think that bamboo is endangered.'
            },
            {
              questionNumber: 11,
              label: 'Bamboo has loads of commercial potentials.'
            }
          ],
          options: [
            { label: 'Ian Redmond', value: 'A' },
            { label: 'Valerie Kapos', value: 'B' },
            { label: 'Ray Townsend', value: 'C' },
            { label: 'Chris Stapleton', value: 'D' }
          ]
        },
        {
          type: 'sentence-completion',
          instruction: 'Answer the questions below using NO MORE THAN TWO WORDS from the passage for each answer.',
          items: [
            {
              questionNumber: 12,
              text: 'What problem does the bamboo\'s root system prevent?'
            },
            {
              questionNumber: 13,
              text: 'Which bamboo product is experiencing market expansion?'
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'READING PASSAGE 2',
      passage: {
        title: 'Activities for Children',
        content: `You should spend about 20 minutes on Questions 14-26 which are based on Reading Passage 2 below.

A

Twenty-five years ago, children in London walked to school and played in parks and playing fields after school and at the weekend. Today they are usually driven to school by parents anxious about safety and spend hours glued to television screens or computer games. Meanwhile, community playing fields are being sold off to property developers at an alarming rate. 'This change in lifestyle has, sadly, meant greater restrictions on children,' says Neil Armstrong, Professor of Health and Exercise Sciences at the University of Exeter. 'If children continue to be this inactive, they'll be storing up big problems for the future.'

B

In 1985, Professor Armstrong headed a five-year research project into children's fitness. The results, published in 1990, were alarming. The survey, which monitored 700 11-16-year-olds, found that 48 per cent of girls and 41 per cent of boys already exceeded safe cholesterol levels set for children by the American Heart Foundation. Armstrong adds, "heart is a muscle and needs exercise, or it loses its strength." It also found that 13 per cent of boys and 10 per cent of girls were overweight. More disturbingly, the survey found that over a four-day period, half the girls and one-third of the boys did less exercise than the equivalent of a brisk 10-minute walk. High levels of cholesterol, excess body fat and inactivity are believed to increase the risk of coronary heart disease.

C

Physical education is under pressure in the UK – most schools devote little more than 100 minutes a week to it in curriculum time, which is less than many other European countries. Three European countries are giving children a head start in PE: France, Austria and Switzerland – offer at least two hours in primary and secondary schools. These findings, from the European Union of Physical Education Associations, prompted specialists in children's physiology to call on European governments to give youngsters a daily PE programme. The survey shows that the UK ranks 13th out of the 25 countries, with Ireland's bottom, averaging under an hour a week for PE. From age six to 18, British children received, on average, 106 minutes of PE a week. Professor Armstrong, who presented the findings at the meeting, noted that since the introduction of the national curriculum there had been a marked fall in the time devoted to PE in UK schools, with only a minority of pupils getting two hours a week.

D

As a former junior football international, Professor Armstrong is a passionate advocate for the sport. Although the Government has poured millions into beefing up the sport in the community, there is less commitment to it as part of the crammed school curriculum. This means that many children never acquire the necessary skills to thrive in team games. If they are no good at them, they lose interest and establish an inactive pattern of behaviour. When this is coupled with a poor diet, it will lead inevitably to weight gain. Seventy per cent of British children give up all sport when they leave school, compared with only 20 per cent of French teenagers. Professor Armstrong believes that there is far too great an emphasis on team games at school. "We need to look at the time devoted to PE and balance it between individual and pair activities, such as aerobics and badminton, as well as team sports." He added that children need to have the opportunity to take part in a wide variety of individual, partner and team sports.

E

The good news, however, is that a few small companies and children's activity groups have reacted positively and creatively to the problem. 'Take That, shouts Gloria Thomas, striking a disco pose astride her mini-space hopper. 'Take That, echo a flock of toddlers, adopting outrageous postures astride their space hoppers. 'Michael Jackson, she shouts, and they all do a spoof fan-crazed shriek. During the wild and chaotic hopper race across the studio floor, commands like this are issued and responded to with untrammeled glee. The sight of 15 bouncing seven-year-olds who seem about to launch into orbit at every bounce brings tears to the eyes. Uncoordinated, loud, excited and emotional, children provide raw comedy.

F

Any cardiovascular exercise is a good option, and it doesn't necessarily have to be high intensity. It can be anything that gets your heart rate up: such as walking the dog, swimming, running, skipping, hiking. "Even walking through the grocery store can be exercise," Samis-Smith said. What they don't know is that they're at a Fit Kids class and that the fun is a disguise for the serious exercise plan they're covertly being taken through. Fit Kids trains parents to run fitness classes for children. 'Ninety per cent of children don't like team sports,' says company director, Gillian Gale.

G

A Prevention survey found that children whose parents keep in shape are much more likely to have healthy body weights themselves. "There's nothing worse than telling a child what he needs to do and not doing it yourself," says Elizabeth Ward, R.D., a Boston nutritional consultant and author of Healthy Foods, Healthy Kids. "Set a good example and get your nutritional house in order first." In the 1930s and '40s, kids expended 800 calories a day just walking, carrying water, and doing other chores, notes Fima Lifshitz, M.D., a pediatric endocrinologist in Santa Barbara. "Now, kids in obese families are expending only 200 calories a day in physical activity," says Lifshitz, "incorporate more movement in your family's life – park farther away from the stores at the mall, take stairs instead of the elevator, and walk to nearby friends' houses instead of driving."`
      },
      questions: [
        {
          type: 'table-selection',
          instruction: 'The Reading Passage has seven paragraphs A-G. Which paragraph contains the following information? Select the correct letter A-G by marking the checkbox in the appropriate column for each question below.',
          headers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          rows: [
            {
              questionNumber: 14,
              label: 'Health and living condition of children'
            },
            {
              questionNumber: 15,
              label: 'Health organization monitored physical activity'
            },
            {
              questionNumber: 16,
              label: 'Comparison of exercise time between the UK and other countries'
            },
            {
              questionNumber: 17,
              label: 'Wrong approach for school activity'
            }
          ]
        },
        {
          type: 'true-false-not-given',
          instruction: 'Do the following statements agree with the information given in Reading Passage 2? Write TRUE if the statement is true, FALSE if the statement is false, NOT GIVEN if the information is not given in the passage.',
          statements: [
            {
              questionNumber: 18,
              statement: 'According to the American Heart Foundation, cholesterol levels of boys are higher than girls\'.'
            },
            {
              questionNumber: 19,
              statement: 'British children generally do less exercise than some other European countries.'
            },
            {
              questionNumber: 20,
              statement: 'Skipping becomes more and more popular in schools in the UK.'
            },
            {
              questionNumber: 21,
              statement: 'According to Healthy Kids, the first task is for parents to encourage their children to keep the same healthy body weight.'
            }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 22,
          question: 'According to paragraph A, what does Professor Neil Armstrong concern about?',
          options: [
            { label: 'Spending more time on TV affects the academic level', value: 'A' },
            { label: 'Parents have less time to stay with their children', value: 'B' },
            { label: 'Future health of British children', value: 'C' },
            { label: 'Increasing speed of property\'s development', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 23,
          question: 'What does Armstrong indicate in Paragraph B?',
          options: [
            { label: 'We need to take a 10-minute walk every day', value: 'A' },
            { label: 'We should do more activity to exercise heart', value: 'B' },
            { label: 'Girls\' situation is better than boys', value: 'C' },
            { label: 'Exercise can cure many diseases', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 24,
          question: 'What is the aim of Fit Kids\' training?',
          options: [
            { label: 'Make profit by running several sessions', value: 'A' },
            { label: 'Only concentrate on one activity for each child', value: 'B' },
            { label: 'To guide parents on how to organize activities for children', value: 'C' },
            { label: 'Spread the idea that team sport is better', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 25,
          question: 'What did Lifshitz suggest at the end of this passage?',
          options: [
            { label: 'Create opportunities to exercise your body', value: 'A' },
            { label: 'Taking elevator saves your time', value: 'B' },
            { label: 'Kids should spend more than 200 calories each day', value: 'C' },
            { label: 'We should never drive but walk', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 26,
          question: 'What is the main idea of this passage?',
          options: [
            { label: 'Health of the children who are overweight is at risk in the future', value: 'A' },
            { label: 'Children in the UK need proper exercises', value: 'B' },
            { label: 'Government mistaken approach for children', value: 'C' },
            { label: 'Parents play the most important role in children\'s activity', value: 'D' }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'READING PASSAGE 3',
      passage: {
        title: 'Save Endangered Language',
        content: `You should spend about 20 minutes on Questions 27-40 which are based on Reading Passage 3 below.

"Obviously we must do some serious rethinking of our priorities, lest linguistics go down in history as the only science that presided obviously over the disappearance of 90 percent of the very field to which it is dedicated." – Michael Krauss, "The World's Languages in Crisis".

A

Ten years ago Michael Krauss sent a shudder through the discipline of linguistics with his prediction that half the 6,000 or so languages spoken in the world would cease to be uttered within a century. Unless scientists and community leaders directed a worldwide effort to stabilize the decline of local languages, he warned, nine-tenths of the linguistic diversity of humankind would probably be doomed to extinction. Krauss's prediction was little more than an educated guess, but other respected linguists had been clanging out similar alarms. Kenneth L. Hale of the Massachusetts Institute of Technology noted in the same journal issue that eight languages on which he had done fieldwork had since passed into extinction. A 1990 survey in Australia found that 70 of the 90 surviving Aboriginal languages were no longer used regularly by all age groups. The same was true for all but 20 of the 175 Native American languages spoken or remembered in the US. Krauss told a congressional panel in 1992.

B

Many experts in the field mourn the loss of rare languages, for several reasons. To start, there is scientific self-interest: some of the most basic questions in linguistics have to do with the limits of human speech, which are far from fully explored. Many researchers would like to know which structural elements of grammar and vocabulary – if any – are truly universal and probably, therefore, hardwired into the human brain. Other scientists try to reconstruct ancient migration patterns by comparing borrowed words that appear in otherwise unrelated languages. In each of these cases, the wider the portfolio of languages you study, the more likely you are to get the right answers.

C

Despite the near-constant buzz in linguistics about endangered languages over the past 10 years, the field has accomplished depressingly little. "You would think that there would be some organized response to this dire situation," some attempt to determine which language can be saved and which should be documented before they disappear, says Sarah G. Thomason, a linguist at the University of Michigan at Ann Arbor. "But there isn't any such effort organized in the profession. It is only recently that it has become fashionable enough to work on endangered languages." Six years ago, recalls Douglas H. Whalen of Yale University, "when I asked linguists who were raising money to deal with these problems, I mostly got blank stares." So Whalen and a few other linguists founded the Endangered Languages Fund. In the five years to 2001, they were able to collect only $80,000 for research grants. A similar foundation in England, directed by Nicholas Ostler, has raised just $8,000 since 1995.

D

But there are encouraging signs that the field has turned a corner. The Volkswagen Foundation, a German charity, just issued its second round of grants totaling more than $2 million. It has created a multimedia archive at the Max Planck Institute for Psycholinguistics in the Netherlands that can house recordings, grammars, dictionaries and other data on endangered languages. To fill the archive, the foundation has dispatched field linguists to document Aweti (100 or so speakers in Brazil), Ega (about 300 speakers in Ivory Coast), Waima'a (a few hundred speakers in East Timor), and a dozen or so other languages unlikely to survive the century. The Ford Foundation has also edged into the arena. Its contributions helped to reinvigorate a master-apprentice program created in 1992 by Leanne Hinton of Berkeley and Native Americans worried about the imminent demise of about 50 indigenous languages in California. Fluent speakers receive $3,000 to teach a younger relative (who is also paid) their native tongue through 360 hours of shared activities, spread over six months. So far about 5 teams have completed the program, Hinton says, transmitting at least some knowledge of 25 languages. "It's too early to call this language revitalization," Hinton admits. "In California, the death rate of elderly speakers will always be greater than the recruitment rate of young speakers. But at least we prolong the survival of the language." That will give linguists more time to record these tongues before they vanish.

E

But the master-apprentice approach hasn't caught on outside the U.S., and Hinton's effort is a drop in the sea. At least 440 languages have been reduced to a mere handful of elders, according to the Ethnologue, a catalogue of languages produced by the Dallas-based group SIL International that comes closest to global coverage. For the vast majority of these languages, there is little or no record of their grammar, vocabulary, pronunciation or use in daily life. Even if a language has been fully documented, all that remains once it vanishes from active use is a fossil skeleton, a scattering of features that the scientist was lucky and astute enough to capture. Linguists may be able to sketch an outline of the forgotten language and fix its place on the evolutionary tree, but little more. "How did people start conversations and talk to babies? How did husbands and wives converse?" Hinton asks. "Those are the first things you want to learn when you want to revitalize the language."

F

But there is as yet no discipline of "conservation linguistics," as there is for biology. Almost every strategy tried so far has succeeded in some places but failed in others, and there seems to be no way to predict with certainty what will work where. Twenty years ago in New Zealand, Maori speakers set up "language nests," in which preschoolers were immersed in the native language. Additional Maori-only classes were added as the children progressed through elementary and secondary school. A similar approach was tried in Hawaii, with some success – the number of native speakers has stabilized at 1,000 or so, reports Joseph E. Grimes of SIL International, who is working on Oahu. Students can now get instruction in Hawaiian all the way through university.

G

One factor that always seems to occur in the demise of a language is that the speakers begin to have collective doubts about the usefulness of language loyalty. Once they start regarding their own language as inferior to the majority language, people stop using it in all situations. Kids pick up on the attitude and prefer the dominant language. In many cases, people don't notice until they suddenly realize that their kids never speak the language, even at home. This is how Cornish and some dialects of Scottish Gaelic died; it is still only rarely used for daily home life in Ireland, 80 years after the republic was founded with Irish as its first official language.

H

Linguists agree that ultimately, the answer to the problem of language extinction is multilingualism. Even uneducated people can learn several languages, as long as they start as children. Indeed, most people in the world speak more than one tongue, and in places such as Cameroon (279 languages), Papua New Guinea (823) and India (387) it is common to speak three or four distinct languages and a dialect or two as well. Most Americans and Canadians, to the west of Quebec, have a gut reaction that anyone speaking another language in front of them is committing an immoral act. You get the same reaction in Australia and Russia. It is no coincidence that these are the areas where languages are disappearing the fastest. The first step in saving dying languages is to persuade the world's majorities to allow the minorities among them to speak with their own voices.`
      },
      questions: [
        {
          type: 'matching-headings',
          instruction: 'The reading passage has eight paragraphs, A-H. Choose the correct heading for each paragraph from the list below by dragging the heading number into the appropriate box.',
          paragraphs: [
            {
              questionNumber: 27,
              paragraphLabel: 'Paragraph A',
              content: 'Section A'
            },
            {
              questionNumber: 28,
              paragraphLabel: 'Paragraph B',
              content: 'Section B'
            },
            {
              questionNumber: 29,
              paragraphLabel: 'Paragraph D',
              content: 'Section D'
            },
            {
              questionNumber: 30,
              paragraphLabel: 'Paragraph E',
              content: 'Section E'
            },
            {
              questionNumber: 31,
              paragraphLabel: 'Paragraph F',
              content: 'Section F'
            },
            {
              questionNumber: 32,
              paragraphLabel: 'Paragraph G',
              content: 'Section G'
            },
            {
              questionNumber: 33,
              paragraphLabel: 'Paragraph H',
              content: 'Section H'
            }
          ],
          headings: [
            { label: 'i. Data consistency needed for language', value: 'i' },
            { label: 'ii. Consensus on an initial recommendation for saving dying out languages', value: 'ii' },
            { label: 'iii. Positive gains for protection', value: 'iii' },
            { label: 'iv. Minimum requirement for saving a language', value: 'iv' },
            { label: 'v. Potential threat to minority language', value: 'v' },
            { label: 'vi. A period when there was absent of real effort made', value: 'vi' },
            { label: 'vii. Native language programs launched', value: 'vii' },
            { label: 'viii. Lack of confidence in young speakers as a negative factor', value: 'viii' },
            { label: 'ix. Practice in several developing countries', value: 'ix' },
            { label: 'x. Value of minority language to linguists', value: 'x' },
            { label: 'xi. Government participation in the language field', value: 'xi' }
          ]
        },
        {
          type: 'drag-and-drop',
          instruction: 'Use the information in the passage to match the people (listed A-F) with opinions or deeds below by dragging the person\'s name into the appropriate box. NB You may use any letter more than once.',
          items: [
            {
              questionNumber: 34,
              label: 'Reported language conservation practice in Hawaii'
            },
            {
              questionNumber: 35,
              label: 'Predicted that many languages would disappear soon'
            },
            {
              questionNumber: 36,
              label: 'The experienced process that languages die out personally'
            },
            {
              questionNumber: 37,
              label: 'Raised language fund in England'
            },
            {
              questionNumber: 38,
              label: 'Not enough effort on saving until recent work'
            }
          ],
          options: [
            { label: 'Nicholas Ostler', value: 'A' },
            { label: 'Michael Krauss', value: 'B' },
            { label: 'Joseph E. Grimes', value: 'C' },
            { label: 'Sarah G. Thomason', value: 'D' },
            { label: 'Kenneth L. Hale', value: 'E' },
            { label: 'Douglas H. Whalen', value: 'F' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 39,
          question: 'What is the real result of a master-apprentice program sponsored by The Ford Foundation?',
          options: [
            { label: 'Teach children how to speak', value: 'A' },
            { label: 'Revive some endangered languages in California', value: 'B' },
            { label: 'Postpone the dying date for some endangered languages', value: 'C' },
            { label: 'Increase communication between students', value: 'D' }
          ]
        },
        {
          type: 'multiple-choice',
          questionNumber: 40,
          question: 'What should the majority language speakers do according to the last paragraph?',
          options: [
            { label: 'They should teach their children endangered language in free lessons', value: 'A' },
            { label: 'They should learn at least four languages', value: 'B' },
            { label: 'They should show their loyalty to a dying language', value: 'C' },
            { label: 'They should be more tolerant of minority language speakers', value: 'D' }
          ]
        }
      ]
    }
  ]
};
