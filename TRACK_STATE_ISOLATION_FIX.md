# Track State Isolation Fix - Mock Test

## Problem Summary
In the mock test exam with three sequential tracks (Listening, Reading, Writing), all tracks were incorrectly sharing a single answer state. This caused:

1. **Answer State Collision**: When answering Question 1 in Listening, then Question 1 in Reading, the Reading answer would overwrite the Listening answer
2. **Footer Navigation Issues**: Questions from all tracks appeared together in the footer navigation
3. **Cross-Track Answer Display**: Answers from one track (e.g., Listening Q5) would show up in another track (e.g., Reading Q5)

## Root Cause
The application used a single global state for all answers:
```typescript
const [answers, setAnswers] = useState<Record<number, string>>({});
const [writingAnswers, setWritingAnswers] = useState<Record<string, string>>({});
```

When switching between tracks via `currentTrackIndex`, all tracks shared the same answer object.

## Solution Implemented
Created **track-specific answer storage** that maintains complete isolation between tracks:

### 1. Track-Specific State Structure
```typescript
// Old (shared state)
const [answers, setAnswers] = useState<Record<number, string>>({});

// New (track-isolated state)
const [trackAnswers, setTrackAnswers] = useState<Record<number, Record<number, string>>>({});
// Structure: { 0: {1: "answer1", 2: "answer2"}, 1: {1: "answer1", 2: "answer2"}, ... }
//             ^     ^                              ^
//             |     |                              |
//          Track  Question Numbers              Track 1 (Reading)
//          0 (Listening)
```

### 2. Derived Current Track Answers
```typescript
// Current track's answers (automatically switches based on currentTrackIndex)
const answers = trackAnswers[currentTrackIndex] || {};
const writingAnswers = trackWritingAnswers[currentTrackIndex] || {};
```

### 3. Updated Answer Handlers
```typescript
const handleAnswerChange = (questionNumber: number, value: string) => {
  setTrackAnswers(prev => ({
    ...prev,
    [currentTrackIndex]: {
      ...(prev[currentTrackIndex] || {}),
      [questionNumber]: value
    }
  }));
};
```

### 4. Section Submission with Track-Specific Answers
```typescript
const handleSectionSubmit = async (sectionType: 'listening' | 'reading' | 'writing') => {
  // Get the current track's answers
  const currentTrackAnswers = trackAnswers[currentTrackIndex] || {};
  const currentTrackWritingAnswers = trackWritingAnswers[currentTrackIndex] || {};
  
  // Use track-specific answers in submission
  const sectionSubmission: SectionSubmission = {
    answers: sectionType === 'writing' ? currentTrackWritingAnswers : currentTrackAnswers,
    // ... other fields
  };
};
```

## How It Works

### Track Isolation Architecture
```
Mock Test Structure:
┌─────────────────────────────────────────────────────────────┐
│                        Mock Test                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Track 0 (Listening)        Track 1 (Reading)        Track 2 (Writing)   │
│  ┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐│
│  │ trackAnswers[0]  │      │ trackAnswers[1]  │      │ trackAnswers[2]  ││
│  │ {                │      │ {                │      │ {                ││
│  │   1: "A",        │      │   1: "B",        │      │ (writing tasks)  ││
│  │   2: "C",        │      │   2: "D",        │      │                  ││
│  │   ...40: "Z"     │      │   ...40: "Y"     │      │                  ││
│  │ }                │      │ }                │      │ }                ││
│  └──────────────────┘      └──────────────────┘      └──────────────────┘│
│         ↓                          ↓                          ↓           │
│  Footer shows Q1-40      Footer shows Q1-40      Footer shows Tasks  │
│  (Listening only)        (Reading only)          (Writing only)      │
└─────────────────────────────────────────────────────────────────────────┘
```

### When User Switches Tracks
1. `currentTrackIndex` changes (0 → 1 → 2)
2. Derived `answers` automatically points to new track: `trackAnswers[currentTrackIndex]`
3. `examData` updates to current track's sections
4. QuestionNavigator receives:
   - `answers`: Track-specific answers
   - `examData`: Track-specific questions
5. **Result**: Complete isolation - no cross-contamination

## Files Modified
- `/app/src/pages/ExamPage.tsx` - Main exam page with track state management

## Changes Made
1. ✅ Replaced single `answers` state with `trackAnswers` (track-indexed)
2. ✅ Replaced single `writingAnswers` state with `trackWritingAnswers` (track-indexed)
3. ✅ Created derived variables for current track's answers
4. ✅ Updated `handleAnswerChange` to use track-specific state
5. ✅ Updated `handleWritingAnswerChange` to use track-specific state
6. ✅ Updated `handleSectionSubmit` to get answers from current track
7. ✅ Updated `handleSubmit` (partial tests) to use track 0 answers

## Testing Instructions

### Manual Testing Steps
1. **Start Mock Test**:
   - Admin creates mock test with Listening + Reading + Writing tracks
   - Student starts the mock test

2. **Test Listening Track (Track 0)**:
   - Answer questions 1-10 in Section 1
   - Check footer navigation - should only show Q1-40 (Listening questions)
   - Answer Q1 = "Paris", Q2 = "Monday", etc.

3. **Submit Listening & Move to Reading Track (Track 1)**:
   - Click "Submit Listening Section"
   - Verify moved to Reading track
   - Check footer navigation - should only show Q1-40 (Reading questions, NOT Listening)
   - Answer Q1 = "True", Q2 = "False", etc.

4. **Verify Isolation**:
   - Reading Q1 should be "True" (NOT "Paris" from Listening)
   - Footer should only show Reading questions (Q1-40)
   - No Listening questions should appear

5. **Submit Reading & Move to Writing Track (Track 2)**:
   - Click "Submit Reading Section"
   - Verify moved to Writing track
   - Check footer - should show Task 1 & Task 2 (NOT Q1-40)
   - Write essays for both tasks

6. **Navigate Back (if allowed)**:
   - If user can navigate back to previous tracks
   - Verify Listening answers are preserved ("Paris", "Monday")
   - Verify Reading answers are preserved ("True", "False")
   - Each track maintains its own state

### Expected Results
✅ Each track has its own isolated answer storage
✅ Footer navigation shows only current track's questions
✅ Answers from one track do NOT appear in another track
✅ Question numbers can overlap (Q1 in Listening ≠ Q1 in Reading)
✅ All answers are properly submitted with correct track association

### Previous Behavior (Bug)
❌ All tracks shared single answer state
❌ Footer showed questions from all tracks mixed together
❌ Answering Q1 in Reading overwrote Q1 from Listening
❌ Answer state leaked between tracks

## Technical Details

### State Structure
```typescript
// Track-specific answers
trackAnswers = {
  0: { 1: "Paris", 2: "Monday", 3: "library", ... },     // Listening
  1: { 1: "True", 2: "False", 3: "Not Given", ... },     // Reading
  2: {}                                                    // Writing (uses taskAnswers)
}

trackWritingAnswers = {
  2: { 
    "track-writing-1-task1": "Essay content...",
    "track-writing-1-task2": "Essay content..." 
  }
}
```

### Automatic Switching
When `currentTrackIndex` changes from 0 to 1:
- `answers` changes from `trackAnswers[0]` to `trackAnswers[1]`
- `examData` changes from Listening sections to Reading sections
- QuestionNavigator receives Reading questions + Reading answers
- Complete isolation maintained

## Benefits
1. ✅ **Complete Isolation**: Each track maintains separate state
2. ✅ **No Data Corruption**: Answers cannot leak between tracks
3. ✅ **Correct Footer Display**: Only current track's questions shown
4. ✅ **Proper Submission**: Each section submitted with correct answers
5. ✅ **Scalable**: Easy to add more tracks without state conflicts
6. ✅ **Backward Compatible**: Partial tests still work (use track 0)

## Deployment Notes
- No database schema changes required
- No breaking changes to existing partial tests
- Mock tests now have proper track isolation
- No migration needed - state is in-memory during exam

---
**Fix Date**: January 2025
**Status**: ✅ Completed and Ready for Testing
