# Track 1-M Listening Questions 11-15 Fix

## Issue
Questions 11-15 in Track 1-M Listening Section 2 were missing answer placeholder/input boxes for questions 13 and 15.

## Root Cause
In the data structure (`/app/src/data/track1.ts`), questions 13 and 15 were incorrectly placed in the `label` field as objects `{questionNumber: 13}` instead of being in the `value` field where the TableGapQuestion component expects them.

### Before (Incorrect Structure):
```typescript
{
  label: { questionNumber: 13 },
  value: 'Central Park'
},
// ...
{
  label: { questionNumber: 15 },
  value: 'Exhibition Ct.'
}
```

## Solution
Restructured the table rows so that questions 13 and 15 are now in the `value` field with descriptive labels containing `_______` placeholders. This allows the TableGapQuestion component to properly render input boxes.

### After (Correct Structure):
```typescript
{
  label: 'Event name: _______',
  value: { questionNumber: 13 }
},
{
  label: 'Event location:',
  value: 'Central Park'
},
// ...
{
  label: 'Event name: _______',
  value: { questionNumber: 15 }
},
{
  label: 'Event location:',
  value: 'Exhibition Ct.'
}
```

## How It Works
The TableGapQuestion component (in `/app/src/components/TableGapQuestion.tsx`) has special handling for labels containing `_______`:
- When a label contains `_______` and the value is a question object, it splits the label at the placeholder
- It then injects the input box inline at the `_______` position (lines 60-71)
- This creates a natural flow: "Event name: [input box]"

## Testing
All questions 11-15 in Section 2 now have proper input boxes:
- ✅ Question 11: Location input
- ✅ Question 12: Location input  
- ✅ Question 13: Event name input (FIXED)
- ✅ Question 14: Location input
- ✅ Question 15: Event name input (FIXED)

## Files Modified
- `/app/src/data/track1.ts` - Lines 106-180 (Section 2, Questions 11-20)
