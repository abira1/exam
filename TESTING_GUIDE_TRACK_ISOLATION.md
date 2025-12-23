# Testing Guide: Track State Isolation Fix

## Quick Test Scenarios

### Scenario 1: Basic Mock Test Flow
**Objective**: Verify each track maintains separate answer state

**Steps**:
1. Login as Admin
2. Create Mock Test with:
   - Listening Track (e.g., Track 1)
   - Reading Track (e.g., Track 4)  
   - Writing Track (e.g., Track 5)
3. Set duration for each track (e.g., 5 minutes each for testing)
4. Start the exam

**As Student**:
5. Login and enter the mock test
6. **LISTENING TRACK**:
   - Answer Q1 = "library"
   - Answer Q2 = "Monday"
   - Answer Q3 = "2pm"
   - Look at footer - should see Q1-40 with green highlighting on Q1, Q2, Q3
   - Click "Submit Listening Section"

7. **READING TRACK** (automatically loads after submission):
   - ✅ CHECK: Footer should now show NEW Q1-40 (Reading questions)
   - ✅ CHECK: Q1, Q2, Q3 should be EMPTY (not showing "library", "Monday", "2pm")
   - Answer Q1 = "True"
   - Answer Q2 = "False"
   - Answer Q3 = "Not Given"
   - Look at footer - should see green highlighting on Q1, Q2, Q3 (Reading)
   - Click "Submit Reading Section"

8. **WRITING TRACK** (automatically loads):
   - ✅ CHECK: Footer should show Task 1 & Task 2 (NOT Q1-40)
   - Write Task 1 essay
   - Write Task 2 essay
   - Click "Submit Writing Section"

9. **VERIFICATION**:
   - Exam should be fully submitted
   - Check submission in database/storage

**Expected Results**:
✅ Listening Q1-3 had values: "library", "Monday", "2pm"
✅ Reading Q1-3 had values: "True", "False", "Not Given"  
✅ No overlap or cross-contamination
✅ Footer showed correct questions for each track
✅ Each track's answers submitted correctly

---

### Scenario 2: Question Number Collision Test
**Objective**: Verify same question numbers in different tracks don't interfere

**Steps**:
1. Start mock test (Listening → Reading → Writing)
2. **In Listening Track**:
   - Answer Q5 = "coffee"
   - Answer Q10 = "bicycle"
   - Answer Q15 = "garden"
   
3. **Switch to Reading Track**:
   - ✅ CHECK: Q5, Q10, Q15 should be EMPTY (not "coffee", "bicycle", "garden")
   - Answer Q5 = "True"
   - Answer Q10 = "False"
   - Answer Q15 = "Not Given"

4. **Verification**:
   - Reading Q5 = "True" (NOT "coffee")
   - Listening Q5 should still be "coffee" in submission data

---

### Scenario 3: Footer Navigation Accuracy
**Objective**: Verify footer shows only current track's questions

**Test Matrix**:
| Track      | Footer Should Show          | Footer Should NOT Show      |
|------------|----------------------------|----------------------------|
| Listening  | Q1-40 (Listening)          | Reading Q1-40, Writing Tasks|
| Reading    | Q1-40 (Reading)            | Listening Q1-40, Writing Tasks|
| Writing    | Task 1, Task 2             | Q1-40 from any track       |

**Steps**:
1. In Listening Track:
   - Count footer buttons → should be exactly 40
   - Verify labels say "Q1" through "Q40"
   - No "Task 1" or "Task 2" buttons

2. In Reading Track:
   - Count footer buttons → should be exactly 40
   - Verify labels say "Q1" through "Q40"
   - These are DIFFERENT questions than Listening

3. In Writing Track:
   - Count footer buttons → should be 2 (Task 1, Task 2)
   - No numbered questions (Q1-Q40)

---

### Scenario 4: Answer Persistence Test
**Objective**: Verify answers persist within their track

**Steps**:
1. **Listening Track**:
   - Answer Q1-10 with specific values
   - Navigate to Section 2
   - Navigate back to Section 1
   - ✅ CHECK: Q1-10 answers still present

2. **Reading Track**:
   - Answer Q1-10 with different values
   - Navigate between sections
   - ✅ CHECK: Reading Q1-10 have their own values (not Listening values)

---

### Scenario 5: Partial Test (Non-Mock) Compatibility
**Objective**: Verify fix doesn't break single-track tests

**Steps**:
1. Create Partial Test (single track only, not mock)
2. Select only Listening track
3. Answer questions normally
4. Submit exam
5. ✅ CHECK: All answers submitted correctly
6. No errors in console

**Repeat for**:
- Partial Reading only test
- Partial Writing only test

---

## Common Issues to Look For

### ❌ Bug Indicators (Should NOT happen)
1. Answering Q1 in Reading overwrites Q1 from Listening
2. Footer shows 120 questions (all tracks combined)
3. Footer shows questions from other tracks
4. Switching tracks loses answers
5. Same answer appears in multiple tracks
6. Console errors about undefined trackAnswers

### ✅ Correct Behavior (Should happen)
1. Each track has independent Q1-40 or tasks
2. Footer shows only current track's questions (40 for Listening/Reading, 2 for Writing)
3. Answers are track-specific and isolated
4. Switching tracks shows empty questions (until answered)
5. Submission includes all three tracks with correct answers
6. No console errors

---

## Testing Checklist

### Pre-Testing Setup
- [ ] Code changes deployed
- [ ] Dev server running without errors
- [ ] Admin account available
- [ ] Student account available
- [ ] Tracks configured (at least 1 of each type)

### Functional Tests
- [ ] Mock test creates successfully with 3 tracks
- [ ] Student can access mock test
- [ ] Listening track loads with Q1-40 in footer
- [ ] Listening answers save correctly
- [ ] Listening section submits successfully
- [ ] Reading track auto-loads after Listening submission
- [ ] Reading footer shows Q1-40 (new set)
- [ ] Reading Q1 is empty (not showing Listening Q1 answer)
- [ ] Reading answers save correctly
- [ ] Reading section submits successfully
- [ ] Writing track auto-loads after Reading submission
- [ ] Writing footer shows Task 1 & Task 2 only
- [ ] Writing tasks save correctly
- [ ] Writing section submits successfully
- [ ] Final submission contains all three sections
- [ ] Submission data is correct and complete

### Edge Cases
- [ ] Navigating between sections within a track works
- [ ] Footer highlights answered questions correctly
- [ ] Time warnings display correctly per track
- [ ] Partial tests (single track) still work
- [ ] Multiple students can take exam simultaneously
- [ ] Browser refresh doesn't lose answers (if persistence implemented)

### Browser Compatibility
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (if applicable)

---

## Expected Data Structure in Submission

```json
{
  "testType": "mock",
  "sectionSubmissions": {
    "listening": {
      "trackId": "track-1",
      "trackName": "Listening Track 1",
      "answers": {
        "1": "library",
        "2": "Monday",
        "3": "2pm",
        ...
        "40": "answer40"
      },
      "submittedAt": "2025-01-XX...",
      "locked": true
    },
    "reading": {
      "trackId": "track-4",
      "trackName": "Reading Track 4",
      "answers": {
        "1": "True",
        "2": "False",
        "3": "Not Given",
        ...
        "40": "True"
      },
      "submittedAt": "2025-01-XX...",
      "locked": true
    },
    "writing": {
      "trackId": "track-5",
      "trackName": "Writing Track 5",
      "answers": {
        "track-5-task1": "Essay content for Task 1...",
        "track-5-task2": "Essay content for Task 2..."
      },
      "submittedAt": "2025-01-XX...",
      "locked": true
    }
  }
}
```

**Key Points**:
- Each section has its own `answers` object
- Question numbers can overlap (Q1 in listening ≠ Q1 in reading)
- Writing uses task-based keys instead of numbers
- All sections marked as `locked: true` after submission

---

## Debugging Tips

### Check Console Logs
```javascript
// During exam, check:
console.log('Current Track Index:', currentTrackIndex);
console.log('Track Answers:', trackAnswers);
console.log('Current Answers:', answers); // Should be trackAnswers[currentTrackIndex]
```

### Check State in React DevTools
1. Open React DevTools
2. Find ExamPage component
3. Check state:
   - `trackAnswers` should have keys 0, 1, 2
   - `trackAnswers[0]` = Listening answers
   - `trackAnswers[1]` = Reading answers
   - `trackAnswers[2]` = Empty (Writing uses trackWritingAnswers)
   - `currentTrackIndex` should change as user progresses

### Check Footer Component
1. QuestionNavigator should receive:
   - `answers` = current track's answers only
   - `examData` = current track's sections only
2. Number of buttons should match current track:
   - Listening: 40 buttons
   - Reading: 40 buttons
   - Writing: 2 buttons (if footer shown for writing)

---

## Performance Considerations
- Track state is in-memory only (not persisted between sessions)
- State size: ~40 answers × 3 tracks = manageable
- No performance impact expected
- State updates are O(1) with current implementation

---

## Rollback Plan
If issues found:
1. Revert `/app/src/pages/ExamPage.tsx` to previous version
2. Clear browser cache
3. Restart dev server
4. Previous bug will return but app will be functional

---

**Last Updated**: January 2025
**Status**: Ready for Testing
