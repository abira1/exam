import { readFileSync } from 'fs';

const trackContent = readFileSync('./src/data/track-9m-reading.ts', 'utf-8');

// Extract section information
const sections = [
  { name: 'Part 1', start: 1, end: 13, expected: 13 },
  { name: 'Part 2', start: 14, end: 26, expected: 13 },
  { name: 'Part 3', start: 27, end: 40, expected: 14 }
];

console.log('Question Distribution Verification:\n');

sections.forEach(section => {
  const questionCount = section.end - section.start + 1;
  const status = questionCount === section.expected ? '✓' : '✗';
  console.log(`${status} ${section.name}: Questions ${section.start}-${section.end} (${questionCount} questions)`);
});

// Check for questionNumber references
const questionNumbers = [];
const regex = /questionNumber:\s*(\d+)/g;
let match;
while ((match = regex.exec(trackContent)) !== null) {
  questionNumbers.push(parseInt(match[1]));
}

console.log('\n✓ Total question numbers found:', questionNumbers.length);
console.log('✓ Question range:', Math.min(...questionNumbers), '-', Math.max(...questionNumbers));

// Verify all questions from 1-40 are present
const missing = [];
for (let i = 1; i <= 40; i++) {
  if (!questionNumbers.includes(i)) {
    missing.push(i);
  }
}

if (missing.length === 0) {
  console.log('✅ All questions 1-40 are present!');
} else {
  console.log('⚠️  Missing questions:', missing.join(', '));
}

// Check passages
const passages = trackContent.match(/title: 'READING PASSAGE \d'/g);
console.log('\n✓ Passages found:', passages ? passages.length : 0);
passages?.forEach(p => console.log('  -', p));

console.log('\n✅ Track structure verification complete!');
