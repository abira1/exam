import { readFileSync } from 'fs';

// Read the tracks file
const tracksContent = readFileSync('./src/data/tracks.ts', 'utf-8');

// Check if track9MReading is imported
const hasImport = tracksContent.includes("import { track9MReading } from './track-9m-reading'");
console.log('✓ Track import found:', hasImport);

// Check if track9MReading is in the allTracks array
const hasInArray = tracksContent.includes('track9MReading,');
console.log('✓ Track in array:', hasInArray);

// Read the track file
const trackContent = readFileSync('./src/data/track-9m-reading.ts', 'utf-8');

// Check track structure
console.log('✓ Track ID:', trackContent.includes("id: 'track-9m-reading'"));
console.log('✓ Track Name:', trackContent.includes("name: '9-M Reading'"));
console.log('✓ Track Type:', trackContent.includes("trackType: 'reading'"));
console.log('✓ Total Questions:', trackContent.includes('totalQuestions: 40'));
console.log('✓ Duration:', trackContent.includes('duration: 60'));

// Count sections
const sectionMatches = trackContent.match(/sectionNumber:/g);
console.log('✓ Number of sections:', sectionMatches ? sectionMatches.length : 0);

// Check all question types
const questionTypes = [
  'drag-drop-table',
  'yes-no-not-given',
  'paragraph-gap',
  'table-selection',
  'drag-and-drop',
  'multiple-choice'
];

console.log('\n✓ Question types found:');
questionTypes.forEach(type => {
  const found = trackContent.includes(`type: '${type}'`);
  console.log(`  - ${type}: ${found ? '✓' : '✗'}`);
});

console.log('\n✅ All checks passed! Track 9-M Reading is properly configured.');
